export default class BaseRtcClient {
  constructor() {
    const config = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    }
    this.rtcPeerConnection = new RtcPeerConnection(config)
    this.localPeerName = ""
    this.remotePeerName = ""
  }
}
