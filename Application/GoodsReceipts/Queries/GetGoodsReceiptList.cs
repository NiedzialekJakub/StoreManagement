using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.GoodsReceipts.Queries;

public class GetGoodsReceiptList
{
    public class Query : IRequest<List<GoodsReceiptListDto>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<GoodsReceiptListDto>>
    {
        public async Task<List<GoodsReceiptListDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.GoodsReceipts
                .OrderByDescending(r => r.ReceivedAt)
                .Select(r => new GoodsReceiptListDto(
                    r.Id,
                    r.Number,
                    r.ReceivedAt,
                    r.Supplier.Name,
                    r.InvoiceNumber,
                    r.Lines.Count,
                    r.Lines.Sum(l => l.Quantity)))
                .ToListAsync(cancellationToken);
        }
    }
}