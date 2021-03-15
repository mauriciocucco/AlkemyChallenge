import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '../../interfaces/transactions.interface';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
    `
      table {
        width: 100%;
      }
      .mat-form-field {
        font-size: 14px;
        margin-bottom: 10px;
        width: 100%;
      }
      td,
      th {
        width: 25%;
      }
      mat-card-header {
        justify-content: center;
      }
    `,
  ],
})
export class ListComponent {
  transacciones: Transaction[] = [];
  displayedColumns: string[] = ['fecha', 'concepto', 'tipo', 'valor'];
  dataSource!: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private transactionsService: TransactionsService) {
    this.transactionsService.getTransactions().subscribe((resp) => {
      this.transacciones = resp.transactions;
      this.dataSource = new MatTableDataSource(this.transacciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
