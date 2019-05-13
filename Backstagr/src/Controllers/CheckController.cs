using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace todo.Controllers
{
    public class CheckController : ApiController
    {
        // GET: api/Check
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Check/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Check
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Check/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Check/5
        public void Delete(int id)
        {
        }
    }
}
