import firebase from "firebase/app"
import "firebase/database"

export default class FirebaseSignallingClient {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBbOU6-h7eFHB42_JdEzG1xaLKflkD_pog",
      authDomain: "webrtc-react-cray.firebaseapp.com",
      databaseURL: "https://webrtc-react-cray-default-rtdb.firebaseio.com",
      projectId: "webrtc-react-cray",
      storageBucket: "webrtc-react-cray.appspot.com",
      messagingSenderId: "670746046536",
      appId: "1:670746046536:web:33f9b5504e404e74ea287d",
    }

    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig)
    }
    this.database = firebase.database()
    this.localPeerName = ""
    this.remotePeerName = ""
  }

  setPeerNames(localPeerName, remotePeerName) {
    this.localPeerName = localPeerName
    this.remotePeerName = remotePeerName
  }

  get targetRef() {
    return this.database.ref(this.remotePeerName)
  }

  async sendOffer(sessionDescription) {
    await this.targetRef.set({
      type: "offer",
      sender: this.localPeerName,
      sessionDescription,
    })
  }

  async sendAnswer(sessionDescription) {
    await this.targetRef.set({
      type: "answer",
      sender: this.localPeerName,
      sessionDescription,
    })
  }

  async sendCandidate(candidate) {
    await this.targetRef.set({
      type: "candidate",
      sender: this.localPeerName,
      candidate,
    })
  }

  async remove(path) {
    await this.database.ref(path).remove()
  }
}
