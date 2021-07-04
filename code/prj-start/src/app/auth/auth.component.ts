import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
    private authService: AuthService
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
    if (this.isLoginMode) {

    } else {
      this.isLoading = true;
      this.authService.signUp(email, password).subscribe(
        res => {
          this.isLoading = false;
          console.log(res)
        },
        error => {
          this.isLoading = false;
          this.error = error.message;
          console.log(error)
        })
    }
    authForm.reset()
  }
}
