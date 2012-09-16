(function($, Views) {
  "use strict";

  Views.Issue = function(model) {
    this.model = model;
    this.state = null;
    this.html = null;

    this.initState();
  };

  Views.Issue.prototype.template = function() {
    return '<div class="issue ' + this.model.type + '">' +
      '<span class="uid">' + this.model.id + '</span>' +
      '<a class="delete" href="#">delete</a>' +
      '<p class="name">' + this.model.name + '</p>' +
      '</div>'
  };

  Views.Issue.prototype.initState = function() {
    this.state = 'info';

    this.html = $(this.template());
  };

  Views.Issue.prototype.infoState = function() {
    if (this.state == 'info') { return; }
  };

  Views.Issue.prototype.editState = function() {
    if (this.state == 'edit') { return; }
  };
})(jQuery, TaskBoard.Views);