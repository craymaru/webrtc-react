import React, { useState } from "react"
import InputFormLocal from "./components/InputFormLocal"
import InputFormRemote from "./components/InputFormRemote"
import VideoArea from "./components/VideoArea"

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
      <VideoArea localPeerName={localPeerName} remotePeerName={remotePeerName} />
    </div>
  )
}

export default App
