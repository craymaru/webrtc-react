import React, { useCallback, useEffect, useState } from "react"

import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/craymaru">
        Cray
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const InputFormRemote = ({ rtcClient }) => {
  const classes = useStyles()

  const [name, setName] = useState("")
  const [disabled, setDisabled] = useState(true)
  const [isComposed, setIsComposed] = useState(false)

  useEffect(() => {
    setDisabled(!name)
  }, [name])

  const initializePeer = useCallback(
    (event) => {
      event.preventDefault()
      rtcClient.connect(name)
    },
    [name, rtcClient]
  )

  if (!rtcClient.localPeerName) return <></>
  if (rtcClient.remotePeerName) return <></>

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Please input remote person name to connect.
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Remote person name"
            name="username"
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onCompositionStart={() => setIsComposed(false)}
            onCompositionEnd={() => setIsComposed(true)}
            onKeyDown={(e) => {
              if (isComposed) return
              if (e.target.value === "") return
              if (e.key === "Enter") initializePeer(e)
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
            onClick={initializePeer}
          >
            Apply
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default InputFormRemote
