"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerlessService = void 0;
var fs_1 = require("fs");
var global_constant_1 = require("../constants/global.constant");
var aws_helper_1 = require("../helpers/aws.helper");
var glue_helper_1 = require("../helpers/glue.helper");
var serverless_helper_1 = require("../helpers/serverless.helper");
var cloud_formation_utils_1 = require("../utils/cloud-formation.utils");
var string_utils_1 = require("../utils/string.utils");
var fs_2 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ServerlessService = (function () {
    function ServerlessService(serverless) {
        this.serverless = serverless;
        this.helperless = new serverless_helper_1.ServerlessHelper(this.serverless);
        this.config = this.helperless.getPluginConfig();
        this.awsHelper = new aws_helper_1.AwsHelper(this.serverless);
        this.glueHelper = new glue_helper_1.GlueHelper(this.config);
    }
    ServerlessService.prototype.uploadScripts = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var jobs, _i, jobs_1, job;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.jobs)) {
                            this.helperless.log("Jobs not found.");
                            return [2];
                        }
                        jobs = this.glueHelper.getGlueJobs();
                        _i = 0, jobs_1 = jobs;
                        _b.label = 1;
                    case 1:
                        if (!(_i < jobs_1.length)) return [3, 5];
                        job = jobs_1[_i];
                        return [4, this.uploadJobScripts(job)];
                    case 2:
                        _b.sent();
                        return [4, this.uploadSupportFiles(job)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3, 1];
                    case 5: return [2];
                }
            });
        });
    };
    ServerlessService.prototype.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config) {
                            this.helperless.log("Glue Config Not Found.");
                            return [2];
                        }
                        if (!this.config) return [3, 2];
                        this.helperless.log("Glue config detected.");
                        return [4, this.processGlueJobs()];
                    case 1:
                        _a.sent();
                        this.processTriggers();
                        return [3, 3];
                    case 2:
                        this.helperless.log("Glue config not detected.");
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    ServerlessService.prototype.processGlueJobs = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function () {
            var jobs, params, _i, jobs_2, job, fileName, params, jobCFId, jobCFTemplate, bucketTemplate;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.jobs)) {
                            this.helperless.log("Jobs not found.");
                            return [2];
                        }
                        this.helperless.log("Processing Jobs.");
                        jobs = this.glueHelper.getGlueJobs();
                        if (!((_b = this.config) === null || _b === void 0 ? void 0 : _b.createBucket)) return [3, 3];
                        params = {
                            Bucket: this.config.bucketDeploy,
                        };
                        if ((_c = this.config) === null || _c === void 0 ? void 0 : _c.createBucketConfig) {
                            if ((_d = this.config) === null || _d === void 0 ? void 0 : _d.createBucketConfig.LocationConstraint) {
                                this.config.createBucketConfig.CreateBucketConfiguration = {
                                    LocationConstraint: (_e = this.config) === null || _e === void 0 ? void 0 : _e.createBucketConfig.LocationConstraint,
                                };
                                (_f = this.config) === null || _f === void 0 ? true : delete _f.createBucketConfig.LocationConstraint;
                            }
                            params = __assign(__assign({}, params), this.config.createBucketConfig);
                        }
                        return [4, this.awsHelper.existBucket(params)];
                    case 1:
                        if (!!(_l.sent())) return [3, 3];
                        this.helperless.log("Bucket don't exist, I try to create it.");
                        return [4, this.awsHelper.createBucket(params)];
                    case 2:
                        _l.sent();
                        this.helperless.log("Bucket created.");
                        _l.label = 3;
                    case 3:
                        for (_i = 0, jobs_2 = jobs; _i < jobs_2.length; _i++) {
                            job = jobs_2[_i];
                            fileName = path_1.default.parse(job.scriptPath).base;
                            params = {
                                Bucket: this.config.bucketDeploy,
                                Body: (0, fs_1.readFileSync)(path_1.default.join(job.scriptPath)),
                                Key: "".concat((_h = (_g = this.config) === null || _g === void 0 ? void 0 : _g.s3Prefix) !== null && _h !== void 0 ? _h : "glueJobs/").concat(fileName),
                            };
                            job.setScriptS3Location("s3://".concat(params.Bucket, "/").concat(params.Key));
                            jobCFId = (_j = job.id) !== null && _j !== void 0 ? _j : string_utils_1.StringUtils.toPascalCase(job.name);
                            jobCFTemplate = cloud_formation_utils_1.CloudFormationUtils.glueJobToCF(job);
                            this.helperless.appendToTemplate("resources", jobCFId, jobCFTemplate);
                        }
                        if (jobs.filter(function (e) { return e.tempDir; }).length > 0 &&
                            !((_k = this.config) === null || _k === void 0 ? void 0 : _k.tempDirBucket)) {
                            bucketTemplate = cloud_formation_utils_1.CloudFormationUtils.generateBucketTemplate("GlueTempBucket-".concat(string_utils_1.StringUtils.randomString(8)));
                            this.helperless.appendToTemplate("resources", global_constant_1.Global.GLUE_TEMP_BUCKET_REF, bucketTemplate);
                            this.helperless.appendToTemplate("outputs", "GlueJobTempBucketName", {
                                Value: global_constant_1.Global.GLUE_TEMP_BUCKET_REF,
                            });
                        }
                        return [2];
                }
            });
        });
    };
    ServerlessService.prototype.processTriggers = function () {
        var _this = this;
        var _a;
        if (!((_a = this.config) === null || _a === void 0 ? void 0 : _a.triggers)) {
            this.helperless.log("Triggers not found.");
            return;
        }
        this.helperless.log("Processing Triggers.");
        var triggers = this.glueHelper.getGlueTriggers();
        triggers.forEach(function (trigger) {
            var triggerCFTemplate = cloud_formation_utils_1.CloudFormationUtils.glueTriggerToCF(trigger);
            _this.helperless.appendToTemplate("resources", string_utils_1.StringUtils.toPascalCase(trigger.name), triggerCFTemplate);
        });
    };
    ServerlessService.prototype.uploadJobScripts = function (job) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var fileName, params;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.config)
                            throw new Error("Glue Config not found.");
                        fileName = path_1.default.parse(job.scriptPath).base;
                        params = {
                            Bucket: this.config.bucketDeploy,
                            Body: (0, fs_1.readFileSync)(path_1.default.join(job.scriptPath)),
                            Key: "".concat((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.s3Prefix) !== null && _b !== void 0 ? _b : "glueJobs/").concat(fileName),
                        };
                        return [4, this.awsHelper.uploadFileToS3(params)];
                    case 1:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    ServerlessService.prototype.uploadSupportFiles = function (job) {
        return __awaiter(this, void 0, void 0, function () {
            var supportFiles;
            var _this = this;
            return __generator(this, function (_a) {
                if (!job.SupportFiles) {
                    return [2];
                }
                this.helperless.log("Support Files found.");
                this.helperless.log("Processing Support Files.");
                supportFiles = this.glueHelper.getSupportFiles(job);
                supportFiles.forEach(function (supportFile) { return __awaiter(_this, void 0, void 0, function () {
                    var filename, params;
                    var _this = this;
                    return __generator(this, function (_a) {
                        if (supportFile.local_path == null ||
                            supportFile.s3_bucket == null ||
                            supportFile.s3_prefix == null ||
                            supportFile.execute_upload == null) {
                            throw new Error("Please provide all parameters for SupportFiles.");
                        }
                        if (!supportFile.execute_upload) {
                            this.helperless.log("Skipping upload for: ".concat(supportFile.local_path));
                        }
                        if (supportFile.execute_upload) {
                            if (fs_2.default.lstatSync(supportFile.local_path).isFile()) {
                                this.helperless.log("Uploading file: ".concat(supportFile.local_path));
                                filename = require("path").basename(supportFile.local_path);
                                params = {
                                    Bucket: supportFile.s3_bucket,
                                    Body: (0, fs_1.readFileSync)(supportFile.local_path),
                                    Key: "".concat(supportFile.s3_prefix).concat(filename),
                                };
                                this.awsHelper.uploadFileToS3(params);
                                this.helperless.log("Uploaded '".concat(filename, "' in s3://").concat(params.Bucket, "/").concat(params.Key));
                            }
                            if (fs_2.default.lstatSync(supportFile.local_path).isDirectory()) {
                                this.helperless.log("Uploading all files in: ".concat(supportFile.local_path));
                                fs_2.default.readdirSync(supportFile.local_path).forEach(function (filename) {
                                    var params = {
                                        Bucket: supportFile.s3_bucket,
                                        Body: (0, fs_1.readFileSync)("".concat(supportFile.local_path, "/").concat(filename)),
                                        Key: "".concat(supportFile.s3_prefix).concat(filename),
                                    };
                                    _this.awsHelper.uploadFileToS3(params);
                                    _this.helperless.log("Uploaded '".concat(filename, "' in s3://").concat(params.Bucket, "/").concat(params.Key));
                                });
                            }
                        }
                        return [2];
                    });
                }); });
                return [2];
            });
        });
    };
    return ServerlessService;
}());
exports.ServerlessService = ServerlessService;
