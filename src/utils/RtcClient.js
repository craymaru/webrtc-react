import FirebaseSignallingClient from "./FirebaseSignallingClient"

export default class BaseRtcClient {
  constructor(setRtcClient) {
    const config = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    }
    this.rtcPeerConnection = new RTCPeerConnection(config)
    this.firebaseSignallingClient = new FirebaseSignallingClient()
    this.localPeerName = ""
    this.remotePeerName = ""
    this._setRtcClient = setRtcClient
    this.mediaStream = null
  }

  setRtcClient() {
    this._setRtcClient(this)
  }

  async getUserMedia() {
    try {
      const constraints = { audio: true, video: true }
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
    } catch (error) {
      console.error(error)
    }
  }

  async setMediaStream(mediaStream) {
    await this.getUserMedia()
    this.addTracks()
    this.setRtcClient()
  }

  startListening(localPeerName) {
    this.localPeerName = localPeerName
    this.setRtcClient()
    this.firebaseSignallingClient.database.ref(localPeerName).on("value", (snapshot) => {
      const data = snapshot.val()
    })
  }

  addTracks() {
    this.addAudioTrack()
    this.addVideoTrack()
  }

  addAudioTrack() {
    this.rtcPeerConnection.addTrack(this.audioTrack, this.mediaStream)
  }
  addVideoTrack() {
    this.rtcPeerConnection.addTrack(this.VideoTrack, this.mediaStream)
  }

  get audioTrack() {
    return this.mediaStream.getAudioTracks()[0]
  }

  get videoTrack() {
    return this.mediaStream.getVideoTracks()[0]
  }
}
