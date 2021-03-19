import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  transactions: any[] = [];
  balance: number = 0;
  displayedColumns: string[] = ['fecha', 'concepto', 'tipo', 'valor'];
  panelOpenState = false;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.transactionsService.getTransactions().subscribe(
      (resp) => {
        this.transactions = resp.transactions.slice(0, 10);
        this.balance = resp.balance;
      },
      (e) => {
        if (e.error) this.balance = e.error.balance;
      }
    );
  }
}
