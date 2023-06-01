import './styles.css';
import React, {useEffect, useState } from "react";

function App () {
    const [red, setRed] = useState(false);
    const [blue, setBlue] = useState(false);
    const [green, setGreen] = useState(false);
    const [listening, setListening] = useState(false);

    useEffect(() => {
        if (!listening) {
            const events = new EventSource('/webClients');

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data)
                setRed(parsedData.red)
                setBlue(parsedData.blue)
                setGreen(parsedData.green)
            }
            setListening(true);
        }
    }, [listening,red, blue, green])

    return (<>
        <h1>ESP32 LED Control Panel</h1>
        <div id="main-container">
            <Red red={red} setRed={setRed} />
            <Blue blue={blue} setBlue={setBlue}/>
            <Green green={green} setGreen={setGreen}/>
        </div>
    </>)
}

function Red (props){
    const state = props.red ? "Current state: On" : "Current state: Off"
    const text = props.red ? "Turn Off" : "Turn On"
    const styles = props.red ? "on" : "off"
    function onClick(){
        const extension = props.red ? "redOff" : "redOn"
        fetch(`${extension}`, {
            method: "POST"
        });
    }

    return <>
        <h2>{state}</h2>
        <button className={`red-button ${styles}`} onClick={onClick}>{text}</button>
    </>
}

function Blue (props) {
    const state = props.blue ? "Current state: On" : "Current state: Off"
    const text = props.blue ? "Turn Off" : "Turn On"
    const styles = props.blue ? "on" : "off"
    function onClick(){
        const extension = props.blue ? "/blueOff" : "blueOn"
        fetch(`${extension}`, {
            method: "POST"
        });
    }

    return <>
        <h2>{state}</h2>
        <button className={`blue-button ${styles}`} onClick={onClick}>{text}</button>
    </>
}
  
function Green (props) {
    const state = props.green ? "Current state: On" : "Current state: Off"
    const text = props.green ? "Turn Off" : "Turn On"
    const styles = props.green ? "on" : "off"
    function onClick(){
        const extension = props.green ? "/greenOff" : "greenOn"
        fetch(`${extension}`, {
            method: "POST"
        });
    }

    return <>
        <h2>{state}</h2>
        <button className={`green-button ${styles}`} onClick={onClick}>{text}</button>
    </>
}
  
export default App;
  