from subprocess import Popen, PIPE

def check_program_exists(name):
    p = Popen(['/usr/bin/which', name], stdout=PIPE, stderr=PIPE)
    p.communicate()
    return p.returncode == 0
