export interface Transactions {
  transactions: Transaction[];
  balance: number;
}

export interface Transaction {
  id_transaccion?: string;
  concepto: string;
  fecha?: Date;
  tipo: string;
  valor: number;
}

export interface Edit {
  concepto: string;
  valor: number;
}
