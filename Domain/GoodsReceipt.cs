//(dokument PZ)
namespace Domain;

public class GoodsReceipt
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Number { get; set; }          // np. "PZ/2026/0001"
    public DateTime ReceivedAt { get; set; } = DateTime.UtcNow;
    public string? InvoiceNumber { get; set; }

    public Guid SupplierId { get; set; }
    public Supplier Supplier { get; set; } = null!;

    public List<GoodsReceiptLine> Lines { get; set; } = [];
}