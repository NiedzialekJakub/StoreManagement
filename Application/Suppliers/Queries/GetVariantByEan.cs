using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Variants.Queries;

public class GetVariantByEan
{
    public class Query : IRequest<VariantLookupDto?>
    {
        public required string Ean { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, VariantLookupDto?>
    {
        public async Task<VariantLookupDto?> Handle(Query request, CancellationToken cancellationToken)
        {
            var ean = request.Ean.Trim();

            return await context.ProductVariants
                .Where(v => v.Ean == ean)
                .Select(v => new VariantLookupDto(
                    v.Id, v.ProductId, v.Product.Name, v.Product.IsActive,
                    v.Ean, v.Sku, v.Size, v.Color, v.Price, v.Quantity))
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}