import json
import os

from renus.core.config import Config
from renus.core.routing import Router
from renus.core.response import FileResponse, JsonResponse, TextResponse, HtmlResponse
from renus.core.status import Status
from renus.util.helper import get_random_string
from routes.html import template
from extension.renus.setting.model import Setting

def index(request):
    header = {
        'Cache-Control': 'max-age=0'
    }

    return HtmlResponse(template(request, 'index'), headers=header)

def admin(name,request):
    header = {
        'Cache-Control': 'max-age=0'
    }

    return HtmlResponse(template(request, 'admin'), headers=header)



def public(name: str,request):
    if os.path.isfile(f'public/{name}'):
        header = {
            'Cache-Control': 'max-age=2592000',  # 30*24*60*60
        }

        return FileResponse(f'public/{name}', headers=header)
    else:
        return index(request)

def opt(path, request):
    host = request.headers.get('host', '')
    allows = Config('app').get('cors_allow', [])
    if host in allows or '*' in allows:
        return TextResponse('', headers={
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        })
    else:
        for site in allows:
            if site.startswith('*') and host.endswith(site.replace('*', '')):
                return TextResponse('', headers={
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                })


    return TextResponse('', Status.HTTP_405_METHOD_NOT_ALLOWED)

r = Router()
r.option('{path:[\w\W]*}', func=opt)
r.get('/', func=index)
r.get('/{name:admin[\s\S]*}', func=admin)
r.get('/{name:[\s\S]*}', func=public)
