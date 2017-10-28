/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { StringsComponent } from './str.component';
import { TestBed, async, ComponentFixture, fakeAsync, tick, inject } from '@angular/core/testing';
import { AppComponent } from '../../components/app/app.component'; 
import { NavMenuComponent } from '../../components/navmenu/navmenu.component'; 
import { Component } from '@angular/core';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { StringsService } from './strings.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
const mockResponse = {
    "response":"response"
};
let fixture: ComponentFixture<StringsComponent>;

describe('Strings component', () => {
    let mockHttp: Http;
    beforeEach(() => {
        
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                FormsModule
            ],
            declarations: [StringsComponent],
            providers: [
                { provide: 'BASE_URL', useFactory: getBaseUrl }
                , StringsService
            ]
        });
        fixture = TestBed.createComponent(StringsComponent);
        fixture.detectChanges();
    });

    it('should display a title', async(() => {
        const titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Strings');
    }));

    it('should have a string in the textbox, and write out the string reversed when button is clicked', async(() => {
    
            let input = fixture.debugElement.query(By.css('input'));
            let el = input.nativeElement;

            expect(el.value).toBe('');

            el.value = 'string';
            el.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(el.value).toBe('string');
            const button = fixture.nativeElement.querySelector('button');
            button.click();
            fixture.detectChanges();

            const text = fixture.nativeElement.querySelector('strong');
          //  text.textContent = "voff";
            expect(text.textContent).toBe("");
            
    }));
});
export function getBaseUrl() {
    return "http://localhost:50319/";
}