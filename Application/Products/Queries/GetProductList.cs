using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Queries;

public class GetProductList
{
    public class Query : IRequest<List<ProductDto>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<ProductDto>>
    {
        public async Task<List<ProductDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Products
                .Where(p => p.IsActive)
                .OrderBy(p => p.Name)
                .Select(ProductMappings.ToDto)
                .ToListAsync(cancellationToken);
        }
    }
}