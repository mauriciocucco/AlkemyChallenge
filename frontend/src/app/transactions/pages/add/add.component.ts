import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
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
    private snackbarService: SnackbarService
  ) {}

  noValidField(field: string) {
    return this.form.get(field)?.errors && this.form.get(field)?.touched;
  }

  getErrorMessage(field: string) {
    if (this.form.get(field)?.hasError('required')) {
      return `Ingrese un ${field}`;
    } else if (this.form.get(field)?.hasError('minlength')) {
      return 'Debe tener al menos 4 caracteres';
    }

    return this.form.get(field)?.hasError('min')
      ? 'El valor debe ser mayor a 0'
      : '';
  }

  sendForm() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.transactionsService
      .createTransaction(this.form.value)
      .subscribe((resp) => {
        this.snackbarService.showSnackbar('Transacción realizada');
      });

    this.form.reset();
  }
}
