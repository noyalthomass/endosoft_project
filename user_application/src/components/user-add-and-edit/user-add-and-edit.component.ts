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

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-add-and-edit',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    NgIf,
    MatSnackBarModule,
  ],
  templateUrl: './user-add-and-edit.component.html',
  styleUrls: ['./user-add-and-edit.component.scss'],
})
export class UserAddAndEditComponent implements OnInit {
  userForm!: FormGroup;
  userId!: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      number: ['', [Validators.required, this.phoneNumberValidator]],
    });

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        this.loadUserData(this.userId);
      }
    });
  }

  get fgName(): AbstractControl | null {
    return this.userForm.get('name');
  }

  get fgDob(): AbstractControl | null {
    return this.userForm.get('dob');
  }

  get fgAddress(): AbstractControl | null {
    return this.userForm.get('address');
  }

  get fgNumber(): AbstractControl | null {
    return this.userForm.get('number');
  }

  cancel() {
    this.router.navigate(['user-dashboard']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  onSubmit(): void {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
    }
    if (this.userForm.valid) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userData = this.userForm.value;

      if (this.userId) {
        const index = users.findIndex((user: any) => user.id === this.userId);
        if (index !== -1) {
          users[index] = userData;
        }
      } else {
        userData.id = this.generateUniqueId();
        users.push(userData);
      }

      localStorage.setItem('users', JSON.stringify(users));
      this.openSnackBar('User Data updated Successfully', 5);

      this.router.navigate(['user-dashboard']);
    }
  }

  private loadUserData(id: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.id === id);
    if (user) {
      this.userForm.patchValue(user);
    }
  }

  private generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  private phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const valid = /^[0-9]{10}$/.test(control.value);
    return valid ? null : { invalidPhoneNumber: true };
  }

  private openSnackBar(message: string, durationInSeconds: number): void {
    this._snackBar.open(message, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }
}
