from tools import find_png_files
from PIL import Image
from pathlib import Path
import os
import subprocess

pwd = os.path.dirname(os.path.realpath(__file__))
desired = 1280, 720 

def optimize(file):
    print(file)

    # resize to desired size
    im = Image.open(file)
    im.thumbnail(desired)
    im.save(file, quality=100)

    # optipng -> cwebp lossless optimization
    input_file_name = Path(file).stem
    output_file = os.path.join(pwd, 'target', f'{input_file_name}.webp')
    subprocess.call(['optipng', '-o7', '-quiet', file])
    subprocess.call(['cwebp', '-lossless', '-q', '100', '-quiet', file, '-o', output_file])
    os.remove(os.path.join(pwd, 'target', f'{input_file_name}.png')) # remove png file


def start():
    print('Starting Image Optimization...')
    target_files = find_png_files(os.path.join(pwd, 'target'))
    
    if not target_files:
        raise Exception("At least one image is needed!")

    # ordering by numeric
    index = 0
    for file in target_files:
        index += 1
        new_name = str(index).zfill(5) + ".png"
        os.rename(file, os.path.join(pwd, 'target', new_name))

    target_files = find_png_files(os.path.join(pwd, 'target'))
    for file in target_files:
        optimize(file)
    
    print("Completed Image Optimization!")

# for debugging script
start()
