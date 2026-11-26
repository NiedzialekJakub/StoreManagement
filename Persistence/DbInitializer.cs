using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public static class DbInitializer
{
    private static int _eanCounter = 0;

    public static async Task SeedData(AppDbContext context)
    {
        // jeśli w bazie są już produkty nic nie robimy
        if (await context.Products.AnyAsync()) return;

        var suppliers = new List<Supplier>
        {
            new() { Name = "Moda Hurt Sp. z o.o.", Email = "zamowienia@modahurt.pl", Phone = "413001001" },
            new() { Name = "Textil Group", Email = "biuro@textilgroup.pl", Phone = "224005002" }
        };

        var products = new List<Product>
        {
            new()
            {
                Name = "Koszulka basic",
                Description = "Bawełniana koszulka z krótkim rękawem",
                Category = "Koszulki",
                Variants = CreateVariants("KOSZ", 49.99m, ["S", "M", "L", "XL"], ["Biały", "Czarny"])
            },
            new()
            {
                Name = "Jeansy slim",
                Description = "Spodnie jeansowe o kroju slim",
                Category = "Spodnie",
                Variants = CreateVariants("JEAN", 179.00m, ["30", "32", "34", "36"], ["Granatowy", "Czarny"])
            },
            new()
            {
                Name = "Bluza z kapturem",
                Description = "Ocieplana bluza z kieszenią kangurką",
                Category = "Bluzy",
                Variants = CreateVariants("BLUZ", 139.90m, ["S", "M", "L", "XL"], ["Szary", "Czarny"])
            },
            new()
            {
                Name = "Sukienka letnia",
                Description = "Lekka sukienka midi",
                Category = "Sukienki",
                Variants = CreateVariants("SUKN", 219.00m, ["XS", "S", "M", "L"], ["Granatowy", "Biały"])
            }
        };

        context.Suppliers.AddRange(suppliers);
        context.Products.AddRange(products);

        await context.SaveChangesAsync();
    }

    // pomocnicza metoda: tworzy warianty jako kombinację rozmiar x kolor
    private static List<ProductVariant> CreateVariants(
        string skuPrefix, decimal price, string[] sizes, string[] colors)
    {
        var variants = new List<ProductVariant>();
        var index = 0;

        foreach (var color in colors)
        {
            foreach (var size in sizes)
            {
                _eanCounter++;
                variants.Add(new ProductVariant
                {
                    Ean = $"590123400{_eanCounter:D4}",           // 13 cyfr, testowy kod kreskowy
                    Sku = $"{skuPrefix}-{color[..3].ToUpper()}-{size}",
                    Size = size,
                    Color = color,
                    Price = price,
                    Quantity = (index % 5) * 3,                    // 0, 3, 6, 9, 12 sztuk
                    MinQuantity = 5,
                    ShelfLocation = $"{skuPrefix[0]}-{(index / 4) + 1}-{(index % 4) + 1}"
                });
                index++;
            }
        }

        return variants;
    }
}