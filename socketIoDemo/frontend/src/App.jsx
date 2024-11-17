import './App.css'
import {useEffect, useState} from "react";
import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_BACKENDURL);

function App() {
    const API_URL = import.meta.env.VITE_BACKENDURL;
    const [message,setMessage] = useState('');
    const [receivedMessage,setReceivedMessage] = useState('');
    const [room,setRoom] = useState('');

    useEffect(()=>{
        socket.on('receivedMessage',(data)=>{
            console.log(data)
            setReceivedMessage(data.message);
        })
    },[socket]);

    function handleSubmit(){
        // socket.emit('sendMessage', {message,room});

        socket.emit('sendMessage', {message,room});
    }

    function handleJoinRoom(){
        if (room !== "") {
            socket.emit("join_room", room);
        }
    }

  return (
      <>
          <input placeholder={'room'}
                 onChange={e => setRoom(e.target.value)}
          />
          <br/>
          <button onClick={handleJoinRoom}>Join Room</button>
          <br/>
          <input placeholder={'enter message'}
                 onChange={e => setMessage(e.target.value)}
          />
          <br/>
          <button onClick={handleSubmit}>Submit</button>
          <br/>
          <p>Message received: {receivedMessage}</p>
      </>
  )
}

export default App
