export type CreateInvoiceRequest = {
    customer_id: string,
    amount: string,
    invoice_items: Array<{name: string, qty: number, price: number,total: number}>
  }