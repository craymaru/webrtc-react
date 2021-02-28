import React, { useRef, useEffect } from "react"

import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

const Video = ({ userName, isLocal }) => {
  const classes = useStyles()

  const videoRef = useRef(null)
  const currentVideoRef = videoRef.current

  useEffect(() => {
    if (currentVideoRef === null) return
    const getMedia = async () => {
      const constraints = { audio: true, video: true }

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
        currentVideoRef.srcObject = mediaStream
      } catch (err) {
        console.err(err)
      }
    }
    getMedia()
  }, [currentVideoRef])

  return (
    <Paper className={classes.paper}>
      <video ref={videoRef} autoPlay muted={isLocal} width={400} height={200} />
      <div>{userName}</div>
    </Paper>
  )
}

export default Video
