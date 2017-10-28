var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { StringsService } from './strings.service';
var StringsComponent = (function () {
    function StringsComponent(service) {
        this.service = service;
        this.setCurrentStringValue();
    }
    StringsComponent.prototype.reverseString = function (str) {
        var _this = this;
        this.service.reverse(str).subscribe(function (res) { return _this.outstring = res; });
    };
    StringsComponent.prototype.setCurrentStringValue = function () {
        var _this = this;
        this.service.get().subscribe(function (res) { return _this.outstring = res; });
    };
    return StringsComponent;
}());
StringsComponent = __decorate([
    Component({
        selector: 'strings',
        template: require('./str.component.html')
    }),
    __metadata("design:paramtypes", [StringsService])
], StringsComponent);
export { StringsComponent };
//# sourceMappingURL=str.component.js.map