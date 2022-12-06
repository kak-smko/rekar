import uvicorn,os
import multiprocessing
from renus.core.routing import Router
from renus.app import App
import routes.index
from extension.renus.tracker.middleware import TrackerMiddleware

workers = multiprocessing.cpu_count() * 2 + 1

app = App(Router().all,middlewares=[TrackerMiddleware().handle])

if __name__ == "__main__":
    uvicorn.run("index:app", host="127.0.0.1", port=4000,workers=workers,reload=True, log_level="info",headers=[
                    ("X-Frame-Options", 'DENY'),
                    ("Access-Control-Allow-Headers", '*'),
                    ("Access-Control-Allow-Origin", '*')
                ])


'''
os.chdir('/var/sapp')
app = App(Router().all)

if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=80,server_header=False,workers=workers,reload=False, log_level="error",limit_concurrency =1024,headers=[
                    ("X-Frame-Options", 'DENY')
                ])
'''