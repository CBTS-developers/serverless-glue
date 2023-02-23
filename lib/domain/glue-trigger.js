"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlueTrigger = void 0;
var GlueTrigger = (function () {
    function GlueTrigger(trigger) {
        this.name = trigger.name;
        this.actions = trigger.actions;
        this.Description = trigger.Description;
        this.setSchedule(trigger.schedule);
        this.Tags = trigger.Tags;
        this.StartOnCreation = trigger.StartOnCreation;
    }
    GlueTrigger.prototype.setSchedule = function (cronSchedule) {
        if (cronSchedule) {
            this.type = "SCHEDULED";
            this.schedule = "cron(".concat(cronSchedule, ")");
        }
        else {
            this.type = "ON_DEMAND";
        }
    };
    return GlueTrigger;
}());
exports.GlueTrigger = GlueTrigger;
