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
var StringsComponent = (function () {
    function StringsComponent(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.setCurrentStringValue();
    }
    StringsComponent.prototype.reverseString = function (str) {
        var _this = this;
        this.http.get(this.baseUrl + 'api/Strings/' + str).subscribe(function (result) {
            _this.outstring = result.json();
        }, function (error) { return console.log(error); });
    };
    StringsComponent.prototype.setCurrentStringValue = function () {
        var _this = this;
        this.http.get(this.baseUrl + 'api/Strings/').subscribe(function (result) {
            _this.outstring = result.json();
        }, function (error) { return console.log(error); });
    };
    return StringsComponent;
}());
StringsComponent = __decorate([
    Component({
        selector: 'strings',
        template: require('./str.component.html')
    }),
    __param(1, Inject('BASE_URL')),
    __metadata("design:paramtypes", [Http, String])
], StringsComponent);
export { StringsComponent };
//# sourceMappingURL=str.component.js.map