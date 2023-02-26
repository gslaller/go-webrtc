import { useEffect, useMemo, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function extractInfoFromUrl() {
  let url = window.location.href
  // get the query params 
  let params = new URL(url).searchParams
  let roomName = params.get('roomName') || ''
  let userName = params.get('userName') || ''
  let fieldsSet = roomName.length != 0 && userName.length != 0;

  return { roomName, userName, fieldsSet }
}

function ModelCard({ roomName, userName }: { roomName: string, userName: string }) {

  let [_roomName, setRoomName] = useState(roomName)
  let [_userName, setUserName] = useState(userName)
  let [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  let [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([])

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()

      .then(devices => {
        let audioDevices = devices.filter(d => d.kind == 'audioinput')
        let videoDevices = devices.filter(d => d.kind == 'videoinput')
        setVideoDevices(videoDevices)
        setAudioDevices(audioDevices)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  let URL = useMemo(() => {
    if (_roomName.length == 0 || _userName.length == 0) {
      return '/room#'
    }
    return `/room?roomName=${_roomName}&userName=${_userName}`
  }, [_roomName, _userName])

  return (
    <div className="App">
      <h1>Please Enter Information</h1>
      <fieldset className="fieldset">
        <legend>Set fields:</legend>
        <table>
          <tbody>
            <tr>
              <td>

                <label htmlFor="roomName">Room Name</label>
              </td>
              <td>
                <input
                  type="text"
                  name="roomName"
                  placeholder='Please enter a room name'
                  value={_roomName}
                  onChange={(e) => setRoomName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="userName">User Name</label>
              </td>
              <td>
                <input
                  type="text"
                  name="userName"
                  placeholder='Please enter a user name'
                  value={_userName}
                  onChange={(e) => setUserName(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="videoDevice">Video Device</label>
              </td>
              <td>
                <select name="videoDevice" id="videoDevice">
                  {
                    videoDevices.map(d => (
                      <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
                    ))
                  }
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="audioDevice">Audio Device</label>
              </td>
              <td>
                <select name="audioDevice" id="audioDevice">
                  {
                    audioDevices.map(d => (
                      <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
                    ))
                  }
                </select>
              </td>
            </tr>
          </tbody>
        </table>

      </fieldset>

      <a href={URL} >
        <button>Join</button>
      </a>
    </div>
  )
}


// There has to be provider which handles all the webrtc related calls.
// 

function App() {

  let { roomName, userName, fieldsSet } = extractInfoFromUrl()
  if (!fieldsSet) {
    return (
      <ModelCard roomName={roomName} userName={userName} />
    )
  }

  const selfVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (selfVideoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (selfVideoRef.current) {
            selfVideoRef.current.srcObject = stream
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  return (

    <div className="App">
      <h1>Welcome <i>{userName}</i> to room: <i>{roomName}</i> </h1>
      <div className="card">
        <video ref={selfVideoRef} autoPlay muted></video>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
