import Stream from 'stream'
import http from 'http'
import fetch from 'node-fetch'

const readableStream = new Stream.Readable({
    read(){
        return true
    }
})

http.get('http://192.168.0.87:8080/?action=stream', function (res) {
    res.on('data', (chunk) => {
        readableStream.push(chunk)
    })
})

fetch("http://192.168.0.87:8000/video", {
    method: 'POST',
    headers: {'Content-Type': 'multipart/x-mixed-replace'},
    body: readableStream,
    // duplex: 'half',
  });