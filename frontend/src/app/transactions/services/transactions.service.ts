import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Transaction,
  Transactions,
} from '../interfaces/transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private baseUrl = `${environment.urlServer}/transactions`;
  private token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjozLCJpYXQiOjE2MTU4MTIxODEsImV4cCI6MTYxNTg0MDk4MX0.h1zjq4wzaXNrR-23K3uPDwNXnDnHMQ_yGG03acFiZto';
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.token}`
  );

  constructor(private http: HttpClient) {}

  getTransactions() {
    return this.http.get<Transactions>(this.baseUrl, { headers: this.headers });
  }

  createTransaction(formValues: Transaction) {
    return this.http.post(this.baseUrl, formValues, { headers: this.headers });
  }
}
