using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace weatherapp.Controllers
{
    [Produces("application/json")]
    [Route("api/Strings")]
    public class StringsController : Controller
    {
        // GET: api/Strings
        [HttpGet]
        public string Get()
        {
            return "<Her kommer resultatet>";
        }

        // GET: api/Strings/5
        [HttpGet("{str}", Name = "Get")]
        public string Get(string str)
        {
            return str;
        }
    }
}
