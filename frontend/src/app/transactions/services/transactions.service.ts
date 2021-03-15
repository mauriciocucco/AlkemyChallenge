import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Transactions } from '../interfaces/transactions.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private baseUrl = `${environment.urlServer}/transactions`;
  private token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjozLCJpYXQiOjE2MTU3NjcwMzMsImV4cCI6MTYxNTc5NTgzM30.HMsTAzUR9qRsWVI2q_D_Dj8nIkTzeU5QMwm9slxzxns';
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${this.token}`
  );

  constructor(private http: HttpClient) {}

  getTransactions() {
    return this.http.get<Transactions>(this.baseUrl, { headers: this.headers });
  }
}
