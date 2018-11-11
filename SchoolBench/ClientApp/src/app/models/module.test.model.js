"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var model_base_1 = require("./model.base");
var ModuleTestModel = /** @class */ (function (_super) {
    __extends(ModuleTestModel, _super);
    function ModuleTestModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ModuleTestModel;
}(model_base_1.ModelBase));
exports.ModuleTestModel = ModuleTestModel;
//# sourceMappingURL=module.test.model.js.map