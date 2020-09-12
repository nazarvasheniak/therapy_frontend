import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SocketMessage } from '../models';

export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable()
export class NotificationsService {
    private stream = new WebSocket(WS_ENDPOINT);
    private _streamMessage = new BehaviorSubject<MessageEvent>(null);

    public get streamMessage() {
        return this._streamMessage.asObservable();
    }

    constructor() {
        this.stream.onopen = () => {
            this.stream.onmessage = (msg) => {
                this._streamMessage.next(msg);
            }
        }
    }

    public openStream(userID: number) {
        this.stream.close();
        this.stream = new WebSocket(`${WS_ENDPOINT}`);

        this.stream.onopen = () => {
            const req: SocketMessage = {
                userID: userID
            };

            this.stream.send(JSON.stringify(req));
            
            this.stream.onmessage = (msg) => {
                this._streamMessage.next(msg);
            }
        }
    }

    public closeStream() {
        this.stream.close();
    }

    public sendMessage(msg: any) {
        this.stream.send(msg);
    }
}