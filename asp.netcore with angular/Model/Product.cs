using System.ComponentModel.DataAnnotations;

namespace asp.netcore_with_angular.Model
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public required string ProductName{ get; set; }
        public required int Price { get; set; }
        public required string Description { get; set; }
        public int? rating {  get; set; }
        public bool  Status { get; set; }   


    }
}
