import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);
  http = inject(ApiUserService);
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  error: boolean = false;
  message!: string;

  goSignUp() {
    this.router.navigate(['/createAccount']);
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    } else {
      console.log(this.formGroup.value);
      this.login(
        this.formGroup.get('email')?.value,
        this.formGroup.get('password')?.value
      );
    }
  }

  login(email: string | undefined | null, password: string | undefined | null) {
    this.http.login(email, password).subscribe((data) => {
      if (data.status == 'error') {
        this.error = true;
        this.message = data.message;
      } else {
        this.error = false;
        this.http.setUser();
        this.router.navigate(['/tasks']);
      }
    });
  }
}
