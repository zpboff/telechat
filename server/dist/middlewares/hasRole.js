"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = function (requiredRole) {
    return function (req, res, next) {
        var _a;
        next();
        if (((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.email) === requiredRole) {
            return next();
        }
        else {
            return res.sendStatus(401);
        }
    };
};
