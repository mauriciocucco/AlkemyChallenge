import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Edit } from '../../interfaces/transactions.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  form = this.fb.group({
    concepto: [
      this.data.concepto,
      [Validators.required, Validators.minLength(4)],
    ],
    valor: [this.data.valor, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Edit,
    private fb: FormBuilder
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

  editTransaction() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close(false);
  }

  disableEdit() {
    return (
      this.form.invalid ||
      (this.data.concepto === this.form.value.concepto &&
        this.data.valor === this.form.value.valor)
    );
  }
}
