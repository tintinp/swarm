import pygame
from .constants import colors
import asyncio

class FlightVisualizer:
	def __init__(self, loop, length, width, uavs):
		self.loop = loop
		self.uavs = uavs
		self.running = True
		self.canvas = pygame.display.set_mode((length, width))
		self.eventQueue = asyncio.Queue()

	def setup(self):
		pygame.init()
		pygame.display.set_caption('Flight Visualizer')
	
	def drawUAV(self, uav):
		pygame.draw.rect(self.canvas, uav.color, uav.rect)
		
	async def handleEvent(self):
		while True:
			event = await self.eventQueue.get()
			if event.type == pygame.QUIT:
				self.running = False
				break
		pygame.quit()
		print('Animation STOPPED')
		asyncio.get_event_loop().stop()

	async def animate(self):
		print('Animation STARTED')
		i = 1
		while True:
			self.canvas.fill(colors.BLACK)
			for uav in self.uavs:
				self.drawUAV(uav)
			pygame.display.update()
			await asyncio.sleep(0.01)

	async def pygameEvent(self):
		self.setup()
		while True:
			events = pygame.event.get()
			for event in events:
				asyncio.run_coroutine_threadsafe(self.eventQueue.put(event), loop=self.loop)
			await asyncio.sleep(0.01)

	async def start(self):
		pygameEventTask = asyncio.ensure_future(self.pygameEvent())
		animateTask = asyncio.ensure_future(self.animate())
		handleEventTask = asyncio.ensure_future(self.handleEvent())

	def stop(self):
		self.running = False
