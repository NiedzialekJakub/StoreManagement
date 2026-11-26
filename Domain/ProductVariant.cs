namespace Domain;

public class ProductVariant
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;

    public required string Ean { get; set; }        // kod kreskowy z metki
    public required string Sku { get; set; }
    public required string Size { get; set; }       // S, M, L, 42...
    public required string Color { get; set; }
    public decimal Price { get; set; }

    // magazyn i poziom normatywny w jednym miejscu
    public int Quantity { get; set; }
    public int MinQuantity { get; set; }
    public string? ShelfLocation { get; set; }      // np. "A-3-2"
}