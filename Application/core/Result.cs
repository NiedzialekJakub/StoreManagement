namespace Application.Core;

public class Result<T>
{
    public bool IsSuccess { get; private init; }
    public T? Value { get; private init; }
    public string? Error { get; private init; }
    public int Code { get; private init; }

    public static Result<T> Success(T value) =>
        new() { IsSuccess = true, Value = value };

    public static Result<T> Failure(string error, int code = 400) =>
        new() { IsSuccess = false, Error = error, Code = code };
}