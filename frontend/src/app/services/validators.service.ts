import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmailValidation } from '../auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService implements AsyncValidator {
  private baseUrl = `${environment.urlServer}/users`;
  passwordPattern: RegExp = /(?=^.{6,36}$)((?=.*\w)(?=.*[\d])(?=.*[\W]))^.*/; //que tenga entre 6 y 36 caracteres con al menos 1 letra (minúscula o mayúscula), 1 número y 1 caracter especial

  constructor(private http: HttpClient) {}

  noValidField(field: string, form: FormGroup) {
    return form.get(field)?.errors && form.get(field)?.touched;
  }

  getErrorMessage(field: string, form: FormGroup) {
    if (field === 'nombre_completo' && form.get(field)?.hasError('required')) {
      return `Ingrese su nombre y apellido`;
    } else if (form.get(field)?.hasError('required')) {
      return `Ingrese un ${field}`;
    } else if (field === 'concepto' && form.get(field)?.hasError('minlength')) {
      return 'Debe tener al menos 4 caracteres';
    } else if (field === 'valor' && form.get(field)?.hasError('min')) {
      return `El valor debe ser mayor a 0`;
    } else if (field === 'saldo' && form.get(field)?.hasError('min')) {
      return `El saldo debe ser 0 o positivo`;
    } else if (form.get(field)?.hasError('invalidEmail')) {
      return `Ingrese un email válido`;
    } else if (field === 'password' && form.get(field)?.hasError('minlength')) {
      return 'El password debe tener al menos 6 caracteres';
    } else if (form.get(field)?.hasError('invalidEmail')) {
      return `Ingrese un email válido`;
    } else if (form.get(field)?.hasError('pattern')) {
      return 'El password debe tener al menos 1 letra, 1 número y 1 caracter especial';
    } else if (form.get(field)?.hasError('invalidFullname')) {
      return 'Ingrese un nombre y apellido válidos';
    } else if (form.get(field)?.hasError('noMatchPasswords')) {
      return 'Los passwords no son idénticos';
    } else if (form.get(field)?.hasError('existingEmail')) {
      return 'Éste email ya ha sido utilizado';
    } else {
      return 'Ha ocurrido un error';
    }
  }

  noValidEmail(control: any): ValidationErrors | null {
    const email = control.value?.trim().toLowerCase();
    const reg = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');

    if (!reg.test(email)) {
      return { invalidEmail: true }; //error que mando
    } else {
      return null;
    }
  }

  noValidFullName(control: any): ValidationErrors | null {
    const fullName = control.value;
    const reg = new RegExp('([a-zA-Z]+) ([a-zA-Z]+)');

    if (!reg.test(fullName)) {
      return { invalidFullname: true }; //error que mando
    } else {
      return null;
    }
  }

  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noMatchPasswords: true });
        return { noMatchPasswords: true };
      } else {
        formGroup.get(campo2)?.setErrors(null);
        return null;
      }
    };
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    return this.http
      .post<EmailValidation>(`${this.baseUrl}/email`, { email })
      .pipe(
        map((resp) => {
          return resp.message === 'Email available'
            ? null
            : { existingEmail: true };
        })
      );
  }
}
