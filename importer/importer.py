from tools import find_plans, find_png_files
import os

# declare variables
pwd = os.path.dirname(os.path.realpath(__file__))
target_folder = os.path.join(pwd, 'target')

# starting process
print('Importer for FlightDiary')

# check required file
print('Checking required file...')
target_png = find_png_files(target_folder)
if not target_png:
    raise Exception("At least one image is needed!")

target_lnmpln = find_plans(target_folder, 'lnmpln')
target_html = find_plans(target_folder, 'html')

# ednter 
print('')