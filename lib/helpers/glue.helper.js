"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueHelper = void 0;
var glue_job_1 = require("../domain/glue-job");
var glue_trigger_1 = require("../domain/glue-trigger");
var global_constant_1 = require("../constants/global.constant");
var support_files_1 = require("../domain/support-files");
var GlueHelper = (function () {
    function GlueHelper(config) {
        this.config = config;
    }
    GlueHelper.prototype.getGlueJobs = function () {
        var jobs = [];
        if (!this.config.jobs) {
            return jobs;
        }
        for (var _i = 0, _a = this.config.jobs; _i < _a.length; _i++) {
            var job = _a[_i];
            var glueJob = new glue_job_1.GlueJob(job);
            if (job.tempDir) {
                this.setTempBucketForJob(glueJob);
            }
            jobs.push(glueJob);
        }
        return jobs;
    };
    GlueHelper.prototype.setTempBucketForJob = function (glueJob) {
        var _a;
        var jobTempDirBucket = (_a = this.config.tempDirBucket) !== null && _a !== void 0 ? _a : {
            Ref: global_constant_1.Global.GLUE_TEMP_BUCKET_REF,
        };
        var jobTempDirS3Prefix = "";
        if (this.config.tempDirS3Prefix) {
            this.config.tempDirS3Prefix = this.config.tempDirS3Prefix.split("/").filter(function (a) { return a != ""; }).join("/");
            jobTempDirS3Prefix += "/".concat(this.config.tempDirS3Prefix);
        }
        jobTempDirS3Prefix += "/".concat(glueJob.name);
        glueJob.DefaultArguments.tempDir = {
            "Fn::Join": ["", ["s3://", jobTempDirBucket, jobTempDirS3Prefix]],
        };
    };
    GlueHelper.prototype.getGlueTriggers = function () {
        var triggers = [];
        if (!this.config.triggers) {
            return triggers;
        }
        for (var _i = 0, _a = this.config.triggers; _i < _a.length; _i++) {
            var trigger = _a[_i];
            var glueTrigger = new glue_trigger_1.GlueTrigger(trigger);
            triggers.push(glueTrigger);
        }
        return triggers;
    };
    GlueHelper.prototype.getSupportFiles = function (job) {
        var supportFiles = [];
        if (!job.SupportFiles) {
            return supportFiles;
        }
        for (var _i = 0, _a = job.SupportFiles; _i < _a.length; _i++) {
            var supportFile = _a[_i];
            var glueSupportFile = new support_files_1.SupportFile(supportFile);
            supportFiles.push(glueSupportFile);
        }
        return supportFiles;
    };
    return GlueHelper;
}());
exports.GlueHelper = GlueHelper;
