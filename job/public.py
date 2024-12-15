import time

from renus.core.cache import Cache
from renus.core.schedule import Schedule

schedule=Schedule()

while True:
    schedule.every(2).hours().do('delete_expired',Cache().delete_expired)

    schedule.run(logged=True,multi=True)
    time.sleep(1)
