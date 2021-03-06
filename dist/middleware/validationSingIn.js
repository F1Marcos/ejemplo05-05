"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSingIn = void 0;
const express_validator_1 = require("express-validator");
function validationSingIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.render("partials/signinForm", {
                error: errors.array()
            });
        }
        next();
    });
}
exports.validationSingIn = validationSingIn;
//# sourceMappingURL=validationSingIn.js.map