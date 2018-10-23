import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private ms: MessagesService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.authService.isTeacherLoggedIn()) {
      this.router.navigateByUrl('/login');
      const msg = new Message(['Login Required'], 'danger', 4000);
      this.ms.addMessages(msg);
      this.authService.removeToken();
      return false;
    }
    return true;
  }
}
