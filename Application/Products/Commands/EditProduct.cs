using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Commands;

public class EditProduct
{
    public class Command : IRequest<Result<Unit>>
    {
        public required Guid Id { get; set; }
        public required EditProductDto Product { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var dto = request.Product;

            var product = await context.Products
                .Include(p => p.Variants)
                .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            if (product == null)
                return Result<Unit>.Failure("Nie znaleziono produktu.", 404);

            // najpierw sprawdzamy wszystkie warianty dopiero potem cokolwiek zmieniamy
            foreach (var v in dto.Variants)
            {
                if (!product.Variants.Any(x => x.Id == v.Id))
                    return Result<Unit>.Failure($"Wariant {v.Id} nie należy do tego produktu.");
            }

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Category = dto.Category;
            product.IsActive = dto.IsActive;

            foreach (var v in dto.Variants)
            {
                var variant = product.Variants.First(x => x.Id == v.Id);
                variant.Price = v.Price;
                variant.MinQuantity = v.MinQuantity;
                variant.ShelfLocation = v.ShelfLocation;
            }

            await context.SaveChangesAsync(cancellationToken);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}