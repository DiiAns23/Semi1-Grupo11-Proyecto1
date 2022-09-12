# -*- coding: utf-8 -*-

from flask.views import View


class HomeIndex(View):

    def dispatch_request(self):
        return "Welcome Home :)"