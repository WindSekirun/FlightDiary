import glob
import json
import requests
import os
from pathlib import Path

def find_png_files(path):
    return sorted(glob.glob(f'{path}/*.png'))


def find_webp_files(path):
    return sorted(glob.glob(f'{path}/*.webp'))


def find_all_files(path):
    return sorted(glob.glob(f'{path}/*.*'))


def find_plans(path, ext):
    extlist = sorted(glob.glob(f'{path}/*.{ext}'))
    if not extlist:
        raise Exception(f'{ext} file is missing!')

    if len(extlist) != 1:
        raise Exception(f'Multiple {ext} files are exists!')

    return extlist[0]


def read_json(path):
    with open(path) as f:
        return json.load(f)


def write_json(data, file):
    with open(file, 'w') as f:
        json.dump(data, f, indent=2)


def read_flightplan_key(file):
    with open(file) as f:
        return f.read().replace('\n', '')


def build_airport_metadata(api_key, icao, airport_json_file, output_file):
    icao = icao.upper()
    header = {'Authorization': api_key}
    url = f'https://api.flightplandatabase.com/nav/airport/{icao}'
    response = requests.get(url, headers=header).json()
    airport_name = response["name"]
    airport_label = f'{icao} - {airport_name}'
    metadata = {
        "ICAO": response["ICAO"],
        "IATA": response["IATA"],
        "name": response["name"],
        "lat": response["lat"],
        "lon": response["lon"],
        "elevation": response["elevation"],
        "regionName": response["regionName"],
        "magneticVariation": response["magneticVariation"],
        "runwayCount": response["runwayCount"],
        "runways": response["runways"],
        "frequencies": response["frequencies"]
    }

    if os.path.exists(output_file):
        os.remove(output_file)

    filename = Path(output_file)
    filename.touch(exist_ok=True)
    write_json(metadata, output_file)

    with open(airport_json_file) as f:
        map_data = json.load(f)
        if icao not in map_data:
            map_data[icao] = {
                "icao": icao,
                "label": airport_label,
                "name": airport_name,
                "lat": response["lat"],
                "lon": response["lon"]
            }
            write_json(map_data, airport_json_file)
