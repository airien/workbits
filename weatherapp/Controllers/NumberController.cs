using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace weatherapp.Controllers
{
    [Produces("application/json")]
    [Route("api/number")]
    public class NumberController : Controller
    {
        private int counter = 0;

        [HttpGet("[action]")]
        public int CurrentCounter()
        {
            return counter;
        }
    }
}