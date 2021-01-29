from tools import find_plans
import xml.etree.ElementTree as elemTree
import os




# for debugging script
pwd = os.path.dirname(os.path.realpath(__file__))
target_folder = os.path.join(pwd, 'target')
pln_file = find_plans(target_folder, 'lnmpln')
