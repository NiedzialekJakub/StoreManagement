namespace Domain;

public enum PaymentMethod { Cash, Card }

public class Sale
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Number { get; set; }          // numer paragonu
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public PaymentMethod PaymentMethod { get; set; }
    public decimal Total { get; set; }
    public required string CashierName { get; set; }     // później: relacja do użytkownika

    public List<SaleLine> Lines { get; set; } = [];
}