import { StringsComponent } from './str.component';
import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { StringsService } from './strings.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
var mockResponse = {
    "response": "response"
};
var fixture;
describe('Strings component', function () {
    var mockHttp;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                FormsModule
            ],
            declarations: [StringsComponent],
            providers: [
                { provide: 'BASE_URL', useFactory: getBaseUrl },
                StringsService
            ]
        });
        fixture = TestBed.createComponent(StringsComponent);
        fixture.detectChanges();
    });
    it('should display a title', async(function () {
        var titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Strings');
    }));
    it('should have a string in the textbox, and write out the string reversed when button is clicked', async(function () {
        var input = fixture.debugElement.query(By.css('input'));
        var el = input.nativeElement;
        expect(el.value).toBe('');
        el.value = 'string';
        el.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(el.value).toBe('string');
        var button = fixture.nativeElement.querySelector('button');
        button.click();
        fixture.detectChanges();
        var text = fixture.nativeElement.querySelector('strong');
        //  text.textContent = "voff";
        expect(text.textContent).toBe("");
    }));
});
export function getBaseUrl() {
    return "http://localhost:50319/";
}
//# sourceMappingURL=str.component.spec.js.map