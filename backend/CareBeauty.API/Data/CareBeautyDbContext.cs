
using Microsoft.EntityFrameworkCore;
using CareBeauty.API.Models;

namespace CareBeauty.API.Data
{
    public class CareBeautyDbContext : DbContext
    {
        public CareBeautyDbContext(
            DbContextOptions<CareBeautyDbContext> options
        ) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
            = null!;
    }
}
