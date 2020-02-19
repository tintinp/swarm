import sys
import os
parentDir = os.path.abspath(os.path.join(os.path.abspath(__file__), '../..'))
sys.path.append(parentDir)
from lib import FlightVisualizer
import asyncio

if __name__ == '__main__':
	loop = asyncio.get_event_loop()

	fv = FlightVisualizer(loop, 1200, 800, [])

	fvTask = asyncio.ensure_future(fv.start())

	try:
		loop.run_forever()
	except KeyboardInterrupt:
		pass
	finally:
		print('Stopping __main__')
		for task in asyncio.Task.all_tasks():
			task.cancel()
