using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Suppliers.Queries;

public class GetSupplierList
{
    public class Query : IRequest<List<SupplierDto>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<SupplierDto>>
    {
        public async Task<List<SupplierDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Suppliers
                .OrderBy(s => s.Name)
                .Select(s => new SupplierDto(s.Id, s.Name, s.Email, s.Phone))
                .ToListAsync(cancellationToken);
        }
    }
}