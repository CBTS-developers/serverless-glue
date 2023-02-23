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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudFormationUtils = void 0;
var CloudFormationUtils = (function () {
    function CloudFormationUtils() {
    }
    CloudFormationUtils.glueJobToCF = function (glueJob) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        var cfn = {
            Type: "AWS::Glue::Job",
            Properties: {
                Command: {
                    Name: glueJob.commandName,
                    PythonVersion: glueJob.pythonVersion,
                    ScriptLocation: glueJob.scriptS3Location,
                },
                GlueVersion: glueJob.glueVersionJob,
                Name: glueJob.name,
                Description: glueJob.Description,
                Role: glueJob.role,
                MaxCapacity: glueJob.MaxCapacity,
                ExecutionProperty: {
                    MaxConcurrentRuns: (_a = glueJob.MaxConcurrentRuns) !== null && _a !== void 0 ? _a : 1,
                },
                DefaultArguments: {
                    "--additional-python-modules": (_b = glueJob.DefaultArguments) === null || _b === void 0 ? void 0 : _b.additionalPythonModules,
                    "--job-language": (_c = glueJob.DefaultArguments) === null || _c === void 0 ? void 0 : _c.jobLanguage,
                    "--TempDir": (_e = (_d = glueJob.DefaultArguments) === null || _d === void 0 ? void 0 : _d.tempDir) !== null && _e !== void 0 ? _e : "",
                    "--class": (_f = glueJob.DefaultArguments) === null || _f === void 0 ? void 0 : _f.class,
                    "--scriptLocation": (_g = glueJob.DefaultArguments) === null || _g === void 0 ? void 0 : _g.scriptLocation,
                    "--extra-py-files": (_h = glueJob.DefaultArguments) === null || _h === void 0 ? void 0 : _h.extraPyFiles,
                    "--extra-jars": (_j = glueJob.DefaultArguments) === null || _j === void 0 ? void 0 : _j.extraJars,
                    "--user-jars-first": (_k = glueJob.DefaultArguments) === null || _k === void 0 ? void 0 : _k.userJarsFirst,
                    "--use-postgres-driver": (_l = glueJob.DefaultArguments) === null || _l === void 0 ? void 0 : _l.usePostgresDriver,
                    "--extra-files": (_m = glueJob.DefaultArguments) === null || _m === void 0 ? void 0 : _m.extraFiles,
                    "--disable-proxy": (_o = glueJob.DefaultArguments) === null || _o === void 0 ? void 0 : _o.disableProxy,
                    "--job-bookmark-option": (_p = glueJob.DefaultArguments) === null || _p === void 0 ? void 0 : _p.jobBookmarkOption,
                    "--enable-auto-scaling": (_q = glueJob.DefaultArguments) === null || _q === void 0 ? void 0 : _q.enableAutoScaling,
                    "--enable-s3-parquet-optimized-committer": (_r = glueJob.DefaultArguments) === null || _r === void 0 ? void 0 : _r.enableS3ParquetOptimizedCommitter,
                    "--enable-rename-algorithm-v2": (_s = glueJob.DefaultArguments) === null || _s === void 0 ? void 0 : _s.enableRenameAlgorithmV2,
                    "--enable-glue-datacatalog": (_t = glueJob.DefaultArguments) === null || _t === void 0 ? void 0 : _t.enableGlueDatacatalog,
                    "--enable-metrics": (_u = glueJob.DefaultArguments) === null || _u === void 0 ? void 0 : _u.enableMetrics,
                    "--enable-continuous-cloudwatch-log": (_v = glueJob.DefaultArguments) === null || _v === void 0 ? void 0 : _v.enableContinuousCloudwatchLog,
                    "--enable-continuous-log-filter": (_w = glueJob.DefaultArguments) === null || _w === void 0 ? void 0 : _w.enableContinuousLogFilter,
                    "--continuous-log-logGroup": (_x = glueJob.DefaultArguments) === null || _x === void 0 ? void 0 : _x.continuousLogLogGroup,
                    "--continuous-log-logStreamPrefix": (_y = glueJob.DefaultArguments) === null || _y === void 0 ? void 0 : _y.continuousLogLogStreamPrefix,
                    "--continuous-log-conversionPattern": (_z = glueJob.DefaultArguments) === null || _z === void 0 ? void 0 : _z.continuousLogConversionPattern,
                    "--enable-spark-ui": (_0 = glueJob.DefaultArguments) === null || _0 === void 0 ? void 0 : _0.enableSparkUi,
                    "--spark-event-logs-path": (_1 = glueJob.DefaultArguments) === null || _1 === void 0 ? void 0 : _1.sparkEventLogsPath,
                    "library-set": (_2 = glueJob.DefaultArguments) === null || _2 === void 0 ? void 0 : _2.librarySet,
                },
                Tags: glueJob.Tags,
                Timeout: glueJob.Timeout,
                MaxRetries: glueJob.MaxRetries,
                SecurityConfiguration: glueJob.SecurityConfiguration
            },
        };
        if (glueJob.DefaultArguments.customArguments) {
            var customArguments = CloudFormationUtils.parseCustomArguments(glueJob.DefaultArguments.customArguments);
            cfn.Properties.DefaultArguments = __assign(__assign({}, cfn.Properties.DefaultArguments), customArguments);
        }
        if (glueJob.Connections) {
            cfn.Properties.Connections = {
                Connections: glueJob.Connections,
            };
        }
        if (["glueetl", "gluestreaming"].indexOf(glueJob.commandName || '') !== -1) {
            if (glueJob.WorkerType) {
                cfn.Properties.WorkerType = glueJob.WorkerType;
            }
            if (glueJob.NumberOfWorkers) {
                cfn.Properties.NumberOfWorkers = glueJob.NumberOfWorkers;
            }
        }
        return cfn;
    };
    CloudFormationUtils.parseCustomArguments = function (customArguments) {
        var customArgumentsJson = {};
        var keyArguments = Object.keys(customArguments);
        for (var _i = 0, keyArguments_1 = keyArguments; _i < keyArguments_1.length; _i++) {
            var argumentName = keyArguments_1[_i];
            var _argumentName = argumentName.startsWith("--")
                ? argumentName
                : "--".concat(argumentName);
            customArgumentsJson[_argumentName] = customArguments[argumentName];
        }
        return customArgumentsJson;
    };
    CloudFormationUtils.generateBucketTemplate = function (bucketName) {
        return {
            Type: "AWS::S3::Bucket",
            Properties: {
                BucketName: bucketName,
            },
        };
    };
    CloudFormationUtils.glueTriggerToCF = function (trigger) {
        var actions = trigger.actions.map(function (action) {
            return {
                JobName: action.name,
                Arguments: action.args,
                Timeout: action.timeout,
                SecurityConfiguration: action.SecurityConfiguration,
            };
        });
        return {
            Type: "AWS::Glue::Trigger",
            Properties: __assign({ Type: trigger.type, Actions: actions, Name: trigger.name, Description: trigger.Description, Tags: trigger.Tags, StartOnCreation: trigger.StartOnCreation }, (trigger.schedule && { Schedule: trigger.schedule })),
        };
    };
    return CloudFormationUtils;
}());
exports.CloudFormationUtils = CloudFormationUtils;
