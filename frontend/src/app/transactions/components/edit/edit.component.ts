import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidatorsService } from '../../../services/validators.service';
import { Edit } from '../../interfaces/transactions.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  form: FormGroup = this.fb.group({
    concepto: [
      this.data.concepto,
      [Validators.required, Validators.minLength(4)],
    ],
    valor: [this.data.valor, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Edit,
    private fb: FormBuilder,
    public validatorsService: ValidatorsService
  ) {}

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
