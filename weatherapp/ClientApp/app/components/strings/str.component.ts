import { Component, Inject } from '@angular/core';
import { StringsService } from './strings.service';

@Component({
    selector: 'strings',
    template: require('./str.component.html')
})
export class StringsComponent {

    public outstring: String;
    constructor(private service: StringsService) {
        this.setCurrentStringValue();
    }

    public reverseString(str: string) {
        this.service.reverse(str).subscribe(res => this.outstring = res  );
    }

    private setCurrentStringValue() {
        this.service.get().subscribe(res =>this.outstring = res );
    }
}
