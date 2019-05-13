using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using todo.Controllers;

namespace todo.Models
{
    public class Artist
    {
        public Artist()
        {
            ItemType = ItemTypes.Artist;
            Items = new List<Item>();
        }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string ItemType { get; set; }

        [JsonProperty(PropertyName = "items")]
        List<Item> Items { get; set; }

    }
}