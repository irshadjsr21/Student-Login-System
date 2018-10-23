import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Message } from '../models/message.model';
import { MessagesService } from '../services/messages.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router, private ms: MessagesService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('noAuth')) {
            return next.handle(req.clone());
        } else {
            const cloneReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
            });
            return next.handle(cloneReq).pipe(
                tap(
                    result => {

                    },
                    error => {
                        this.router.navigateByUrl('/login');
                        const message = new Message([error.error.msg], 'danger', 4000);
                        this.ms.addMessages(message);
                        this.authService.removeToken();
                    }
                )
            );
        }
    }
}
