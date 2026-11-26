namespace Application.Products;

public record ProductVariantDto(
    Guid Id,
    string Ean,
    string Sku,
    string Size,
    string Color,
    decimal Price,
    int Quantity,
    int MinQuantity,
    string? ShelfLocation);

public record ProductDto(
    Guid Id,
    string Name,
    string? Description,
    string Category,
    bool IsActive,
    List<ProductVariantDto> Variants);