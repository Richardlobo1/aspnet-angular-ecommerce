using asp.netcore_with_angular.Model;
using asp.netcore_with_angular.Reposetory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace asp.netcore_with_angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductReposetory prodt;

        public ProductController(ProductReposetory productReposetory)
        {
            this.prodt = productReposetory;
        }
        [HttpGet]
        public async Task<ActionResult> ProductList()
        {
            var allProduct=await prodt.getALLProduct();
            return Ok(allProduct);
        }
        [HttpPost]
        public  async Task<ActionResult>AddProduct(Model.Product vm)
        {
            await prodt.SaveProduct(vm);
            return Ok(vm);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateProduct(int id, [FromBody] Product vm)
        {
            await prodt.updateProduct(id, vm);
            return Ok(vm);
        }

        [HttpDelete("{id}")]
        public async  Task<ActionResult> deleteProduct(int id)
        {
            await prodt.deleteProdct(id);
            return Ok();
        }


    }
}
