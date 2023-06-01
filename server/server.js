import express from "express";
import bodyParser from "body-parser";
import * as path from 'path';
import cors from 'cors';
import Reactor from "./reactor.js";

const app = express();
var reactor = new Reactor();

reactor.registerEvent("redOn")
reactor.registerEvent("redOff")
reactor.registerEvent("blueOn")
reactor.registerEvent("blueOff")
reactor.registerEvent("greenOn")
reactor.registerEvent("greenOff")

app.use(express.static(path.join("server","..","build")))
app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 8000;

let clients = [];
let states = {red: false, blue: false, green: false}
function eventsHandler(request, response, next) {
    console.log("Webclient Connected")
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
  
    const data = `data: ${JSON.stringify(states)}\n\n`;
  
    response.write(data);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response
    };
  
    clients.push(newClient);
  
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
}

app.get('/webClients', eventsHandler);

function sendEventsToAll() {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(states)}\n\n`))
}

app.get('/connect', (req,res) => {
    res.write("Connected")
    console.log("ESP32 is connected")

    reactor.addEventListener("redOn",()=>{
        res.write(`redOn`)
    })
    reactor.addEventListener("redOff",()=>{
        res.write(`redOff`)
    })
    reactor.addEventListener("blueOn",()=>{
        res.write(`blueOn`)
    })
    reactor.addEventListener("blueOff",()=>{
        res.write(`blueOff`)
    })
    reactor.addEventListener("greenOn",()=>{
        res.write(`greenOn`)
    })
    reactor.addEventListener("greenOff",()=>{
        res.write(`greenOff`)
    })
})

app.post("/redOn", async (req,res) => {
    states.red = true;
    res.json(states)
    reactor.dispatchEvent("redOn")
    return sendEventsToAll();
})

app.post("/redOff", async (req,res) => {
    states.red = false;
    reactor.dispatchEvent("redOff")
    res.json(states)
    return sendEventsToAll()
})

app.post("/blueOn",async (req,res) => {
    states.blue = true;
    reactor.dispatchEvent("blueOn")
    res.json(states)
    return sendEventsToAll()
})

app.post("/blueOff",async (req,res) => {
    states.blue = false;
    reactor.dispatchEvent("blueOff")
    res.json(states)
    return sendEventsToAll()
})

app.post("/greenOn",async (req,res) => {
    states.green = true;
    reactor.dispatchEvent("greenOn")
    res.json(states)
    return sendEventsToAll()
})

app.post("/greenOff",async (req,res) => {
    states.green = false;
    reactor.dispatchEvent("greenOff")
    res.json(states)
    return sendEventsToAll()
})

app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
});
