import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'counter',
    template: require('./counter.component.html')
})
export class CounterComponent {
    public counter: number = 0
   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl : string) {
        this.setCurrentCounterValue();
    }

    public incrementCounter() {
        this.counter += 1;
    } 

    public resetCounter() {
        this.counter = 0;
    }
    
    private setCurrentCounterValue() {
        this.http.get(this.baseUrl + 'api/number/CurrentCounter').subscribe(result => {
            this.counter =  result.json() as number;
       }, error => console.log(error));
    }
}
