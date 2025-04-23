import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from '../services/api-user.service';
@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  error: boolean = false;
  message!: string;
  http = inject(ApiUserService);
  private router = inject(Router);
  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confPassword: new FormControl('', [Validators.required]),
  });

  goLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    } else {
      this.createAccount(
        this.formGroup.get('username')?.value,
        this.formGroup.get('email')?.value,
        this.formGroup.get('password')?.value
      );
    }
  }

  createAccount(
    username: string | undefined | null,
    email: string | undefined | null,
    password: string | undefined | null
  ) {
    this.http.createAccount(username, email, password).subscribe((data) => {
      data.status;
      if (data.status == 'success') {
        this.http.login(email, password).subscribe((data) => {
          this.http.setUser();
          this.router.navigate(['/tasks']);
        });
      } else {
        this.error = true;
        this.message = 'nooooo';
      }
    });
  }
}
