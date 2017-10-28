/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { StringsComponent } from './str.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

let fixture: ComponentFixture<StringsComponent>;

describe('Strings component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [StringsComponent] });
        fixture = TestBed.createComponent(StringsComponent);
        fixture.detectChanges();
    });

    it('should display a title', async(() => {
        const titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Strings');
    }));

    it('should have a string in the textbox, and write out the string reversed when button is clicked', async(() => {
   /*     const countElement = fixture.nativeElement.querySelector('strong');
        expect(countElement.textContent).toEqual('0');

        const incrementButton = fixture.nativeElement.querySelector('button');
        incrementButton.click();
        fixture.detectChanges();
        expect(countElement.textContent).toEqual('1');
*/    }));
});
