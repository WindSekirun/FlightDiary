from datetime import date
from pathlib import Path
from bs4 import BeautifulSoup
import tools
import plnreader
import tablereader
import optimize
import xmltodict
import os
import uuid
import json
import shutil
import re

# declare variables
pwd = os.path.dirname(os.path.realpath(__file__))
target_folder = os.path.join(pwd, 'target')
public_folder = os.path.join(os.path.realpath('..'), 'public')
public_data_folder = os.path.join(os.path.realpath('..'), 'public', 'data')
airport_metadata_folder = os.path.join(os.path.realpath('..'), 'public', 'data', 'airport')
airport_map_file = os.path.join(public_folder, 'airportmap.json')
aircraft_map_file = os.path.join(public_folder, 'aircraft.json')
data_file = os.path.join(public_folder, 'data.json')

flightplan_key = tools.read_flightplan_key(os.path.join(pwd, 'flightplan.key'))

if not flightplan_key:
    print('flightplan.key is missing. Docs: https://flightplandatabase.com/dev/api#intro')

# make data json if doesn't exist
if not os.path.isfile(data_file):
    tools.write_json([], data_file)

# reading json
airport_json = tools.read_json(airport_map_file)
data_json = tools.read_json(data_file)

# starting process
print('Importer for FlightDiary')
data_id = str(uuid.uuid4()).replace("-", "")

# check required file
print('Checking required file...')
target_png = tools.find_png_files(target_folder)
if not target_png:
    raise Exception("At least one image is needed!")

target_lnmpln = tools.find_plans(target_folder, 'lnmpln')
target_html = tools.find_plans(target_folder, 'html')

# enter metadata of airport
# auto-resolve airport name
lnmpln_name = str(os.path.basename(target_lnmpln))
possible_airport_icao = re.findall('[(]+[\w]+', lnmpln_name, re.IGNORECASE)
departure_icao = possible_airport_icao[0].replace('(', '')
destination_icao = possible_airport_icao[1].replace('(', '')

if not departure_icao:
    print()
    print('Enter ICAO code of departure airport. Example: RKSI RJAA LFPG KJFK')
    departure_icao = input('Departure Airport ICAO: ').upper()

if not destination_icao:
    print()
    print('Enter ICAO code of destination airport. Example: RKSI RJAA LFPG KJFK')
    destination_icao = input('Destination Airport ICAO: ').upper()

print()
print("Building airport metdata...")

# refresh metadata
tools.build_airport_metadata(flightplan_key, departure_icao, airport_map_file,
                             os.path.join(airport_metadata_folder, f'{departure_icao}.json'))
tools.build_airport_metadata(flightplan_key, destination_icao, airport_map_file,
                             os.path.join(airport_metadata_folder, f'{destination_icao}.json'))

print()
print("Reading Flight Plan Data...")

airport_json = tools.read_json(airport_map_file)
flight_time = date.today().strftime("%Y-%m-%d")

# read plan file (lnmpln)
lnmpln_root = xmltodict.parse(Path(target_lnmpln).read_text())
lnmpln_json = json.loads(json.dumps(lnmpln_root))
aircraft_type = plnreader.read_aircraft(lnmpln_json)
cruising_alt = plnreader.read_cruise(lnmpln_json)
plan_type = plnreader.read_plan_type(lnmpln_json)
producers_sid = plnreader.read_sid(lnmpln_json)
producers_approach = plnreader.read_approach(lnmpln_json)
waypoint_from_lnmpln = plnreader.read_waypoint(lnmpln_json)

# read plan file (html)
html_root = Path(target_html).read_text()
html_soup = BeautifulSoup(html_root, 'html.parser')
plan_distance = tablereader.read_distance(html_soup)
waypoint_from_html = tablereader.read_waypoint_from_html(html_soup)

# merge waypoints into single dict follow data type
waypoint_merge = []
for html_waypoint in waypoint_from_html:
    key = html_waypoint["ident"]
    is_procedure = key in waypoint_from_lnmpln

    lat, lon, name = "", "", ""
    if is_procedure:
        lnmpln = waypoint_from_lnmpln[key]
        lat = lnmpln["lat"]
        lon = lnmpln["lon"]
        name = lnmpln["name"]

    value = {
        "lat": lat,
        "lng": lon,
        "name": name,
        "ident": key,
        "alt": html_waypoint["alt"],
        "region": html_waypoint["region"],
        "procedure": html_waypoint["procedure"],
        "airway": html_waypoint["airway"],
        "restrictKt": html_waypoint["restrictKt"],
        "type": html_waypoint["type"],
        "freq": html_waypoint["freq"],
        "courseM": html_waypoint["courseM"],
        "distance": html_waypoint["distance"],
        "wind": html_waypoint["wind"],
        "remarks": html_waypoint["remark"],
        "isProcedure": not is_procedure
    }
    waypoint_merge.append(value)

# rename plan file
os.rename(target_lnmpln, os.path.join(pwd, 'target', f'{data_id}.lnmpln'))
os.remove(target_html)

print()
print('Starting Image Optimization...')
optimize.optimize_images()

result_images = list(map(lambda x: os.path.basename(x), tools.find_webp_files(target_folder)))
result_origin_images = list(map(lambda x: os.path.basename(x), tools.find_png_files(target_folder)))

print()
print('Select main thumbnail of this flight')
print('See \'target\' folder and enter index of file')
print('Possible answer')

for index, origin_image in enumerate(result_origin_images):
    print(f'#{index + 1}: {origin_image}')

main_thumbnail_index = input('Index of main thumbnail file: ')
main_thumbnail = result_origin_images[int(main_thumbnail_index) - 1]
if main_thumbnail not in result_origin_images:
    print(f'Invalid name for {main_thumbnail}, select first image as main thumbnail image')
    main_thumbnail = result_origin_images[0]

thumbnail_file = os.path.join(target_folder, "main.png")
shutil.copy(os.path.join(target_folder, main_thumbnail), thumbnail_file)
print()
optimize.resize(thumbnail_file, 640)

# remove origin files
for origin_image in result_origin_images:
    os.remove(os.path.join(target_folder, origin_image))

print('Building metadata.json')

result_metadata_departure = airport_json[departure_icao]
result_metadata_destination = airport_json[destination_icao]

metadata = {
    "id": data_id,
    "departure": result_metadata_departure,
    "destination": result_metadata_destination,
    "aircraft": aircraft_type,
    "flightTime": flight_time,
    "mainThumbnail": "main.webp",
    "images": list(filter(lambda x: x.startswith('r'), result_images)),
    "flightPlanFile": f"{data_id}.lnmpln",
    "planType": plan_type,
    "cruiseAlt": cruising_alt,
    "distance": plan_distance,
    "procedures": {
        "sid": producers_sid,
        "approach": producers_approach
    },
    "waypoint": waypoint_merge
}

os.mkdir(os.path.join(public_data_folder, data_id))
tools.write_json(metadata, os.path.join(
    public_data_folder, data_id, "metadata.json"))

print('Appending data to data.json')
list_data = {
    "id": data_id,
    "departure": result_metadata_departure,
    "destination": result_metadata_destination,
    "flightTime": flight_time,
    "mainThumbnail": "main.webp",
    "aircraft": aircraft_type,
    "planType": plan_type,
    "distance": plan_distance,
}

with open(data_file) as f:
    data = json.load(f)
    data.append(list_data)
tools.write_json(data, data_file)

print('Moving data')
target_files = tools.find_all_files(target_folder)
for target in target_files:
    input_file = os.path.basename(target)
    shutil.move(target, os.path.join(public_data_folder, data_id, input_file))

print('Import of data is complete, Don\'t forget to deploy by sh ./scripts/build.sh')
