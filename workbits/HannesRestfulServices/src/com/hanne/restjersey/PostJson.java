package com.hanne.restjersey;
import java.lang.String;

public class PostJson
{
    private String value;

    public String getValue()
    {
        return value;
    }
    public void setValue(String value)
    {
        this.value = value;
    }

    @Override
	public String toString() {
		return "{ \"value\": \""+value+"\"}";
	}
}