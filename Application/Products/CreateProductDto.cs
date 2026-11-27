using System.ComponentModel.DataAnnotations;

namespace Application.Products;

public class CreateProductDto
{
    [Required, StringLength(200)]
    public required string Name { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }

    [Required, StringLength(100)]
    public required string Category { get; set; }

    [MinLength(1, ErrorMessage = "Produkt musi mieć co najmniej jeden wariant.")]
    public List<CreateVariantDto> Variants { get; set; } = [];
}

public class CreateVariantDto
{
    [Required, StringLength(32)]
    public required string Ean { get; set; }

    [Required, StringLength(64)]
    public required string Sku { get; set; }

    [Required, StringLength(20)]
    public required string Size { get; set; }

    [Required, StringLength(50)]
    public required string Color { get; set; }

    [Range(0.01, 100000)]
    public decimal Price { get; set; }

    [Range(0, 10000)]
    public int MinQuantity { get; set; }

    [StringLength(50)]
    public string? ShelfLocation { get; set; }
}