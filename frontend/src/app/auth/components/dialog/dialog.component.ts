import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Login,
    private router: Router
  ) {}

  register() {
    this.dialogRef.close();
    this.router.navigate(['/auth/register']);
  }

  close() {
    this.dialogRef.close();
  }
}
