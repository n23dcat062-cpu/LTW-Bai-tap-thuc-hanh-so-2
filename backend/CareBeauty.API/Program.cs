
using CareBeauty.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Dang ky Controllers
builder.Services.AddControllers();

// 2. Dang ky OpenAPI
builder.Services.AddOpenApi();

// 3. Cau hinh SQL Server
builder.Services.AddDbContext<CareBeautyDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// 4. Cau hinh CORS cho ReactJS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();

// 5. OpenAPI trong Development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors("ReactPolicy");
// 6. Kich hoat CORS
app.UseCors("AllowReact");
app.UseCors("ReactPolicy");
// 7. Anh xa Controllers
app.MapControllers();

app.Run();
