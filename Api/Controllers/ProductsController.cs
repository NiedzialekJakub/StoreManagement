using Application.Products;
using Application.Products.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class ProductsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetProducts(CancellationToken ct)
    {
        return await Mediator.Send(new GetProductList.Query(), ct);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetProductDetail(Guid id, CancellationToken ct)
    {
        var product = await Mediator.Send(new GetProductDetails.Query { Id = id }, ct);

        if (product == null) return NotFound();

        return product;
    }
}