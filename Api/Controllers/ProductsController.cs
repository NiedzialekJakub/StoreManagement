using Application.Products;
using Application.Products.Queries;
using Microsoft.AspNetCore.Mvc;
using Application.Products.Commands;

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

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateProduct(CreateProductDto product, CancellationToken ct)
    {
        return HandleResult(await Mediator.Send(new CreateProduct.Command { Product = product }, ct));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult> EditProduct(Guid id, EditProductDto product, CancellationToken ct)
    {
        var result = await Mediator.Send(new EditProduct.Command { Id = id, Product = product }, ct);

        if (!result.IsSuccess) return HandleResult(result);

        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteProduct(Guid id, CancellationToken ct)
    {
        var result = await Mediator.Send(new DeleteProduct.Command { Id = id }, ct);

        if (!result.IsSuccess) return HandleResult(result);

        return NoContent();
    }
}