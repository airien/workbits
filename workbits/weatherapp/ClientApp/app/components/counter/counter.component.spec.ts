/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { CounterComponent } from './counter.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from '../../components/app/app.component';
import { HttpModule } from '@angular/http';
import { NavMenuComponent } from '../../components/navmenu/navmenu.component';
import { Component } from '@angular/core';

let fixture: ComponentFixture<CounterComponent>;

describe('Counter component', () => {
    beforeEach(() => {
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

    it('should display a title', async(() => {
        const titleText = fixture.nativeElement.querySelector('h1').textContent;
        expect(titleText).toEqual('Teller');
    }));

    it('should start with count 0, then increments by 1 when clicked', async(() => {
        const countElement = fixture.nativeElement.querySelector('strong');
        expect(countElement.textContent).toEqual('0');

        const incrementButton = fixture.nativeElement.querySelector('button');
        incrementButton.click();
        fixture.detectChanges();
        expect(countElement.textContent).toEqual('1');
    }));
});

export function getBaseUrl() {
    return "http://localhost:50319/";
}

