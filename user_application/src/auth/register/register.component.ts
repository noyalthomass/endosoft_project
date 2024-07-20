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
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgIf,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.initRegisterForm();
  }

  ngOnInit(): void {}

  initRegisterForm(): void {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  login(): void {
    this.router.navigate(['']);
  }
  get fgEmail(): AbstractControl | null {
    return this.registrationForm.get('email');
  }

  get fgPassword(): AbstractControl | null {
    return this.registrationForm.get('password');
  }

  get fgConfirmPassword(): AbstractControl | null {
    return this.registrationForm.get('confirmPassword');
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword) {
      return password.value === confirmPassword.value
        ? null
        : { mismatch: true };
    }
    return { mismatch: true };
  }

  onSignup() {
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
    }
    if (this.registrationForm.valid) {
      const { email, password } = this.registrationForm.value;
      localStorage.setItem(email, password);
      this.openSnackBar('Account created Successfully..Please Login Now!', 5);

      this.router.navigate(['']);
    } else {
      this.openSnackBar('Invalid email or password format', 5);
    }
  }

  private openSnackBar(message: string, durationInSeconds: number): void {
    this._snackBar.open(message, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }
}
