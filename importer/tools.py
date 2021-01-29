import glob
import json

def find_png_files(path):
    return sorted(glob.glob(f'{path}/*.png'))

def find_plans(path, ext):
    list = sorted(glob.glob(f'{path}/*.{ext}'))
    if not list:
        raise Exception(f"{ext} file is missing!")

    if len(list) != 1:
        raise Exception(f"Multiple {ext} files are exists!")

    return list[0]


def read_json(path):
    with open(path) as f:
        return json.load(f)


def write_json(data, file): 
    with open(file, 'w') as f:
        json.dump(data, f, indent=4)


def request_airport_data(icao, json_file):
    print()
    print(f'This is first time to visit {icao.upper()}, So we need some information of Airpot.')
    print(f'You can find information from Wikipedia or other sites')
    # airport_name = input('Airport name: ')
    # airport_iata = input('Airport IATA code: ')
    airport_name = "John F. Kennedy International Airport"
    airport_iata = "JFK"
    to_add = {
        "name": str(airport_name),
        "iata": airport_iata.upper(),
        "icao": icao.upper()
    }
    with open(json_file) as f:
        data = json.load(f)
        data[icao] = to_add
    write_json(data, json_file)
