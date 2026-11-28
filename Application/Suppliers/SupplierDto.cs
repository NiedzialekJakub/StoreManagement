namespace Application.Suppliers;

public record SupplierDto(Guid Id, string Name, string? Email, string? Phone);