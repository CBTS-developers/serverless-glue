"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.toPascalCase = function (str) {
        return str.toLowerCase().replace(/([-_ ][a-z0-9])|(^[a-zA-Z])/g, function (group) {
            return group
                .toUpperCase()
                .replace("-", "")
                .replace("_", "")
                .replace(" ", "");
        });
    };
    StringUtils.randomString = function (length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
