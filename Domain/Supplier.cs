namespace Domain;

public class Supplier
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
}