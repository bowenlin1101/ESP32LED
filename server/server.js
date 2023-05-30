import express from "express";
import * as path from 'path';
import Reactor from "./reactor.js";

const app = express();
var reactor = new Reactor();

app.use(express.static(path.join("..","build")))
app.use(express.static("public"))

reactor.registerEvent("redOn")
reactor.registerEvent("redOff")
reactor.registerEvent("blueOn")
reactor.registerEvent("blueOff")
reactor.registerEvent("greenOff")
reactor.registerEvent("greenOff")

app.post('/connect', (req,res) => {
    
    reactor.addEventListener("redOn",
        ()=>{
            res.send(`"redOn"`)
        }
    )

    reactor.addEventListener("redOff",
        ()=>{
            res.send(`"redOff"`)
        }
    )

    reactor.addEventListener("blueOn",
        ()=>{
            res.send(`"blueOn"`)
        }
    )

    reactor.addEventListener("blueOff",
        ()=>{
            res.send(`"blueOff"`)
        }
    )

    reactor.addEventListener("greenOn",
        ()=>{
            res.send(`"greenOn"`)
        }
    )

    reactor.addEventListener("greenOff",
        ()=>{
            res.send(`"greenOff"`)
        }
    )
})

app.post("/redOn",(req,res) => {
    reactor.dispatchEvent("redOn")
    console.log("ON")
})

app.post("/redOff",(req,res) => {
    reactor.dispatchEvent(redOff)

})

app.post("/blueOn",(req,res) => {
    reactor.dispatchEvent(blueOn)
})

app.post("/blueOff",(req,res) => {
    reactor.dispatchEvent(blueOff)
})

app.post("/greenOn",(req,res) => {
    reactor.dispatchEvent(greenOn)
})

app.post("/greenOff",(req,res) => {
    reactor.dispatchEvent(greenOff)
})

app.listen(8000);