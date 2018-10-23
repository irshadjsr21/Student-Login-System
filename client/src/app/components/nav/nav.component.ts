import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from '../../models/message.model';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, private ms: MessagesService, private router: Router) { }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.removeToken();
    const msg = new Message(['Log Out Successful'], 'success', 4000);
    this.ms.addMessages(msg);
    this.router.navigateByUrl('/login');
  }

}
