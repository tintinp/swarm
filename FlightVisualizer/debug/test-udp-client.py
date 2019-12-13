import socket
import json

UDP_IP = '127.0.0.1'
UDP_PORT = 55555

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))

while True:
	data, addr = sock.recvfrom(1024)
	print(json.loads(data))
