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

const Video = ({ rtcClient, isLocal }) => {
  const classes = useStyles()

  const videoRef = rtcClient.remoteVideoRef

  return (
    <Paper className={classes.paper}>
      <video ref={videoRef} autoPlay muted={isLocal} width={400} height={200} />
      <div>{rtcClient.remotePeerName}</div>
    </Paper>
  )
}

export default Video
