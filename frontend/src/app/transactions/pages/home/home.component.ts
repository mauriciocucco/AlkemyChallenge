import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      table {
        width: 100%;
      }
      mat-card,
      mat-panel-title {
        font-size: 22px;
      }
      mat-expansion-panel {
        margin-top: 20px;
      }
      mat-expansion-panel-header {
        padding: 0px 16px;
      }
      #balance-div {
        display: flex;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  transactions: any[] = [];
  balance: number = 0;
  displayedColumns: string[] = ['fecha', 'concepto', 'tipo', 'valor'];
  panelOpenState = false;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe((resp) => {
      this.transactions = resp.transactions.slice(0, 10);
      this.balance = resp.balance;
    });
  }
}
