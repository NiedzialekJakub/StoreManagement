namespace Domain;
public class SaleLine
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SaleId { get; set; }
    public Sale Sale { get; set; } = null!;

    public Guid ProductVariantId { get; set; }
    public ProductVariant ProductVariant { get; set; } = null!;

    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }       // cena z chwili sprzedaży
    public int ReturnedQuantity { get; set; }    // zwroty
}