

"""
urls.py
URL dispatch route mappings and error handlers
"""
from flask import render_template

from server import app

# Publics 
from server.views.public.public_warmup import PublicWarmup
from server.views.public.public_index import PublicIndex
from server.views.public.public_say_hello import PublicSayHello


# URL dispatch rules

app.add_url_rule('/_ah/warmup', 'public_warmup', view_func=PublicWarmup.as_view('public_warmup'))

app.add_url_rule('/', 'public_index', view_func=PublicIndex.as_view('public_index'))

app.add_url_rule('/hello/<username>', 'public_say_hello', view_func=PublicSayHello.as_view('public_say_hello'))

