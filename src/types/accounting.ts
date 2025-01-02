export interface AdditionalEntry {
  type: 'debit' | 'credit';
  debit?: string;
  credit?: string;
  amountDebit?: number;
  amountCredit?: number;
}

export type EntryDTO = {
  date: string; // La date de l'entrée, sous forme de chaîne au format 'YYYY-MM-DD'
  amount_debit: number; // Le montant du débit
  amount_credit: number; // Le montant du crédit
  accountCode: string; // Le code du compte (ex : "401", "512")
  description: string; // La description de l'entrée
};