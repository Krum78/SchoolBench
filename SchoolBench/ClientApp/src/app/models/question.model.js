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
var QuestionModel = /** @class */ (function (_super) {
    __extends(QuestionModel, _super);
    function QuestionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QuestionModel;
}(model_base_1.ModelBase));
exports.QuestionModel = QuestionModel;
//# sourceMappingURL=question.model.js.map