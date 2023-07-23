import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    const signUpUsers = this.signUpUsersSubject.getValue(); // Obtenemos el valor actual de signUpUsers
    localStorage.setItem('signUpUsers', JSON.stringify(signUpUsers));
    console.log(signUpUsers);
  }
  login(email: string, password: string): boolean {
    const user = this.signUpUsersSubject.getValue().find(user => user.email === email && user.password === password);

    if (user) {
      // Si se encuentra un usuario con las credenciales proporcionadas, se establece la propiedad isLogged en true
      this.isLoggedInSubject.next(true);
      return true;
    } else {
      // Si no se encuentra un usuario con las credenciales proporcionadas, se devuelve false
      return false;
    }
  }


}
