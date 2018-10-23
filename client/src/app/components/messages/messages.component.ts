import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[];

  constructor(public ms: MessagesService) { }

  ngOnInit() {
    this.ms.getMessages().subscribe(
      messages => this.messages = messages
    );
  }

}
