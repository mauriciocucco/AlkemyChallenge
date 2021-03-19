import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/services/validators.service';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, this.validatorsService.noValidEmail]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.validatorsService.passwordPattern),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    public validatorsService: ValidatorsService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  login() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.authService.login(this.form.value).subscribe(
      (resp) => this.router.navigate(['/transactions/home']),

      (e) => {
        if (e.error.error === 'User not found') {
          const dialog = this.dialog.open(DialogComponent, {
            width: '300px',
          });
        }
      }
    );
  }
}
