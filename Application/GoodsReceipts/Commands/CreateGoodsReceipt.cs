using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.GoodsReceipts.Commands;

public class CreateGoodsReceipt
{
    public class Command : IRequest<Result<Guid>>
    {
        public required CreateGoodsReceiptDto Receipt { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Guid>>
    {
        public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
        {
            var dto = request.Receipt;

            // dostawca musi istnieć
            var supplierExists = await context.Suppliers
                .AnyAsync(s => s.Id == dto.SupplierId, cancellationToken);
            if (!supplierExists)
                return Result<Guid>.Failure("Nie znaleziono dostawcy.");

            // ten sam wariant podany dwa razy to jedna pozycja z sumą ilości
            var lines = dto.Lines
                .GroupBy(l => l.ProductVariantId)
                .Select(g => new { VariantId = g.Key, Quantity = g.Sum(x => x.Quantity) })
                .ToList();

            var variantIds = lines.Select(l => l.VariantId).ToList();

            // ładujemy warianty razem z produktem (potrzebna aktywność i nazwa)
            var variants = await context.ProductVariants
                .Include(v => v.Product)
                .Where(v => variantIds.Contains(v.Id))
                .ToListAsync(cancellationToken);

            if (variants.Count != variantIds.Count)
                return Result<Guid>.Failure("Co najmniej jeden wariant z dokumentu nie istnieje.");

            var inactive = variants.FirstOrDefault(v => !v.Product.IsActive);
            if (inactive != null)
                return Result<Guid>.Failure(
                    $"Produkt „{inactive.Product.Name}” jest nieaktywny i nie można go przyjąć na magazyn.");

            //  numer dokumentu: PZ/rok/0001, 0002...
            var prefix = $"PZ/{DateTime.UtcNow.Year}/";
            var count = await context.GoodsReceipts
                .CountAsync(r => r.Number.StartsWith(prefix), cancellationToken);
            var number = $"{prefix}{count + 1:D4}";

            //  dokument + zwiększenie stanu
            var receipt = new GoodsReceipt
            {
                Number = number,
                SupplierId = dto.SupplierId,
                InvoiceNumber = dto.InvoiceNumber,
                Lines = lines.Select(l => new GoodsReceiptLine
                {
                    ProductVariantId = l.VariantId,
                    Quantity = l.Quantity
                }).ToList()
            };

            foreach (var line in lines)
                variants.First(v => v.Id == line.VariantId).Quantity += line.Quantity;

            context.GoodsReceipts.Add(receipt);

            try
            {
                await context.SaveChangesAsync(cancellationToken);
            }
            catch (DbUpdateException)
            {
                // dwa dokumenty w tej samej chwili dostały ten sam numer
                return Result<Guid>.Failure("Nie udało się zapisać dokumentu. Spróbuj ponownie.", 409);
            }

            return Result<Guid>.Success(receipt.Id);
        }
    }
}