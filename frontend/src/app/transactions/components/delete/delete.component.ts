import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../../interfaces/transactions.interface';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction[]
  ) {}

  transactionsMap = {
    '=1': 'Se eliminará la siguiente transacción',
    other: `Se eliminarán las siguientes transacciones`,
  };

  delete() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
