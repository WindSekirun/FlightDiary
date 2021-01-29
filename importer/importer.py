from tools import find_plans, find_png_files, read_json, request_airport_data
import os
import json

# declare variables
pwd = os.path.dirname(os.path.realpath(__file__))
target_folder = os.path.join(pwd, 'target')
public_folder = os.path.join(os.path.realpath('..'), 'public')
public_data_folder = os.path.join(os.path.realpath('..'), 'public', 'data')
airport_map_file = os.path.join(pwd, 'airportmap.json')
data_file = os.path.join(public_folder,  'data.json')

# reading json
airport_json = read_json(airport_map_file)
data_json = read_json(data_file)

# declare metadata variables
result_metadata_id = ""
result_metadata_departure = {

}
result_metadata_destination = {

}
result_metadata_flightTime = ""
result_metadata_mainThumbnail = ""
result_metadata_images = []
result_metadata_flightPlanTime = ""
result_metadata_cruiseAlt = ""
result_metadata_distance = ""
result_metadata_sid = {

}
result_metadata_approach = {

}
result_metadata_waypoints = []

# starting process
print('Importer for FlightDiary')

# check required file
print('Checking required file...')
target_png = find_png_files(target_folder)
if not target_png:
    raise Exception("At least one image is needed!")

target_lnmpln = find_plans(target_folder, 'lnmpln')
target_html = find_plans(target_folder, 'html')

print()

# enter metadata
print('Enter ICAO code of departure airport.')
print('Example, RKSI RJAA LFPG KJFK')
departure_icao = input('Departure Airport ICAO: ')

print()

print('Enter ICAO code of destination airport.')
destination_icao = input('Destination Airport ICAO: ')

if departure_icao not in airport_json:
    request_airport_data(departure_icao, airport_map_file)

if destination_icao not in airport_json and departure_icao != destination_icao:
    request_airport_data(destination_icao, airport_map_file)

