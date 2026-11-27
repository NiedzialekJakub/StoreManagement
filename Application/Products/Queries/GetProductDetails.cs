using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Queries;

public class GetProductDetails
{
    public class Query : IRequest<ProductDto?>
    {
        public required Guid Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, ProductDto?>
    {
        public async Task<ProductDto?> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Products
                .Where(p => p.Id == request.Id)
                .Select(ProductMappings.ToDto)
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}