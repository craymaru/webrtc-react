import React from "react"
import InputForm from "./components/InputForm"

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
  return (
    <div>
      <InputForm />
    </div>
  )
}

export default App
