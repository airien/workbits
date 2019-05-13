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
    public class ArtistController : ApiController
    {
        // GET: api/Artist
        public async Task<IEnumerable<Artist>> GetAsync()
        {
            var items = await DocumentDBRepository<Artist>.GetItemsAsync(d => d.ItemType == null || d.ItemType == ItemTypes.Artist);
            return items;
        }

        // GET: api/Artist/5
        public async Task<IHttpActionResult> Get(string id)
        {
            if (id == null)
            {
                return BadRequest("Må angi id");
            }

            var item = await DocumentDBRepository<Artist>.GetItemAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST: api/Artist
        public async Task<IHttpActionResult> Post([FromBody]Artist value)
        {

            if (ModelState.IsValid)
            {
                await DocumentDBRepository<Artist>.CreateItemAsync(value);
                var items = await DocumentDBRepository<Artist>.GetItemsAsync(d => d.ItemType == null || d.ItemType == ItemTypes.Artist);
                return Ok(items);
            }

            return BadRequest(ModelState);
        }

        // PUT: api/Artist/5
        public async Task<IHttpActionResult> PutAsync(string id, [FromBody]Artist value)
        {
            if (ModelState.IsValid)
            {
                await DocumentDBRepository<Artist>.UpdateItemAsync(value.Id, value);
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

            await DocumentDBRepository<Artist>.DeleteItemAsync(id);

            var items = await DocumentDBRepository<Artist>.GetItemsAsync(d => d.ItemType == null || d.ItemType == ItemTypes.Artist);
            return Ok(items);

        }
    }
}
