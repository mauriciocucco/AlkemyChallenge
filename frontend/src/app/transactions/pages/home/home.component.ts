import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      table {
        width: 100%;
      }
      button {
        margin: 15px 10px 0px 0px;
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
      .button-div {
        display: flex;
        flex-direction: row-reverse;
      }
    `,
  ],
})
export class HomeComponent {
  transactions: any[] = [];
  balance: number = 0;
  displayedColumns: string[] = ['fecha', 'concepto', 'tipo', 'valor'];
  panelOpenState = false;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router
  ) {
    this.transactionsService.getTransactions().subscribe((resp) => {
      this.transactions = resp.transactions.slice(0, 10);
      this.balance = resp.balance;
    });
  }

  goToAddSection() {
    this.router.navigate(['transactions/add']);
  }
}
