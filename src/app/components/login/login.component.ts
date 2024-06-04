import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.loginForm =new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
    throw new Error('Method not implemented.');
  }

  url =`http://localhost:3000/api/login`;
  loginForm: any;
  errorMessage: string='errore';
  username: string='admin';
  password: string='password123';

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
  }
}
