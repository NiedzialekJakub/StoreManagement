namespace Domain;

public class Product
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required string Category { get; set; }   // np. "Koszulki", "Spodnie"
    public bool IsActive { get; set; } = true;

    public List<ProductVariant> Variants { get; set; } = [];
}