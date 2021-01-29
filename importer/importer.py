from tools import find_plans, find_png_files, find_webp_files, read_json, request_airport_data, write_json, find_all_files
from plnreader import read_cruise, read_plan_type, read_sid, read_approach, read_waypoint
from tablereader import read_distance, read_waypoint_from_html
from optimize import optimize_images
from pathlib import Path
from bs4 import BeautifulSoup
import xmltodict
import os
import uuid
import json
import shutil

# declare variables
pwd = os.path.dirname(os.path.realpath(__file__))
target_folder = os.path.join(pwd, 'target')
public_folder = os.path.join(os.path.realpath('..'), 'public')
public_data_folder = os.path.join(os.path.realpath('..'), 'public', 'data')
airport_map_file = os.path.join(pwd, 'airportmap.json')
data_file = os.path.join(public_folder, 'data.json')

# reading json
airport_json = read_json(airport_map_file)
data_json = read_json(data_file)

# starting process
print('Importer for FlightDiary')
data_id = str(uuid.uuid4()).replace("-", "")

# check required file
print('Checking required file...')
target_png = find_png_files(target_folder)
if not target_png:
    raise Exception("At least one image is needed!")

target_lnmpln = find_plans(target_folder, 'lnmpln')
target_html = find_plans(target_folder, 'html')

print()

# enter metadata of airport
print('Enter ICAO code of departure airport. Example: RKSI RJAA LFPG KJFK')
departure_icao = input('Departure Airport ICAO: ').upper()

print()
print('Enter ICAO code of destination airport.')
destination_icao = input('Destination Airport ICAO: ').upper()

if departure_icao not in airport_json:
    request_airport_data(departure_icao, airport_map_file)

if destination_icao not in airport_json and departure_icao != destination_icao:
    request_airport_data(destination_icao, airport_map_file)

print()
print('Enter Start date of Flight, Example:  2021-01-30')
flight_time = input('Start date of Flight: ')

# read plan file (lnmpln)
lnmpln_root = xmltodict.parse(Path(target_lnmpln).read_text())
lnmpln_json = json.loads(json.dumps(lnmpln_root))
cruising_alt = read_cruise(lnmpln_json)
plan_type = read_plan_type(lnmpln_json)
producers_sid = read_sid(lnmpln_json)
producers_approach = read_approach(lnmpln_json)
waypoint_from_lnmpln = read_waypoint(lnmpln_json)

# read plan file (html)
html_root = Path(target_html).read_text()
html_soup = BeautifulSoup(html_root, 'html.parser', from_encoding="iso-8859-1")
plan_distance = read_distance(html_soup)
waypoint_from_html = read_waypoint_from_html(html_soup)

# merge waypoints into single dict follow data type

# rename plan file
os.rename(target_lnmpln, os.path.join(pwd, 'target', f'{data_id}.lnmpln'))
os.rename(target_html, os.path.join(pwd, 'target', f'{data_id}.html'))

print()
print('Starting Image Optimization...')
optimize_images()

print()
print('Select main thumbnail of this flight')
print('See \'target\' folder and enter name of file. Example: 00001.webp')
main_thumbnail = input('Name of main thumbnail file: ')

print()
print('Building metadata.json')

result_metadata_departure = {
    "name": airport_json[departure_icao]['name'],
    "iata": airport_json[departure_icao]['iata'],
    "icao": airport_json[departure_icao]['icao']
},
result_metadata_destination = {
    "name": airport_json[destination_icao]['name'],
    "iata": airport_json[destination_icao]['iata'],
    "icao": airport_json[destination_icao]['icao']
}

metadata = {
    "id": data_id,
    "departure": result_metadata_departure,
    "destination": result_metadata_destination,
    "flightTime": flight_time,
    "mainThumbnail": main_thumbnail,
    "images": find_webp_files(target_folder),
    "flightPlanFile": f"{data_id}.lnmpln",
    "planType": plan_type,
    "cruiseAlt": cruising_alt,
    "distance": plan_distance,
    "procedures": {
        "sid": producers_sid,
        "approach": producers_approach
    },
    "waypoint": [
        {
            "lat": "20.967005", # from lnm
            "lng": "52.165108", # from lnm
            "name": "Okecie",  # from lnm
            "ident": "EPWA",  # from lnm, WILL UNIQUE
            "alt": "353.00", # from html
            "region": "EP", # from html
            "procedure": "", # from html
            "airway": "", # from html
            "restrictKt": "", # from html
            "type": "", # from html
            "freq": "", # from html
            "distance": "0.0", # from html
            "wind": "", # from html
            "remarks": "", # from html
            "producure": False # from html
        }
    ]
}

os.mkdir(os.path.join(public_data_folder, data_id))
write_json(metadata, os.path.join(
    public_data_folder, data_id, "metadata.json"))

print('Appending data to data.json')
list_data = {
    "id": data_id,
    "departure": result_metadata_departure,
    "destination": result_metadata_destination,
    "flightTime": flight_time,
    "mainThumbnail": main_thumbnail
}

with open(data_file) as f:
    data = json.load(f)
    data.append(list_data)
write_json(data, data_file)

print('Moving data')
target_files = find_all_files(target_folder)
for target in target_files:
    input_file = os.path.basename(target)
    shutil.move(target, os.path.join(public_data_folder, data_id, input_file))