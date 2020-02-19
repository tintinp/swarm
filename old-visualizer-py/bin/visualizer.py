import sys
import os
parentDir = os.path.abspath(os.path.join(os.path.abspath(__file__), '../..'))
sys.path.append(parentDir)
from lib import FlightVisualizer
from lib import UAV
from lib.constants import UDP_INFO
import asyncio
import socket
import json

def updateUAV(uavs, data):
	uavID = data['id']
	position = data['position']
	if uavs.get(uavID):
		uavs[uavID].setPosition(position)
	else:
		uavs[uavID] = UAV(uavID, position)

async def startUDPClient(uavs):
	sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	sock.bind((UDP_INFO.UDP_IP, UDP_INFO.UDP_PORT))
	sock.setblocking(0)
	while True:
		try:
			data, addr = sock.recvfrom(1024)
			data = json.loads(data)
			updateUAV(uavs, data)
		except BlockingIOError:
			await asyncio.sleep(0.01)

if __name__ == '__main__':
	loop = asyncio.get_event_loop()
	uavs = {}
	fv = FlightVisualizer(loop, 1200, 800, uavs)

	fvTask = asyncio.ensure_future(fv.start())
	udpTask = asyncio.ensure_future(startUDPClient(uavs))

	try:
		loop.run_forever()
	except KeyboardInterrupt:
		pass
	finally:
		print('Stopping Visualizer')
		for task in asyncio.Task.all_tasks():
			task.cancel()
		print('Visualizer STOPPED')
