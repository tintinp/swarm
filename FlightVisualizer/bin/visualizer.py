import sys
import os
parentDir = os.path.abspath(os.path.join(os.path.abspath(__file__), '../..'))
sys.path.append(parentDir)
from lib import FlightVisualizer
import asyncio
import socket
import json

if __name__ == '__main__':
	loop = asyncio.get_event_loop()
	uavs = []
	fv = FlightVisualizer(loop, 1200, 800, uavs)

	fvTask = asyncio.ensure_future(fv.start())

	try:
		loop.run_forever()
	except KeyboardInterrupt:
		pass
	finally:
		print('Stopping Visualizer')
		for task in asyncio.Task.all_tasks():
			task.cancel()
		print('Visualizer STOPPED')
