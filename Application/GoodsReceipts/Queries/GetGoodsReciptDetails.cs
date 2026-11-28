using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.GoodsReceipts.Queries;

public class GetGoodsReceiptDetails
{
    public class Query : IRequest<GoodsReceiptDto?>
    {
        public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, GoodsReceiptDto?>
    {
        public async Task<GoodsReceiptDto?> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.GoodsReceipts
                .Where(r => r.Id == request.Id)
                .Select(r => new GoodsReceiptDto(
                    r.Id,
                    r.Number,
                    r.ReceivedAt,
                    r.SupplierId,
                    r.Supplier.Name,
                    r.InvoiceNumber,
                    r.Lines.Select(l => new GoodsReceiptLineDto(
                        l.ProductVariantId,
                        l.ProductVariant.Product.Name,
                        l.ProductVariant.Ean,
                        l.ProductVariant.Sku,
                        l.ProductVariant.Size,
                        l.ProductVariant.Color,
                        l.Quantity)).ToList()))
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}