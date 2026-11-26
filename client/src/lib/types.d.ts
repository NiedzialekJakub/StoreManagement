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