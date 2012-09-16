(function(TaskBoard, Models) {
  "use strict";

  Models.Board = function() {
    this.issueModels = [];
  };

  Models.Board.prototype.loadIssues = function(e, issuesData) {
    this.issueModels = $.map(issuesData, function(issueData) {
      return new Models.Issue(issueData);
    });

    TaskBoard.observers.trigger("issues::display", this.issueModels);
  };

})(TaskBoard, TaskBoard.Models);