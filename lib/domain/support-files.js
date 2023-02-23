"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportFile = void 0;
var SupportFile = (function () {
    function SupportFile(SupportFiles) {
        this.local_path = SupportFiles.local_path;
        this.s3_bucket = SupportFiles.s3_bucket;
        this.s3_prefix = SupportFiles.s3_prefix;
        this.execute_upload = SupportFiles.execute_upload;
    }
    return SupportFile;
}());
exports.SupportFile = SupportFile;
