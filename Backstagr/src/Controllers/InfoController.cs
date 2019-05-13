using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using todo.Models;

namespace todo.Controllers
{
    public class InfoController : ApiController
    {
        // GET: api/info
        public async Task<IEnumerable<Info>> GetAsync()
        {

            var items = await DocumentDBRepository<Info>.GetItemsAsync(d => d.ItemType== ItemTypes.Info);
            return items;
        }

        // GET: api/info/5
        public async Task<IHttpActionResult> Get(string id)
        {
            if (id == null)
            {
                return BadRequest("Må angi id");
            }

            var item = await DocumentDBRepository<Info>.GetItemAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST: api/Artist
        public async Task<IHttpActionResult> Post([FromBody]Info value)
        {

            if (ModelState.IsValid)
            {
                await DocumentDBRepository<Info>.CreateItemAsync(value);

                var items = await DocumentDBRepository<Info>.GetItemsAsync(d => d.ItemType == ItemTypes.Info);
                return Ok(items);
            }
            return BadRequest(ModelState);

        }

        // PUT: api/Artist/5
        public async Task<IHttpActionResult> PutAsync(int id, [FromBody]Info value)
        {
            if (ModelState.IsValid)
            {
                await DocumentDBRepository<Info>.UpdateItemAsync(value.Id, value);
                return Ok(value);
            }

            return BadRequest(ModelState);
        }

        // DELETE: api/Artist/5
        public async Task<IHttpActionResult> Delete(string id)
        {
            if (id == null)
            {
                return BadRequest("Må angi id");
            }

            await DocumentDBRepository<Info>.DeleteItemAsync(id);


            var items = await DocumentDBRepository<Info>.GetItemsAsync(d => d.ItemType == ItemTypes.Info);
            return Ok(items);

        }
    }
}
