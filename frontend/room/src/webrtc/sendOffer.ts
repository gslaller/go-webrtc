
async function sendOffer(offer: RTCSessionDescription): Promise<RTCSessionDescription> {
    let response = await fetch(URL + "/offer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(offer),
    })
    let data = await response.json() as RTCSessionDescription
    return data
}

async function createInboundConnect(peerId: PeerId) {
    // first check if the peer even is transmitting a stream
    // can a peer actually not transmit a stream?.
    // the peer is only registered if it is transmitting a stream
}

async function createOutboundConnection(stream: MediaStream): Promise<[RTCPeerConnection, RTCDataChannel]> {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            reject("timeout");
        }, 10000);

        let peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302"
                }
            ],
        })

        // There is a 



        // add two tracks to the peer connection
        if (stream !== undefined) {
            peer.addTrack((stream.getVideoTracks())[0], stream);
            peer.addTrack((stream.getAudioTracks())[0], stream);
        }

        peer.ontrack = (event) => {
            event.streams
            console.log("track added")
        }

        let channel = peer.createDataChannel("datachannel", { ordered: true })
        channel.onopen = () => {
            console.log("data channel opened")
        }

        peer.createOffer().then(offer => {
            peer.setLocalDescription(offer)
        })

        peer.onconnectionstatechange = () => {
            console.log("connection state changed to " + peer.connectionState)
        }


        peer.onicecandidate = async () => {
            if (peer.iceGatheringState === "complete") {
                let SDP = peer.localDescription;
                if (SDP !== null) {

                    let answer = await sendOffer(SDP);
                    await peer.setRemoteDescription(answer)
                    resolve([peer, channel])
                }
            }
        };

    });
}