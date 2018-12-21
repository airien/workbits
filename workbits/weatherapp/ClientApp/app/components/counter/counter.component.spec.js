import { CounterComponent } from './counter.component';
import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
var fixture;
describe('Counter component', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            declarations: [CounterComponent],
            providers: [
                { provide: 'BASE_URL', useFactory: getBaseUrl }
            ]
        });
        fixture = TestBed.createComponent(CounterComponent);
        fixture.detectChanges();
    });
    it('should display a title', async(function () {
        var titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Teller');
    }));
    it('should start with count 0, then increments by 1 when clicked', async(function () {
        var countElement = fixture.nativeElement.querySelector('strong');
        expect(countElement.textContent).toEqual('0');
        var incrementButton = fixture.nativeElement.querySelector('button');
        incrementButton.click();
        fixture.detectChanges();
        expect(countElement.textContent).toEqual('1');
    }));
});
export function getBaseUrl() {
    return "http://localhost:50319/";
}
//# sourceMappingURL=counter.component.spec.js.map