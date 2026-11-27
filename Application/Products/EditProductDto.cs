using System.ComponentModel.DataAnnotations;

namespace Application.Products;

public class EditProductDto
{
    [Required, StringLength(200)]
    public required string Name { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }

    [Required, StringLength(100)]
    public required string Category { get; set; }

    public bool IsActive { get; set; } = true;

    // tylko te warianty, które chcemy zmienić (reszta zostaje bez zmian)
    public List<EditVariantDto> Variants { get; set; } = [];
}

public class EditVariantDto
{
    public required Guid Id { get; set; }

    [Range(0.01, 100000)]
    public decimal Price { get; set; }

    [Range(0, 10000)]
    public int MinQuantity { get; set; }

    [StringLength(50)]
    public string? ShelfLocation { get; set; }
}