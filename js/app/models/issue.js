(function(TaskBoard, Models) {
  "use strict";

  Models.Issue = function(data) {
    $.extend(this, data);
  };

  Models.Issue.prototype.toJSON = function() {
    return {
      "id":     this.id,
      "name":   this.name,
      "status": this.status,
      "type":   this.type
    };
  };

  Models.Issue.prototype.save = function() {
    TaskBoard.observers.trigger("issue::save", {issueJSON: this.toJSON()});
  };

})(TaskBoard, TaskBoard.Models);