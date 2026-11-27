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
    }
}