import glob
import json
import os

pwd = os.path.dirname(os.path.realpath(__file__))
public_folder = os.path.join(os.path.realpath('.'), 'public')

print(f'Minify JSON file in {public_folder}')

for json_file in glob.glob(f'{public_folder}/**/*.json', recursive=True):
    print(json_file)
    with open(json_file) as f:
        json_data = json.load(f)
        json_string = json.dumps(json_data, separators=(',', ":"))
        open(json_file, "w+", 1).write(json_string)