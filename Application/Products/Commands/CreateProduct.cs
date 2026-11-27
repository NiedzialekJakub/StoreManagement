using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Commands;

public class CreateProduct
{
    public class Command : IRequest<Result<Guid>>
    {
        public required CreateProductDto Product { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Guid>>
    {
        public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
        {
            var dto = request.Product;

            var eans = dto.Variants.Select(v => v.Ean).ToList();
            var skus = dto.Variants.Select(v => v.Sku).ToList();

            // duplikaty wewnątrz samego żądania
            if (eans.Distinct().Count() != eans.Count || skus.Distinct().Count() != skus.Count)
                return Result<Guid>.Failure("EAN i SKU muszą być unikalne w obrębie produktu.");

            // duplikaty względem towarów już w bazie
            var exists = await context.ProductVariants
                .AnyAsync(v => eans.Contains(v.Ean) || skus.Contains(v.Sku), cancellationToken);

            if (exists)
                return Result<Guid>.Failure("Wariant o takim EAN lub SKU już istnieje.", 409);

            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Category = dto.Category,
                Variants = dto.Variants.Select(v => new ProductVariant
                {
                    Ean = v.Ean,
                    Sku = v.Sku,
                    Size = v.Size,
                    Color = v.Color,
                    Price = v.Price,
                    MinQuantity = v.MinQuantity,
                    ShelfLocation = v.ShelfLocation,
                    Quantity = 0   // stan zmieniają dopiero dokumenty PZ i sprzedaż
                }).ToList()
            };

            context.Products.Add(product);
            await context.SaveChangesAsync(cancellationToken);

            return Result<Guid>.Success(product.Id);
        }
    }
}