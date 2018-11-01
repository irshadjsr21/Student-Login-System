import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: Message[] = [];

  constructor() { }

  addMessages(message: Message) {
    this.messages.unshift(message);
    setTimeout(() => { this.messages.pop(); }, message.time);
  }

  getMessages(): Observable<Message[]> {
    return new Observable(
      observer => {
        observer.next(this.messages);
      }
    );
  }
}
