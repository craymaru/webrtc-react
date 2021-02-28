import React from "react"
import VideoArea from "./components/VideoArea"
import useRtcClient from "./components/hooks/useRtcClient"

import InputForms from "./components/InputForms"

const App = () => {
  const rtcClient = useRtcClient()

  return (
    <>
      <InputForms rtcClient={rtcClient} />
      <VideoArea rtcClient={rtcClient} />
    </>
  )
}

export default App
