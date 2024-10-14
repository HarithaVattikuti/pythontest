import subprocess
import sys
subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'packaging'])
from packaging import version
print("Hello world")
