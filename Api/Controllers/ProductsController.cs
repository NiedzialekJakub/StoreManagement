using System.Linq.Expressions;
using Application.Products;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Api.Controllers;

public class ProductsController(AppDbContext context) : BaseApiController
{
    // opis, jak zamienić Product z bazy na ProductDto; EF zamieni to na SQL
    private static readonly Expression<Func<Product, ProductDto>> ToDto = p => new ProductDto(
        p.Id,
        p.Name,
        p.Description,
        p.Category,
        p.IsActive,
        p.Variants.Select(v => new ProductVariantDto(
            v.Id, v.Ean, v.Sku, v.Size, v.Color,
            v.Price, v.Quantity, v.MinQuantity, v.ShelfLocation)).ToList());

    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetProducts()
    {
        return await context.Products
            .Where(p => p.IsActive)
            .OrderBy(p => p.Name)
            .Select(ToDto)
            .ToListAsync();
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetProductDetail(Guid id)
    {
        var product = await context.Products
            .Where(p => p.Id == id)
            .Select(ToDto)
            .FirstOrDefaultAsync();

        if (product == null) return NotFound();

        return product;
    }
}