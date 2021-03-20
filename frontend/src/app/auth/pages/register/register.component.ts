import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { ValidatorsService } from '../../../services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup = this.fb.group(
    {
      nombre_completo: [
        '',
        [Validators.required, this.validatorsService.noValidFullName],
      ],
      email: [
        '',
        [Validators.required, this.validatorsService.noValidEmail],
        [this.validatorsService],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.validatorsService.passwordPattern),
        ],
      ],
      confirm_password: ['', [Validators.required]],
      saldo: [0, [Validators.required, Validators.min(0)]],
    },
    {
      validators: [
        this.validatorsService.camposIguales('password', 'confirm_password'),
      ],
    }
  );
  hide: boolean = true;
  hideConfirm: boolean = true;

  constructor(
    private fb: FormBuilder,
    public validatorsService: ValidatorsService,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  register() {
    this.authService.register(this.form.value).subscribe((resp) => {
      if (resp.id) {
        console.log(resp);
        this.snackbarService.showSnackbar('Registro exitoso');
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
