import io, { Socket } from "socket.io-client";
import { IMessage } from "../Container/Pages/Chat/ChatBox/ChatBox";

class SocketIO {
  // private server: string = "https://alzheimer-backend.herokuapp.com";/
  private server: string = "https://alzheimer-server.herokuapp.com/";
  public socket: Socket = io(this.server);

  connectWithSocketIoServer() {
    this.socket.on("connection", () => {
    });
  }

  onReceiveMessage(cb: any) {
    this.socket.on("receive-message", (message) => {
      cb(message);
    });
  }

  onReceiveNotification(cb: any) {
    this.socket.on("receive-notification", (message) => {
      cb(message);
    });
  }



  onReceiveStartTypingMessage(cb: any) {
    this.socket.on("typing", () => {
      cb();
    });
  }

  onReceiveStopTypingMessage(cb: any) {
    this.socket.on("stop typing", () => {
      cb();
    });
  }

  onSendStartTypingMessage(roomId: string) {
    this.socket.emit("typing", roomId);
  }

  onSendStopTypingMessage(roomId: string) {
    this.socket.emit("stop typing", roomId);
  }

  setup(roomId: string) {
    this.socket.emit("setup", roomId);
  }

  joinRoom(roomId: string) {
    this.socket.emit("join-room", roomId);
  }

  leaveRoom(roomId: string) {
    this.socket.emit("leave-room", roomId);
  }

  sendMessage(message: IMessage, roomId: string, userId: string) {
    this.socket.emit("send-message", message, roomId, userId);
  }
}

export default SocketIO;
