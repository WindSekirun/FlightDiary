import glob

def find_png_files(path):
    return sorted(glob.glob(f'{path}/*.png'))

def find_plans(path, ext):
    list = sorted(glob.glob(f'{path}/*.{ext}'))
    if not list:
        raise Exception(f"{ext} file is missing!")

    if len(list) != 1:
        raise Exception(f"Multiple {ext} files are exists!")

    return list[0]
