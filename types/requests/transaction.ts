export type CreateTransactionRequest = {
        type_cash: string,
        type_in_out: string,
        account_id: string,
        date: string,
        description: string,
        file: string,
        amount: string,
        category_id: string,
        tags: string,
        payer_id: string,
        method_id: string,
        ref: string,
  }