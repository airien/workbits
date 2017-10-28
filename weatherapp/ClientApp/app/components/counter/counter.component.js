var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
var CounterComponent = (function () {
    function CounterComponent(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.counter = 0;
        this.setCurrentCounterValue();
    }
    CounterComponent.prototype.incrementCounter = function () {
        this.counter += 1;
    };
    CounterComponent.prototype.resetCounter = function () {
        this.counter = 0;
    };
    CounterComponent.prototype.setCurrentCounterValue = function () {
        var _this = this;
        this.http.get(this.baseUrl + 'api/number/CurrentCounter').subscribe(function (result) {
            _this.counter = result.json();
        }, function (error) { return console.log(error); });
    };
    return CounterComponent;
}());
CounterComponent = __decorate([
    Component({
        selector: 'counter',
        template: require('./counter.component.html')
    }),
    __param(1, Inject('BASE_URL')),
    __metadata("design:paramtypes", [Http, String])
], CounterComponent);
export { CounterComponent };
//# sourceMappingURL=counter.component.js.map