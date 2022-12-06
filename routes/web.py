import json
import os

from renus.core.config import Config
from renus.core.routing import Router
from renus.core.response import FileResponse, JsonResponse, TextResponse, HtmlResponse
from renus.core.status import Status
from renus.util.helper import get_random_string

from extension.renus.setting.model import Setting


def html(request, name):
    rnd = get_random_string(10)
    settings = Setting(request).where({'name': {
        '$in': ['langs', 'site_default', 'site_color', 'meta_tag']}}).get()

    site_color = None
    site_default = None
    langs = None
    meta_tag = None

    for setting in settings:
        if setting.name == 'site_color':
            site_color = setting.value
        if setting.name == 'site_default':
            site_default = setting.value
        if setting.name == 'langs':
            langs = setting.value
        if setting.name == 'meta_tag':
            meta_tag = setting.value

    if site_default is None:
        return 'not_found_site'

    with open(f'public/{name}.html') as f:
        file = f.read()

    s = ''
    s += f"<meta http-equiv=\"Content-Security-Policy\" content=\"img-src 'self' data: blob:;default-src 'self';style-src 'self' 'unsafe-inline';script-src 'self' 'nonce-{rnd}'\">"
    if meta_tag:
        for meta in meta_tag:
            s+=f'<meta name="{meta["name"]}" content="{meta["content"]}">'

    if site_color:
        s += '<style>body {'
        for color, value in site_color.items():
            if color != 'id':
                s += f'--color-{color}-light:{value["l"]};'
                s += f'--color-{color}-dark:{value["d"]};'
        s += '}</style></head>'
    file = file.replace('</head>', s)
    s = ''
    r = {}
    if site_default is not None:
        r['lang'] = site_default['lang']
        r['dark'] = site_default['dark']
        r['rtl'] = site_default['rtl']

    if langs is not None:
        r['langs'] = langs
    if len(r) > 0:
        s += '<body><script nonce="' + rnd + f'">window.site_settings={json.dumps(r)};</script>'
    return file.replace('<body>', s)

def index(request):
    header = {
        'Cache-Control': 'max-age=0'
    }

    return HtmlResponse(html(request, 'index'), headers=header)

def admin(name,request):
    header = {
        'Cache-Control': 'max-age=0'
    }

    return HtmlResponse(html(request, 'admin'), headers=header)



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
