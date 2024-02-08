using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.Repositories
{
    public class ItemContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "ItemDB");
        }

        public DbSet<Item> Items { get; set; }

    }
}