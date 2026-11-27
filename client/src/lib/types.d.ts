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