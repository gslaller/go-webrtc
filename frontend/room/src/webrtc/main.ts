import { Observable } from "rxjs";

const mode = import.meta.env.MODE as MODE;

type PeerWithStream = Peer & {
    stream: MediaStream;
    disconnect: () => void;
}

type PeerWithAction = Peer & {
    type: "join" | "leave";
}


interface WebRtcImpl {
    connect(meadiStream: MediaStream, userName: string, roomName: string): Promise<void>;
    disconnect(): Promise<void>;
    // return an rxjs observable
    getPeers(): Observable<PeerWithAction>;
    getMessages(): Observable<string>;
    ConnectPeer(peer: Peer): Promise<PeerWithStream>;
    message(message: string, peer: PeerId | null): Promise<void>;

}

export class WebRtcContext implements WebRtcImpl {
    private roomName: string = "";
    private userName: string = "";

    private apiRoute: string;

    constructor() {

        this.apiRoute = "http://localhost:8080"

    }

    async connect(meadiStream: MediaStream, userName: string, roomName: string) {
        this.roomName = roomName;
        this.userName = userName;

    }

    async disconnect() {

    }

    getPeers() {
        let observable = new Observable<PeerWithAction>(subscriber => {
            subscriber.next({ id: "1", name: "laller", type: "join" })
            subscriber.next({ id: "2", name: "laller2", type: "join" })
        });
        return observable
    }

    async DiconnectPeer(peer: Peer): Promise<void> {
        return
    }

    async ConnectPeer(peer: Peer): Promise<PeerWithStream> {
        return {
            ...peer,
            stream: new MediaStream(), disconnect: () => { }
        }
    }

    async message(message: string, peer: PeerId | null): Promise<void> {
        return
    }

    getMessages() {
        let observable = new Observable<string>(subscriber => {
            subscriber.next("message")
            subscriber.next("message2")
        });
        return observable
    }

}

const Zoom = new WebRtcContext();
export default Zoom;