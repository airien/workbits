package com.hanne.restjersey;

import java.util.Iterator;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

@Path("/")
public class JerseyService {

	  // This method is called if TEXT_PLAIN is request
	  @GET
	  @Produces(MediaType.TEXT_PLAIN)
	  @Path("/hello")
	  public String sayPlainTextHello() {
	    return "Hello Jersey";
	  }
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
    @Path("/world")
	public String getMsg() {
		return "Hello World !! - Jersey 2";
	}
	
	@POST
	@Path("/post")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.TEXT_PLAIN)
    public String uriEncodedExample(MultivaluedMap<String,String> multivaluedMap) {
	  Iterator<String> it = multivaluedMap.keySet().iterator();
  	  StringBuilder builder = new StringBuilder("OK - \n");

         while(it.hasNext()){
           String theKey = (String)it.next();
           builder.append(theKey);
           builder.append(" : ");
           builder.append(multivaluedMap.getFirst(theKey));
           builder.append("\n");
       }			
        return builder.toString();//Response.status(200).build();
    }

    @POST
    @Path("postjson")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postjson(PostJson c) {
		c.setValue("OK- " +c.getValue());
		return Response.status(200).entity(c).build();
    }

}