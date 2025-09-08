using asp.netcore_with_angular.Model;
using Microsoft.EntityFrameworkCore;

namespace asp.netcore_with_angular.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
            
        }
        public DbSet<Product> Products { get; set; }
    }
}
