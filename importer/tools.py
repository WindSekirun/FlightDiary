from subprocess import Popen, PIPE
from os import listdir
from os.path import isfile, join
import sys


def walkFile(path):
    return [f for f in listdir(path) if isfile(join(path, f))]