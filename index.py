import uvicorn,os
import multiprocessing
from renus.app import App
import routes.index
from extension.renus.tracker.middleware import TrackerMiddleware

workers = multiprocessing.cpu_count() * 2 + 1

app = App(middlewares=[TrackerMiddleware().handle])

if __name__ == "__main__":
    uvicorn.run("index:app", host="127.0.0.1",
                port=4000,server_header=False,workers=workers,
                reload=True, log_level="info",
                headers=[
                    ("X-Frame-Options", 'DENY'),
                    ("Access-Control-Allow-Headers", '*'),
                    ("Access-Control-Allow-Origin", '*')
                ])
