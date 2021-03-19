import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar.service';
import { ValidatorsService } from '../../../services/validators.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  form: FormGroup = this.fb.group({
    concepto: ['', [Validators.required, Validators.minLength(4)]],
    tipo: ['ingreso', [Validators.required]],
    valor: [, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private transactionsService: TransactionsService,
    private snackbarService: SnackbarService,
    public validatorsService: ValidatorsService
  ) {}

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
