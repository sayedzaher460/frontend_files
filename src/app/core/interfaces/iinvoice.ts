
export interface IInvoice {
  id: string
  invoiceNumber: string
  subTotal: number
  taxAmount: number
  discountAmount: number
  totalAmount: number
  name: string
  status: string
  items: Item[]
}

export interface Item {
  id:string
  quantity: number
  unitPrice: number
  discount: number
  salesTotal: number
  calculatedDiscount: number
  netTotal: number
  taxAmount: number
  name: string
}
