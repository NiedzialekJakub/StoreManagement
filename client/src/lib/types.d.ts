type ProductVariant = {
    id: string
    ean: string
    sku: string
    size: string
    color: string
    price: number
    quantity: number
    minQuantity: number
    shelfLocation?: string
}

type Product = {
    id: string
    name: string
    description?: string
    category: string
    isActive: boolean
    variants: ProductVariant[]
}
type CreateProductData = {
    name: string
    description?: string
    category: string
    variants: {
        ean: string
        sku: string
        size: string
        color: string
        price: number
        minQuantity: number
        shelfLocation?: string
    }[]
}

type EditProductData = {
    name: string
    description?: string
    category: string
    isActive: boolean
    variants: {
        id: string
        price: number
        minQuantity: number
        shelfLocation?: string
    }[]
}

type Supplier = {
    id: string
    name: string
    email?: string | null
    phone?: string | null
}

type VariantLookup = {
    id: string
    productId: string
    productName: string
    productIsActive: boolean
    ean: string
    sku: string
    size: string
    color: string
    price: number
    quantity: number
}

type GoodsReceiptListItem = {
    id: string
    number: string
    receivedAt: string
    supplierName: string
    invoiceNumber?: string | null
    linesCount: number
    totalQuantity: number
}

type GoodsReceiptLine = {
    productVariantId: string
    productName: string
    ean: string
    sku: string
    size: string
    color: string
    quantity: number
}

type GoodsReceipt = {
    id: string
    number: string
    receivedAt: string
    supplierId: string
    supplierName: string
    invoiceNumber?: string | null
    lines: GoodsReceiptLine[]
}

type CreateGoodsReceiptData = {
    supplierId: string
    invoiceNumber?: string
    lines: { productVariantId: string; quantity: number }[]
}