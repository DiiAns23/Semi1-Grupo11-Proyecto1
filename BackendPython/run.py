import os
import sys
import server

sys.path.insert(1, os.path.join(os.path.abspath('.'), 'server'))
server.app.run()