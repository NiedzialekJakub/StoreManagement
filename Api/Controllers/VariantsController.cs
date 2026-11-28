using Application.Variants;
using Application.Variants.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class VariantsController : BaseApiController
{
    [HttpGet("by-ean/{ean}")]
    public async Task<ActionResult<VariantLookupDto>> GetByEan(string ean, CancellationToken ct)
    {
        var variant = await Mediator.Send(new GetVariantByEan.Query { Ean = ean }, ct);

        if (variant == null) return NotFound();

        return variant;
    }
}