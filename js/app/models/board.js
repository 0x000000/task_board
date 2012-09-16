(function(TaskBoard, Models) {
  "use strict";

  Models.Board = function() {
    this.issueModels = [];

    TaskBoard.observers.bind("issues::loaded", $.proxy(this.loadIssues, this));
  };

  Models.Board.prototype.loadIssues = function(e, issues) {
    this.issueModels = $.map(issues.data, function(issueData) {
      return new Models.Issue(issueData);
    });

    TaskBoard.observers.trigger("issues::display", {issueModels: this.issueModels});
  };

})(TaskBoard, TaskBoard.Models);