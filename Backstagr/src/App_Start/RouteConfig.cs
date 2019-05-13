namespace todo
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");



            routes.MapRoute(
                name: "Artister",
                url: "artister",
                defaults: new { controller = "Item", action = "Index", id = UrlParameter.Optional });


            routes.MapRoute(
                name: "Artist",
                url: "artist/{id}",
                defaults: new { controller = "Item", action = "Index", id = UrlParameter.Optional });

            routes.MapRoute(
                name: "Info",
                url: "info",
                defaults: new { controller = "Item", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Item", action = "Index", id = UrlParameter.Optional });
        }
    }
}
