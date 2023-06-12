import './styles.css';
import React, {useCallback, useEffect, useState } from "react";

function App () {
    const [red, setRed] = useState(false);
    const [blue, setBlue] = useState(false);
    const [green, setGreen] = useState(false);
    const [listeningLED, setListeningLED] = useState(false);

    useEffect(() => {
        if (!listeningLED) {
            const events = new EventSource('/webClients');

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data)
                setRed(parsedData.red)
                setBlue(parsedData.blue)
                setGreen(parsedData.green)
            }
            setListeningLED(true);
        }
    }, [listeningLED,red, blue, green])
    
    return (<>
        <h1>ESP32 LED Control Panel</h1>
        <div id="main-container">
            <div id="control-panel">
                <Red red={red} setRed={setRed} />
                <Blue blue={blue} setBlue={setBlue}/>
                <Green green={green} setGreen={setGreen}/>
            </div>
            <div id="video">
                <img src='/videoClients'></img>

            </div>
        </div>
        
    </>)
}

function Red (props){
    const text = props.red ? "Turn Off" : "Turn On"
    const styles = props.red ? "on" : "off"
    function onClick(red){
        const extension = red ? "redOff" : "redOn"
        fetch(`${extension}`, {
            method: "POST"
        });
    }

    const debouncedClick = useCallback(
        debounce_leading((red) => onClick(red))
    ,[])

    return <>
        <button className={`red-button ${styles}`} onClick={() => debouncedClick(props.red)}>{text}</button>
    </>
}

function Blue (props) {
    const text = props.blue ? "Turn Off" : "Turn On"
    const styles = props.blue ? "on" : "off"
    function onClick(blue){
        const extension = blue ? "blueOff" : "blueOn"
        fetch(`${extension}`, {
            method: "POST"
        });
    }

    const debouncedClick = useCallback(
        debounce_leading((blue) => onClick(blue))
    ,[])

    return <>
        <button className={`blue-button ${styles}`} onClick={() => debouncedClick(props.blue)}>{text}</button>
    </>
}
  
function Green (props) {
    const text = props.green ? "Turn Off" : "Turn On"
    const styles = props.green ? "on" : "off"
    function onClick(green){
        const extension = green ? "greenOff" : "greenOn"
        fetch(`${extension}`, {
            method: "POST"
        });
    }

    const debouncedClick = useCallback(
        debounce_leading((green) => onClick(green))
    ,[])

    return <>
        <button className={`green-button ${styles}`} onClick={() => debouncedClick(props.green)}>{text}</button>
    </>
}
  
function debounce_leading(func, timeout = 300){
    let timer;
    return (...args) => {
      if (!timer) {
        func.apply(this, args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
}

export default App;
  
