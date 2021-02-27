import React, { useState } from "react"
import InputFormLocal from "./components/InputFormLocal"
import InputFormRemote from "./components/InputFormRemote"

const getMedia = async () => {
  const constraints = { audio: true, video: true }

  try {
    return await navigator.mediaDevices.getUserMedia(constraints)
  } catch (err) {
    console.err(err)
  }
}
getMedia()

const App = () => {
  const [localPeerName, setLocalPeerName] = useState("")
  const [remotePeerName, setRemotePeerName] = useState("")

  return (
    <div>
      <InputFormLocal localPeerName={localPeerName} setLocalPeerName={setLocalPeerName} />
      <InputFormRemote
        localPeerName={localPeerName}
        remotePeerName={remotePeerName}
        setRemotePeerName={setRemotePeerName}
      />
    </div>
  )
}

export default App
