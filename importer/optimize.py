from tools import check_program_exists

if not check_program_exists('optipng') or not check_program_exists('cwebp'):
    raise Exception('Requirement is missing, please install optipng / webp')

# organize images 