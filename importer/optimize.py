from tools import find_png_files
from PIL import Image
from pathlib import Path
from time import time
import multiprocessing
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
    subprocess.call(['optipng', '-o3', '-quiet', file])
    subprocess.call(['cwebp', '-lossless', '-q', '100', '-quiet', file, '-o', output_file])
    os.remove(os.path.join(pwd, 'target', f'{input_file_name}.png')) # remove png file


def optimize_images():
    target_files = find_png_files(os.path.join(pwd, 'target'))
    t1 = time()
    
    if not target_files:
        raise Exception("At least one image is needed!")

    # ordering by numeric
    index = 0
    for file in target_files:
        index += 1
        new_name = str(index).zfill(5) + ".png"
        os.rename(file, os.path.join(pwd, 'target', new_name))

    target_files = find_png_files(os.path.join(pwd, 'target'))
    procs = []
    for file in target_files:
        p = multiprocessing.Process(target=optimize, args=(file,))
        procs.append(p)
        p.start()

    for proc in procs:
        proc.join()

    t2 = time()
    elapsed = t2 - t1
    print("Completed Image Optimization!")
    print('Elapsed time is %f seconds.' % elapsed)


if __name__ == "__main__":
    optimize_images()