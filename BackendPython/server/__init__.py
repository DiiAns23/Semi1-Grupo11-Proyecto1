"""
Initialize Flask app
"""
from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv() 


app = Flask('server')
CORS(app)

if os.getenv('FLASK_CONF') == 'TEST':
    app.config.from_object('server.settings.Testing')

elif 'SERVER_SOFTWARE' in os.environ and os.environ['SERVER_SOFTWARE'].startswith('Dev'):
    # Development settings
    app.config.from_object('server.settings.Development')
    # Flask-DebugToolbar
    toolbar = DebugToolbarExtension(app)

    # Google app engine mini profiler
    # https://github.com/kamens/gae_mini_profiler
    app.wsgi_app = DebuggedApplication(app.wsgi_app, evalex=True)

    from gae_mini_profiler import profiler, templatetags

    @app.context_processor
    def inject_profiler():
        return dict(profiler_includes=templatetags.profiler_includes())
    app.wsgi_app = profiler.ProfilerWSGIMiddleware(app.wsgi_app)
else:
    app.config.from_object('server.settings.Production')


mysql = MySQL(app)

# Pull in URL dispatch routes
# Publics 
#from server.views.public.public_warmup import PublicWarmup
#from server.views.public.public_index import PublicIndex
#from server.views.public.public_say_hello import PublicSayHello



# URL dispatch rules

#app.add_url_rule('/_ah/warmup', 'public_warmup', view_func=PublicWarmup.as_view('public_warmup'))

#app.add_url_rule('/', 'public_index', view_func=PublicIndex.as_view('public_index'))

#app.add_url_rule('/hello/<username>', 'public_say_hello', view_func=PublicSayHello.as_view('public_say_hello'))

from server import urls