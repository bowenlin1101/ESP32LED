import Stream from 'stream'
import http from 'http'
import fetch from 'node-fetch'

const readableStream = new Stream.Readable({
    read(){
        return true
    }
})

const LOCALPORT = "http://<YOUR_LOCAL_IP_ADDRESS>:<YOUR_LOCAL_PORT>/?action=stream"
const SERVERPORT = "http://<YOUR_SERVER_IP_ADDRESS>:<YOUR_SERVER_PORT>/video"

http.get(LOCALPORT, function (res) {
    res.on('data', (chunk) => {
        readableStream.push(chunk)
    })
})

fetch(SERVERPORT, {
    method: 'POST',
    headers: {'Content-Type': 'multipart/x-mixed-replace'},
    body: readableStream,
    // duplex: 'half',
  });