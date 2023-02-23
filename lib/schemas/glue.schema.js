"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueSchema = void 0;
exports.GlueSchema = {
    type: "object",
    properties: {
        bucketDeploy: { type: "string" },
        createBucket: { type: "boolean" },
        s3Prefix: { type: "string" },
        tempDirBucket: { type: "string" },
        tempDirS3Prefix: { type: "string" },
    },
    required: ["bucketDeploy"],
};
