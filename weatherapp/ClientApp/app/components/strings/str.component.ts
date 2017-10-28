import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'strings',
    template: require('./str.component.html')
})
export class StringsComponent {
 
    public outstring:String;
   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl : string) {
        this.setCurrentStringValue();
    }
 
    public reverseString(str: String) {
        this.http.get(this.baseUrl + 'api/Strings/' +str).subscribe(result => {
            this.outstring = result.json() as String;
       }, error => console.log(error));
    } 
    
    private setCurrentStringValue() {
        this.http.get(this.baseUrl + 'api/Strings/').subscribe(result => {
            this.outstring = result.json() as String;
       }, error => console.log(error));
    }
}
