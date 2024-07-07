// src/websocketService.js
class WebSocketService {
    static instance = null;
    callbacks = {};
  
    static getInstance() {
      if (!WebSocketService.instance) {
        WebSocketService.instance = new WebSocketService();
      }
      return WebSocketService.instance;
    }
  
    constructor() {
      this.socketRef = null;
    }
  
    connect(url) {
      this.socketRef = new WebSocket(url);
  
      this.socketRef.onopen = () => {
        console.log('WebSocket open');
      };
  
      this.socketRef.onmessage = (e) => {
        this.socketNewMessage(e.data);
      };
  
      this.socketRef.onerror = (e) => {
        console.log('WebSocket error', e.message);
      };
  
      this.socketRef.onclose = () => {
        console.log('WebSocket closed, trying to reconnect');
        this.connect(url);
      };
    }
  
    socketNewMessage(data) {
      Object.keys(this.callbacks).forEach((key) => {
        this.callbacks[key](data);
      });
    }
  
    addCallbacks(callback) {
      this.callbacks[callback] = callback;
    }
  
    send(data) {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
  
    state() {
      return this.socketRef.readyState;
    }
  
    waitForSocketConnection(callback) {
      const socket = this.socketRef;
      const recursion = this.waitForSocketConnection;
      setTimeout(() => {
        if (socket.readyState === 1) {
          callback();
        } else {
          console.log('waiting for connection...');
          recursion(callback);
        }
      }, 1);
    }
  }
  
  export default WebSocketService.getInstance();
  