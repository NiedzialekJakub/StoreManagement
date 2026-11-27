using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Core;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
    private IMediator? _mediator;

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
        ?? throw new InvalidOperationException("IMediator service is unavailable");

        protected ActionResult HandleResult<T>(Result<T> result)
    {
    if (!result.IsSuccess)
        return StatusCode(result.Code, new ProblemDetails
        {
            Status = result.Code,
            Detail = result.Error
        });

        return Ok(result.Value);
    }
}