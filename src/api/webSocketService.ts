import Geolocation from 'react-native-geolocation-service';

class WebSocketService {
  private static instance: WebSocketService | null = null;
  private socket: WebSocket | null = null;
  private onRunningDataIdReceived: ((runningDataId: number) => void) | null = null; // 콜백 함수

  private constructor(url: string) {
    this.socket = new WebSocket(url);
    this.socket.onopen = () => console.log('WebSocket connected');
    this.socket.onclose = (e) =>
      console.log('WebSocket closed', e.code, e.reason);
    this.socket.onerror = (e) => console.error('WebSocket error', e);

    this.socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log('서버에서 받은 메시지:', message);

      if (message.type === 'REQUEST_GPS') {
        this.sendLocation();
      }

      if (message.type === 'END' && this.onRunningDataIdReceived) {
        const { runningDataId } = message.payload;
        console.log('받은 runningDataId:', runningDataId);

        if (runningDataId) {
        this.onRunningDataIdReceived(runningDataId); 
       }
        this.closeConnection();
      }
    };
  }

  public static getInstance(url: string): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(url);
    }
    return WebSocketService.instance;
  }

  public setOnRunningDataIdReceived(callback: (runningDataId: number) => void) {
    this.onRunningDataIdReceived = callback;
  }

  sendLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const message = JSON.stringify({
          type: 'location',
          payload: {
            latitude: latitude,
            longitude: longitude,
          },
        });
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(message);
          console.log(`위치 전송: ${message}`);
        }
      },
      (error) => {
        console.error('위치 정보를 가져오는 중 에러 발생:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  sendMessage = (statusType: string, totalRunningTime?: string) => {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'status',
        payload: {
          start: statusType === 'start',
          pause: statusType === 'pause',
          restart: statusType === 'restart',
          finish: statusType === 'finish',
        },
        totalRunningTime: statusType === 'finish' ? totalRunningTime : undefined,
      });
      this.socket.send(message);
      console.log(`로그 : ${message}`);
    }
  };

  closeConnection = () => {
    if (this.socket) {
      this.socket.close();
    }
    WebSocketService.instance = null; 
  };
}

export default WebSocketService;
