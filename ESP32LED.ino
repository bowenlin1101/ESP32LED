// Load Wi-Fi library
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#define USE_SERIAL Serial

WiFiMulti wifiMulti;

// Replace with your network credentials
const char* ssid = "ssid";
const char* password = "password";

String serverName = "ip-address:80/connect";

// Auxiliar variables to store the current output state
String outputREDState = "off";
String outputBLUEState = "off";
String outputGREENState = "off";

// Assign output variables to LIGHT: pins
const int outputGREEN = 2;
const int outputRED = 0;
const int outputBLUE = 4;

void setup() {
  Serial.begin(115200);
  // Initialize the output variables as outputs
  pinMode(outputRED, OUTPUT);
  pinMode(outputBLUE, OUTPUT);
  pinMode(outputGREEN, OUTPUT);
  // Set outputs to LOW
  digitalWrite(outputRED, LOW);
  digitalWrite(outputBLUE, LOW);
  digitalWrite(outputGREEN, LOW);

  USE_SERIAL.begin(115200);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for(uint8_t t = 4; t > 0; t--) {
      USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
      USE_SERIAL.flush();
      delay(1000);
  }

  wifiMulti.addAP(ssid, password);
}

void loop(){
  // wait for WiFi connection
    if((wifiMulti.run() == WL_CONNECTED)) {

        HTTPClient http;
        USE_SERIAL.print("[HTTP] begin...\n");

        // configure server and url
        http.begin(serverName);

        USE_SERIAL.print("[HTTP] GET...\n");
        // start connection and send HTTP header
        int httpCode = http.GET();
        if(httpCode > 0) {
            // HTTP header has been send and Server response header has been handled
            USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

            // file found at server
            if(httpCode == HTTP_CODE_OK) {

                // get length of document (is -1 when Server sends no Content-Length header)
                int len = http.getSize();

                // create buffer for read
                char buff[128] = { 0 };

                // get tcp stream
                WiFiClient * stream = http.getStreamPtr();

                // read all data from server
                while(http.connected() && (len > 0 || len == -1)) {
                    // get available data size
                    size_t size = stream->available();

                    if(size) {
                        // read up to 128 byte
                        int c = stream->readBytes(buff, ((size > sizeof(buff)) ? sizeof(buff) : size));
                        String command(buff);
                        command.remove(0,1);
                        command.trim();
                        
                        USE_SERIAL.print(command);
                        USE_SERIAL.print(command.indexOf("redOn"));
                        if (command.indexOf("redOn")>=0){
                          digitalWrite(outputRED, HIGH);
                          outputREDState = "on";
                        }

                        if (command.indexOf("blueOn")>=0){
                          digitalWrite(outputBLUE, HIGH);
                          outputBLUEState = "on";
                        }
                        
                        if (command.indexOf("greenOn")>=0){
                          digitalWrite(outputGREEN, HIGH);
                          outputGREENState = "on";
                        }

                        if (command.indexOf("redOff")>=0){
                          digitalWrite(outputRED, LOW);
                          outputREDState = "off";
                        }

                        if (command.indexOf("blueOff")>=0){
                          digitalWrite(outputBLUE, LOW);
                          outputBLUEState = "off";
                        }
                        
                        if (command.indexOf("greenOff")>=0){
                          digitalWrite(outputGREEN, LOW);
                          outputGREENState = "off";
                        }

                        if(len > 0) {
                            len -= c;
                        }
                    }
                    delay(1);
                }

                USE_SERIAL.println();
                USE_SERIAL.print("[HTTP] connection closed or file end.\n");

            }
        } else {
            USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }

        http.end();
    }

    delay(10000);
}
