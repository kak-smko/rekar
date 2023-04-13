import json

from renus.core.response import JsonResponse
from renus.util.helper import get_random_string

from app.extension.renus.setting.model import Setting
from app.extension.renus.translate.model import Translate

def get_translates(request,name,lang):
    translates = Translate(request)
    translates.hidden_fields = ['_id']
    return translates.where({
        lang: {'$exists': True},
        'packages': {'$in': ['renusify', 'admin' if name == 'admin' else 'index']}
    }).select('key', lang).get()

def set_meta(request,rnd):
    meta_tag = Setting(request).hub.get('meta_tag', None)
    s = ''
    s += f"<meta http-equiv=\"Content-Security-Policy\" content=\"img-src 'self' data: blob:;default-src 'self';style-src 'self' 'unsafe-inline';connect-src https://codenus.com 'self';script-src 'self' 'nonce-{rnd}'\">"
    if meta_tag:
        for meta in meta_tag:
            s += f'<meta name="{meta["name"]}" content="{meta["content"]}">'
    return s

def set_color(request,site_default):
    isDark=site_default.get('dark', False)
    t='l'
    if isDark:
        t='d'
    s=''
    if site_color:
        s += '<style>body {'
        for color, value in site_color.items():
            if color != 'id':
                s += f'--color-{color}:{value[t]};'
        s += '}</style>'
    return s


def set_font(site_default,lang):
    fonts = site_default.get('fonts', {}).get(lang, False)
    s=''
    if fonts:
        if len(fonts) == 1:
            f = fonts[0]
            typefont = 'woff2' if f.endswith('.woff2') else 'woff'
            s += f'<link rel="preload" href="/{f}" as="font" type="font/{typefont}" crossorigin="anonymous">'
            s += '<style>@font-face {font-family: fontOne;font-style: normal;font-display: swap;src: local(fontOne), ' + f'url(/{f}) format("{typefont}")' + '}*{font-family: fontOne, sans-serif !important}</style>'
        elif len(fonts) == 2:
            f = fonts[0]
            f2 = fonts[1]
            typefont = 'woff2' if f.endswith('.woff2') else 'woff'
            typefont2 = 'woff2' if f2.endswith('.woff2') else 'woff'
            s += f'<link rel="preload" href="/{f}" as="font" type="font/{typefont}" crossorigin="anonymous">'
            s += f'<link rel="preload" href="/{f2}" as="font" type="font/{typefont2}" crossorigin="anonymous">'
            s += '<style>@font-face {font-family: fontOne;font-style: normal;font-display: swap;src: local(fontOne), ' + f'url(/{f}) format("{typefont}")' + '}*{font-family: fontOne, sans-serif !important} '
            s += '@font-face {font-family: fontTwo;font-style: normal;font-display: swap;src: local(fontTwo), ' + f'url(/{f2}) format("{typefont2}")' + '}.font-two{font-family: fontTwo, sans-serif !important}</style>'
    return s


def set_head(request,site_default,lang,file,rnd):
    s = set_meta(request,rnd)
    s += set_color(request)
    s += set_font(site_default, lang)
    s += '</head>'
    return file.replace('</head>', s)


def set_body(request, name, lang,site_default,file,rnd):
    langs = Setting(request).hub.get('langs', None)
    translates = get_translates(request, name, lang)
    s = ''
    r = {}
    r['lang'] = lang
    r['dark'] = site_default.get('dark',False)
    r['rtl'] = site_default['rtl']

    if len(translates) > 0:
        r['translates'] = translates
    else:
        r['lang'] = site_default['lang']

    if langs is not None:
        r['langs'] = langs

    if len(r) > 0:
        s += '<body><script nonce="' + rnd + f'">window.site_settings={json.dumps(r)};</script>'
    return file.replace('<body>', s)


def template(request, name):
    rnd = get_random_string(10)
    site_default = Setting(request).hub.get('site_default',None)

    if site_default is None:
        return 'not_found_site'

    if request.cookies:
        lang=request.cookies.get('lang',site_default['lang'])
    else:
        lang=site_default['lang']

    with open(f'public/{name}.html') as f:
        file = f.read()

    file=set_head(request,site_default,lang,file,rnd)
    return set_body(request, name, lang,site_default,file,rnd)
