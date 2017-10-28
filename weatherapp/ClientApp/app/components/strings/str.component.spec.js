import { StringsComponent } from './str.component';
import { TestBed, async } from '@angular/core/testing';
var fixture;
describe('Strings component', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({ declarations: [StringsComponent] });
        fixture = TestBed.createComponent(StringsComponent);
        fixture.detectChanges();
    });
    it('should display a title', async(function () {
        var titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Strings');
    }));
    it('should have a string in the textbox, and write out the string reversed when button is clicked', async(function () {
        /*     const countElement = fixture.nativeElement.querySelector('strong');
             expect(countElement.textContent).toEqual('0');
     
             const incrementButton = fixture.nativeElement.querySelector('button');
             incrementButton.click();
             fixture.detectChanges();
             expect(countElement.textContent).toEqual('1');
     */ 
    }));
});
//# sourceMappingURL=str.component.spec.js.map