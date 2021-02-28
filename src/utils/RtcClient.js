import FirebaseSignallingClient from "./FirebaseSignallingClient"

export default class RtcClient {
  constructor(remoteVideoRef, setRtcClient) {
    const config = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    }
    this.rtcPeerConnection = new RTCPeerConnection(config)
    this.firebaseSignallingClient = new FirebaseSignallingClient()
    this.localPeerName = ""
    this.remotePeerName = ""
    this.remoteVideoRef = remoteVideoRef
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

  async offer() {
    const sessionDescription = await this.createOffer()
    await this.setLocalDescription(sessionDescription)
    await this.sendOffer()
  }

  async createOffer() {
    try {
      return await this.rtcPeerConnection.createOffer()
    } catch (error) {
      console.error(error)
    }
  }

  async setLocalDescription(sessionDescription) {
    try {
      await this.rtcPeerConnection.setLocalDescription(sessionDescription)
    } catch (error) {
      console.error(error)
    }
  }

  async sendOffer() {
    this.firebaseSignallingClient.setPeerNames(this.localPeerName, this.remotePeerName)
    await this.firebaseSignallingClient.sendOffer(this.localDescription)
  }

  setOnTrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if (rtcTrackEvent.track.kind !== "video") return
      const remoteMediaStream = rtcTrackEvent.streams[0]
      this.remoteVideoRef.current.srcObject = remoteMediaStream
      this.setRtcClient()
    }
    this.setRtcClient()
  }

  async answer(sender, sessionDescription) {
    try {
      this.remotePeerName = sender
      this.setOnIceCandidateCallback()
      this.setOnTrack()
      await this.setRemoteDescription(sessionDescription)
      const answer = await this.rtcPeerConnection.createAnswer()
      this.rtcPeerConnection.setLocalDescription(answer)
      await this.sendAnswer()
    } catch (error) {
      console.error(error)
    }
  }

  async connect(remotePeerName) {
    this.remotePeerName = remotePeerName
    this.setOnIceCandidateCallback()
    this.setOnTrack()
    await this.offer()
    this.setRtcClient()
  }

  async setRemoteDescription(sessionDescription) {
    await this.rtcPeerConnection.setRemoteDescription(sessionDescription)
  }

  async sendAnswer() {
    this.firebaseSignallingClient.setPeerNames(this.localPeerName, this.remotePeerName)
    await this.firebaseSignallingClient.sendAnswer(this.localDescription)
  }

  async saveRecievedSessionDescription(sessionDescription) {
    try {
      await this.setRemoteDescription(sessionDescription)
    } catch (error) {
      console.error(error)
    }
  }

  get localDescription() {
    return this.rtcPeerConnection.localDescription.toJSON()
  }

  setOnIceCandidateCallback() {
    this.rtcPeerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        // TODO: remoteへCandidateを通知する
      } else {
      }
    }
  }

  async startListening(localPeerName) {
    this.localPeerName = localPeerName
    this.setRtcClient()
    await this.firebaseSignallingClient.remove(localPeerName)
    this.firebaseSignallingClient.database.ref(localPeerName).on("value", async (snapshot) => {
      const data = snapshot.val()
      if (!data) return
      const { sender, sessionDescription, type } = data
      switch (type) {
        case "offer":
          await this.answer(sender, sessionDescription)
          break
        case "answer":
          await this.saveRecievedSessionDescription(sessionDescription)
          break
        default:
          break
      }
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
    this.rtcPeerConnection.addTrack(this.videoTrack, this.mediaStream)
  }

  get audioTrack() {
    return this.mediaStream.getAudioTracks()[0]
  }

  get videoTrack() {
    return this.mediaStream.getVideoTracks()[0]
  }
}
