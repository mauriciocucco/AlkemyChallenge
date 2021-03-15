import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      button {
        font-size: 18px;
        margin-top: 10px;
      }
      mat-card {
        width: 60%;
        margin: 0 auto;
      }
      mat-card-header {
        margin-bottom: 10px;
        justify-content: center;
      }
      mat-form-field,
      button {
        width: 100%;
        margin-bottom: 5px;
      }
      @media screen and (min-width: 1000px) {
        mat-card {
          width: 40%;
        }
      }
    `,
  ],
})
export class AddComponent {
  form = this.fb.group({
    concepto: ['', [Validators.required, Validators.minLength(4)]],
    tipo: ['ingreso', [Validators.required]],
    valor: [, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar
  ) {}

  noValidField(field: string) {
    return this.form.get(field)?.errors && this.form.get(field)?.touched;
  }

  getErrorMessage(field: string) {
    if (this.form.get(field)?.hasError('required')) {
      return `Ingrese un ${field}`;
    } else if (this.form.get(field)?.hasError('required')) {
      return 'Debe tener al menos 4 caracteres';
    }

    return this.form.get(field)?.hasError('min')
      ? 'El valor debe ser mayor a 0'
      : '';
  }

  showSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
  }

  sendForm() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.transactionsService
      .createTransaction(this.form.value)
      .subscribe((resp) => {
        console.log(resp);
        this.showSnackbar('Transacción realizada');
      });

    this.form.reset();
  }
}
