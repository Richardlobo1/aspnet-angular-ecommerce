using asp.netcore_with_angular.Data;
using asp.netcore_with_angular.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace asp.netcore_with_angular.Reposetory
{
    public class ProductReposetory
    {
        private readonly AppDbContext db;
        public ProductReposetory(AppDbContext dbContext) {
            this.db = dbContext;

        }
        public async Task<List<Product>> getALLProduct()
        {
            return await db.Products.ToListAsync();
        }
        public async Task SaveProduct(Product vm)
        {
             await db.Products.AddAsync(vm);
            await db.SaveChangesAsync();
        }
        public async Task updateProduct(int id,Product obj)
        {
            var product =await db.Products.FindAsync(id);
            if (product==null)
            {
                throw new Exception("Product not found");
                
            }
            else
            {
                product.ProductName = obj.ProductName;  
                product.Price= obj.Price;
                product.Description = obj.Description;
                product.Status = obj.Status;
                product.rating = obj.rating;
                await db.SaveChangesAsync();
            }
        }

        public async Task deleteProdct(int id)
        {
            var product = await db.Products.FindAsync(id);
            if (product == null)
            {
                throw new Exception("Product not found");
            }
            db.Products.Remove(product);
            await  db.SaveChangesAsync();
        }
    }
}
