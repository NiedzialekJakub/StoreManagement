using Application.Suppliers;
using Application.Suppliers.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class SuppliersController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<SupplierDto>>> GetSuppliers(CancellationToken ct)
    {
        return await Mediator.Send(new GetSupplierList.Query(), ct);
    }
}