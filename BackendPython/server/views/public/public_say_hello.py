# -*- coding: utf-8 -*-

from flask.views import View


class PublicSayHello(View):

    def dispatch_request(self):
        return "Hello Welcom :)"