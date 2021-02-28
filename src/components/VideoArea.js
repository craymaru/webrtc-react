import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import Video from "./Video"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

const VideoArea = ({ localPeerName, remotePeerName }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Video userName={localPeerName} isLocal={true} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Video userName={remotePeerName} isLocal={true} />
        </Grid>
      </Grid>
    </div>
  )
}

export default VideoArea
