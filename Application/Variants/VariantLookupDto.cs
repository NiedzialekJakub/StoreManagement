namespace Application.Variants;

public record VariantLookupDto(
    Guid Id,
    Guid ProductId,
    string ProductName,
    bool ProductIsActive,
    string Ean,
    string Sku,
    string Size,
    string Color,
    decimal Price,
    int Quantity);