using System.ComponentModel.DataAnnotations;

namespace Application.GoodsReceipts;

// wejście
public class CreateGoodsReceiptDto
{
    [Required]
    public Guid SupplierId { get; set; }

    [StringLength(100)]
    public string? InvoiceNumber { get; set; }

    [MinLength(1, ErrorMessage = "Dokument musi mieć co najmniej jedną pozycję.")]
    public List<CreateGoodsReceiptLineDto> Lines { get; set; } = [];
}

public class CreateGoodsReceiptLineDto
{
    [Required]
    public Guid ProductVariantId { get; set; }

    [Range(1, 100000, ErrorMessage = "Ilość musi być większa od zera.")]
    public int Quantity { get; set; }
}

// wyjście: lista
public record GoodsReceiptListDto(
    Guid Id,
    string Number,
    DateTime ReceivedAt,
    string SupplierName,
    string? InvoiceNumber,
    int LinesCount,
    int TotalQuantity);

// wyjście: szczegóły
public record GoodsReceiptLineDto(
    Guid ProductVariantId,
    string ProductName,
    string Ean,
    string Sku,
    string Size,
    string Color,
    int Quantity);

public record GoodsReceiptDto(
    Guid Id,
    string Number,
    DateTime ReceivedAt,
    Guid SupplierId,
    string SupplierName,
    string? InvoiceNumber,
    List<GoodsReceiptLineDto> Lines);