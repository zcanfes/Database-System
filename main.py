from threading import Thread
import threading
import subprocess
import json
import socket

# TYPES = {
#     1: "DISCOVER",
#     2: "DISCOVER_RESPONSE",
#     3: "CHAT"
# }
PORT = 12345
IP_ADDRESS = socket.gethostbyname(socket.gethostname())

name = ""
online_users = {}
last_console_message = ""


def main():
    global name
    name = input("Welcome to NetCat Chat!\nWhat is your name: ")
    print("Online users are discovering...")

    Thread(target=discover_all_in_every_5_sec).start()
    Thread(target=listen).start()

    send_chat()


def discover_all_in_every_5_sec():
    receiver_ips = [f'{".".join(IP_ADDRESS.split(".")[:3])}.{number}' for number in range(0, 256)]

    e = threading.Event()
    while not e.wait(5):
        for receiver_ip in receiver_ips:
            thread = Thread(target=send_discover, args=[receiver_ip])
            thread.start()


def print_online_users():
    print("Online Users:")
    for user in online_users:
        print(user)

    if len(online_users) == 0:
        print("There is not any online user right now.")


def listen():
    while(True):
        output = subprocess.check_output("nc -l 12345", shell=True)
        content = json.loads(output.decode("utf-8"))

        if content["type"] == 1:
            get_discover(content)
        elif content["type"] == 2:
            get_discover_response(content)
        elif content["type"] == 3:
            get_chat(content)


def get_discover(content):
    send_discover_response(content["ip"])


def get_discover_response(content):
    online_users[content["name"]] = content["ip"]
    print_online_users()


def get_chat(content):
    print()
    print("-----------------------------------")
    print("New message!!!")
    print("Sender:", content["name"])
    print('Message: ', content["body"])
    print("-----------------------------------")
    print(last_console_message, end="", flush=True)


def send_discover(receiver_ip):
    message = json.dumps({
        "type": 1,
        "name": name,
        "ip": IP_ADDRESS
    })
    subprocess.run(f"echo '{message}' | nc {receiver_ip} {PORT}", shell=True)


def send_discover_response(receiver_ip):
    message = json.dumps({
        "type": 2,
        "name": name,
        "ip": IP_ADDRESS
    })
    subprocess.run(f"echo '{message}' | nc {receiver_ip} {PORT}", shell=True)


def send_chat():
    global last_console_message

    while(True):
        last_console_message = "Write the name of the user you want to send a message: "
        receiver_name = input(last_console_message)
        last_console_message = "Write the message: "
        body = input(last_console_message)

        message = json.dumps({
            "type": 3,
            "name": name,
            "body": body
        })
        response = subprocess.run(f"echo '{message}' | nc -w 5 {online_users[receiver_name]} {PORT}", shell=True)

        if response.returncode == 0:
            print("Message successfully sent!")
        else:
            online_users.pop(receiver_name)
            print("Message couldn't sent!")


if __name__ == "__main__":
    main()
