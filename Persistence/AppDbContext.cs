using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<ProductVariant> ProductVariants { get; set; }
    public required DbSet<Supplier> Suppliers { get; set; }
    public required DbSet<GoodsReceipt> GoodsReceipts { get; set; }
    public required DbSet<GoodsReceiptLine> GoodsReceiptLines { get; set; }
    public required DbSet<Sale> Sales { get; set; }
    public required DbSet<SaleLine> SaleLines { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ProductVariant>().HasIndex(v => v.Ean).IsUnique();
        modelBuilder.Entity<ProductVariant>().HasIndex(v => v.Sku).IsUnique();

    // na wszelki wypadek blokujemy usuwanie wariantów, które są powiązane z dokumentami PZ lub sprzedaży
            modelBuilder.Entity<SaleLine>()
        .HasOne(l => l.ProductVariant)
        .WithMany()
        .HasForeignKey(l => l.ProductVariantId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<GoodsReceiptLine>()
        .HasOne(l => l.ProductVariant)
        .WithMany()
        .HasForeignKey(l => l.ProductVariantId)
        .OnDelete(DeleteBehavior.Restrict);
    }
}