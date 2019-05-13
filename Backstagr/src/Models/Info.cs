using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace todo.Models
{
    public class Info
    {
        public Info()
        {
            ItemType = ItemTypes.Info;
            Id = Guid.NewGuid().ToString();
            TimeStamp = DateTime.Now.ToString();
        }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string ItemType { get; set; }


        [JsonProperty(PropertyName = "time")]
        public string TimeStamp { get; set; }
    }
}