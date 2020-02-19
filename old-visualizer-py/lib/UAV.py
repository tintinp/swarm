from .constants import COLORS

class UAV:
	def __init__(self, uavID, position = { 'lat': 0.0, 'lon': 0.0, 'height': 0.0 }, color = COLORS.RED):
		self.id = uavID
		self.position = position
		self.color = color
		self.path = []

	def setID(self, newID):
		self.id = newID

	def getID(self):
		return self.id

	def setPosition(self, position):
		self.position = position

	def getPosition(self):
		return self.position

	def getPath(self):
		return self.path
