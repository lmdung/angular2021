import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onChangeMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm: NgForm){
    if (!authForm.valid) {
      return
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
     authObs = this.authService.login(email, password);
    } else {
     authObs = this.authService.signUp(email, password)
    }
    authObs.subscribe(
      res => {
        this.isLoading = false;
        console.log(res)
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
        console.log(errorMessage)
      }
    )
    this.router.navigate(['/recipes']);
    authForm.reset()
  }
}
