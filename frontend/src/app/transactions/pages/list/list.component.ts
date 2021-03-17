import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { DeleteComponent } from '../../components/delete/delete.component';
import { EditComponent } from '../../components/edit/edit.component';
import {
  Transaction,
  Transactions,
} from '../../interfaces/transactions.interface';
import { SnackbarService } from '../../services/snackbar.service';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['select', 'fecha', 'concepto', 'tipo', 'valor'];
  dataSource!: MatTableDataSource<Transaction>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Transaction>(true, []);
  deleteMessage: string = '';

  constructor(
    private transactionsService: TransactionsService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.transactionsService.getTransactions().subscribe((resp) => {
      this.transactions = resp.transactions;
      this.dataSource = new MatTableDataSource(this.transactions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //FILTER FUNCIONALITY
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //CHECKBOX FUNCIONALITY
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  delete() {
    if (this.selection.selected.length === 0) {
      return;
    }

    this.selection.selected.length === 1
      ? (this.deleteMessage = 'Transacción eliminada')
      : (this.deleteMessage = 'Transacciones eliminadas');

    const idString = this.selection.selected
      .map((row) => row.id_transaccion!)
      .join();

    const dialog = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: this.selection.selected,
    });

    dialog.afterClosed().subscribe((result) => {
      if (!result) {
        this.selection.clear();
        return;
      }
      this.transactionsService
        .deleteTransaction(idString)
        .pipe(switchMap((resp) => this.transactionsService.getTransactions()))
        .subscribe((resp) => {
          this.updateTransactions(resp, this.deleteMessage);
        });
    });
  }

  edit() {
    if (
      this.selection.selected.length === 0 ||
      this.selection.selected.length > 1
    ) {
      return;
    }

    const dialog = this.dialog.open(EditComponent, {
      width: '400px',
      data: {
        concepto: this.selection.selected[0].concepto,
        valor: this.selection.selected[0].valor,
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (!result) {
        this.selection.clear();
        return;
      }
      this.transactionsService
        .editTransaction(result, this.selection.selected[0].id_transaccion!)
        .pipe(switchMap(() => this.transactionsService.getTransactions()))
        .subscribe((resp) => {
          this.updateTransactions(resp, 'Transferencia editada');
        });
    });
  }

  updateTransactions(obj: Transactions, message: string) {
    this.dataSource.data = obj.transactions;
    this.selection.clear();
    this.snackbarService.showSnackbar(message);
  }

  selectRow(row: Transaction) {
    this.selection.toggle(row);
  }
}
