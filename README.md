Scripts to setup a server where you can control a local LED on the web, and see it change in real time with a webcam livestream.

Steps to run
1. Run ```npm install``` and ```yarn build``` to install all required dependencies and build the react app

2. Run server/server.js on your local machine or a cloud server using ```node server.js``` or ```node server/server.js```, taking note of the ip address. You can change port on server.js to fit your needs. (Default is port 80)

3. On your local machine with webcam, install mjeg-streamer from "https://github.com/jacksonliam/mjpg-streamer"

4. Run the command ```mjpg_streamer -i input_uvc.so -o "output_http.so -p <PORT> -l <YOUR_LOCAL_IP_ADDRESS>"``` to start the camera. Make sure to keep the local ip address and port in mind, as you will need it in step 5.

5. Go to server/videoServer.js and change the LOCALPORT to the ip and port in step 4 and SERVERPORT to the ip and port in step 2

6. Connect your ESP32 microcontroller to your local device

7. Open Arduino application and open the ESP32LED.ino

8. In ESP32LED.ino change the ssid to your wifi and the password to your wifi password

9. Change the serverName to your ip and port in step 2

10. Upload the Sketch

11. Go to the ip and port in step 2 on any browser

12. Press the buttons and try it out
