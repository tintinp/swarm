import socket
import json

UDP_IP = '127.0.0.1'
UDP_PORT = 55555

data =  {
	'id': '1',
	'position': {
		'lat': 120,
		'lon': 500,
		'height': -10.1
	}
}

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto(json.dumps(data).encode(), (UDP_IP, UDP_PORT))
