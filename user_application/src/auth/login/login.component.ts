import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    FormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get fgEmail(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get fgPassword(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  signUp(): void {
    this.router.navigate(['register']);
  }

  onLogin() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }
    if (this.loginForm.valid) {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        const storedPassword = localStorage.getItem(email);

        if (storedPassword && storedPassword === password) {
          this.openSnackBar('Login Successful!', 5);
          this.router.navigate(['user-dashboard']); // Change '/home' to your desired route
        } else {
          this.openSnackBar('Invalid email or password', 5);
        }
      } else {
        this.openSnackBar('Invalid email or password format', 5);
      }
    }
  }

  private openSnackBar(message: string, durationInSeconds: number): void {
    this._snackBar.open(message, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }
}
