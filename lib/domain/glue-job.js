"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueJob = void 0;
var GlueJob = (function () {
    function GlueJob(job) {
        var _a;
        this.DefaultArguments = (_a = job.DefaultArguments) !== null && _a !== void 0 ? _a : {};
        this.name = job.name;
        this.id = job.id;
        this.scriptPath = job.scriptPath;
        this.role = job.role;
        this.glueVersion = job.glueVersion;
        this.Description = job.Description;
        this.type = job.type;
        this.MaxCapacity = job.MaxCapacity;
        this.MaxConcurrentRuns = job.MaxConcurrentRuns;
        this.MaxRetries = job.MaxRetries;
        this.WorkerType = job.WorkerType;
        this.NumberOfWorkers = job.NumberOfWorkers;
        this.Connections = job.Connections;
        this.defineCommandName(job.type);
        this.setGlueVersion(this.glueVersion);
        this.Tags = job.Tags;
        this.Timeout = job.Timeout;
        this.MaxRetries = job.MaxRetries;
        this.SupportFiles = job.SupportFiles;
        this.SecurityConfiguration = job.SecurityConfiguration;
    }
    GlueJob.prototype.setScriptS3Location = function (s3url) {
        this.scriptS3Location = s3url;
    };
    GlueJob.prototype.defineCommandName = function (type) {
        switch (type) {
            case "spark":
                this.commandName = "glueetl";
                break;
            case "spark_streaming":
                this.commandName = "gluestreaming";
                break;
            case "pythonshell":
                this.commandName = "pythonshell";
                break;
        }
    };
    GlueJob.prototype.setGlueVersion = function (glueVersion) {
        var _a;
        var parts = glueVersion.split("-");
        var pythonVersion = parts[0].replace(/[A-Za-z]*/, '');
        var language = (_a = parts[0].match(/[A-Za-z]*/)) === null || _a === void 0 ? void 0 : _a.toString();
        this.pythonVersion = pythonVersion;
        this.glueVersionJob = parts[1];
        this.DefaultArguments.jobLanguage = language;
    };
    return GlueJob;
}());
exports.GlueJob = GlueJob;
