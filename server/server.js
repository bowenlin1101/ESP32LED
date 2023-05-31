import express from "express";
import * as path from 'path';
import Reactor from "./reactor.js";

const app = express();
var reactor = new Reactor();

app.use(express.static(path.join("server","..","build")))
app.use(express.static("public"))

reactor.registerEvent("redOn")
reactor.registerEvent("redOff")
reactor.registerEvent("blueOn")
reactor.registerEvent("blueOff")
reactor.registerEvent("greenOn")
reactor.registerEvent("greenOff")

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

app.post("/redOn",(req,res) => {
    reactor.dispatchEvent("redOn")
    res.send("on")
})

app.post("/redOff",(req,res) => {
    reactor.dispatchEvent("redOff")
    res.send("off")
})

app.post("/blueOn",(req,res) => {
    reactor.dispatchEvent("blueOn")
    res.send("on")
})

app.post("/blueOff",(req,res) => {
    reactor.dispatchEvent("blueOff")
    res.send("off")
})

app.post("/greenOn",(req,res) => {
    reactor.dispatchEvent("greenOn")
    res.send("on")
})

app.post("/greenOff",(req,res) => {
    reactor.dispatchEvent("greenOff")
    res.send("off")
})

app.listen(80,()=>{
        console.log("server running on port 80");
});
