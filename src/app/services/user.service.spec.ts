import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public signUpUsersSubject = new BehaviorSubject<any[]>([]);
  public signUpUsers$ = this.signUpUsersSubject.asObservable();
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    const signUpUsers = JSON.parse(localStorage.getItem('signUpUsers') || '[]');
    this.signUpUsersSubject.next(signUpUsers);
  }

  saveUsers() {
    const signUpUsers = this.signUpUsersSubject.getValue();
    localStorage.setItem('signUpUsers', JSON.stringify(signUpUsers));
    console.log(signUpUsers);
  }

  login(email: string, password: string): boolean {
    let userFound = false;
    this.signUpUsers$.pipe(take(1)).subscribe(signUpUsers => {
      const user = signUpUsers.find(user => user.email === email && user.password === password);
      if (user) {
        userFound = true;
        this.isLoggedInSubject.next(true);
      }
    });
    return userFound;
  }
}
