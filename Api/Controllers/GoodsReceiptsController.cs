using Application.GoodsReceipts;
using Application.GoodsReceipts.Commands;
using Application.GoodsReceipts.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class GoodsReceiptsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<GoodsReceiptListDto>>> GetGoodsReceipts(CancellationToken ct)
    {
        return await Mediator.Send(new GetGoodsReceiptList.Query(), ct);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GoodsReceiptDto>> GetGoodsReceipt(Guid id, CancellationToken ct)
    {
        var receipt = await Mediator.Send(new GetGoodsReceiptDetails.Query { Id = id }, ct);

        if (receipt == null) return NotFound();

        return receipt;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateGoodsReceipt(CreateGoodsReceiptDto receipt, CancellationToken ct)
    {
        return HandleResult(await Mediator.Send(new CreateGoodsReceipt.Command { Receipt = receipt }, ct));
    }
}