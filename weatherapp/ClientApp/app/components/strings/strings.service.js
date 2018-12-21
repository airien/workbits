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
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
var StringsService = (function () {
    function StringsService(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
    }
    StringsService.prototype.get = function () {
        return this.http.get(this.baseUrl + 'api/Strings/')
            .map(function (result) { return result.json(); });
    };
    StringsService.prototype.reverse = function (str) {
        return this.http.get(this.baseUrl + 'api/Strings/' + str)
            .map(function (result) { return result.json(); });
    };
    return StringsService;
}());
StringsService = __decorate([
    Injectable(),
    __param(1, Inject('BASE_URL')),
    __metadata("design:paramtypes", [Http, String])
], StringsService);
export { StringsService };
//# sourceMappingURL=strings.service.js.map