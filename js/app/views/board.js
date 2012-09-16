(function($, TaskBoard, Views) {
  "use strict";

  Views.Board = function() {

    var $board = $(".board");

    this.$sections = {
      todo:        $board.find(".todo"),
      in_progress: $board.find(".in_progress"),
      done:        $board.find(".done")
    };

    this.issueViews = [];

    TaskBoard.observers.bind("issues::display", $.proxy(this.assignIssuesToSections, this));
  };

  Views.Board.prototype.assignIssuesToSections = function(e, issues) {

    var self = this;
    this.issueViews = $.map(issues.issueModels, function(issueModel) {
      var issueView = new Views.Issue(issueModel);

      self.$sections[issueModel.status].append(issueView.html);

      return issueView;
    });
  };

})(jQuery, TaskBoard, TaskBoard.Views);