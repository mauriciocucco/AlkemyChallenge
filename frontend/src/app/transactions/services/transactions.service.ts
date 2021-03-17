import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Edit,
  Transaction,
  Transactions,
} from '../interfaces/transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private baseUrl = `${environment.urlServer}/transactions`;
  private token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjozLCJpYXQiOjE2MTU5MzI0MTcsImV4cCI6MTYxNTk2MTIxN30.V5PbyYqr8KzvhjRdO4gOEnur257fg3xfYB3FOJENwbQ';
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

  editTransaction(formValues: Edit, id: string) {
    return this.http.put(`${this.baseUrl}/${id}`, formValues, {
      headers: this.headers,
    });
  }

  deleteTransaction(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
