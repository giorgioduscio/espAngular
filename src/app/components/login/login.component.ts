import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private http: HttpClient){}

  url =`https:/server.com/api/login`;
  errorMessage: string='errore';
  username: string='';
  password: string='';

  login(){
    // DATI DA INVIARE
    const loginData ={
      username: this.username,
      password: this.password,
    }

    // COLLEGAMENTO
    this.http.post(this.url,loginData).subscribe(
      {
        next: (response: any) => {
          console.log('Login successful:', response);

          // Salva il token nel Local Storage
          localStorage.setItem('token', response.token);

          // Reindirizza all'applicazione dopo il login
          window.location.href = '/home';
        },

        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = error.message;
        }
      }
    )
  } //login
}
