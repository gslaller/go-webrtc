import { useEffect, useState } from 'react'
import './App.css'

type Room = {
  name: string;
  participants: number;
}

async function fetchRooms(): Promise<Room[]> {
  const res = await fetch('/api/rooms')
  return res.json()
}

function RenderRoomItem(room: Room) {
  return (
    <li key={room.name}>
      <a href={`/room/${room.name}`} >
        {room.name} ({room.participants})
      </a>
    </li>
  )
}

function App() {

  const [rooms, setRooms] = useState<Room[]>([
    { name: "laller's meeting room", participants: 2 },
    { name: "Hallo Hamburg", participants: 3 },
  ])

  useEffect(() => {
    // fetchRooms().then(rooms => { setRooms(rooms) });

    // TODO: fetch the rooms at regular intervals? 
  }, [])

  return (
    <div className="App">
      <h1>
        Zoom Clone
      </h1>
      <p>
        A simple clone of Zoom, built with WebRTC, React and GO.
      </p>
      <a href="/room" >
        <button>
          Create a new Room
        </button>
      </a>
      <ul>
        {
          rooms.map(room => (
            RenderRoomItem(room)
          ))
        }

      </ul>
    </div>
  )
}

export default App
