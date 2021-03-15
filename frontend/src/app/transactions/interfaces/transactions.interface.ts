export interface Transactions {
  transactions: Transaction[];
  balance: number;
}

export interface Transaction {
  id_transaccion?: number;
  concepto: string;
  fecha?: Date;
  tipo: string;
  valor: number;
}
