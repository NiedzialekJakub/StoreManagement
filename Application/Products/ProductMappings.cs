using System.Linq.Expressions;
using Domain;

namespace Application.Products;

public static class ProductMappings
{
    public static readonly Expression<Func<Product, ProductDto>> ToDto = p => new ProductDto(
        p.Id,
        p.Name,
        p.Description,
        p.Category,
        p.IsActive,
        p.Variants.Select(v => new ProductVariantDto(
            v.Id, v.Ean, v.Sku, v.Size, v.Color,
            v.Price, v.Quantity, v.MinQuantity, v.ShelfLocation)).ToList());
}