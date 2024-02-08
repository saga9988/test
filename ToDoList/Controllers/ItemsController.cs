using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Models;
using ToDoList.Repositories;

namespace ToDoList.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        readonly ItemContext _itemContext;

        public ItemsController(ItemContext itemContext)
        {
            _itemContext = itemContext;
        }

        // GET: api/items
        [HttpGet]
        public async Task<ActionResult<List<Item>>> Get()
        {
            return await _itemContext.Items.ToListAsync();
        }

        // GET api/items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> Get(int id)
        {
            var item = await _itemContext.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST api/items
        [HttpPost]
        public async Task<ActionResult<List<Item>>> Post(Item item)
        {
            _itemContext.Add(item);
            await _itemContext.SaveChangesAsync();

            return await _itemContext.Items.ToListAsync();
        }

        // PUT api/items/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _itemContext.Entry(item).State = EntityState.Modified;

            try
            {
                await _itemContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(_itemContext.Items?.Any(e => e.Id == id)).GetValueOrDefault())
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/items/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var deletedItem = await _itemContext.Items.FindAsync(id);

            if (deletedItem == null)
            {
                return NotFound();
            }

            _itemContext.Remove(deletedItem);

            await _itemContext.SaveChangesAsync();

            return NoContent();
        }
    }
}

