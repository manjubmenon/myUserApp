import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: Router) { }
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.route.navigate(['user-list'])
    }
  }

}
