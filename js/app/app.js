window.TaskBoard = {
  observers: $({}),
  Views:     {},
  Models:    {},
  Storages:  {},

  storageManager: null
};

(function(TaskBoard) {
  "use strict";

  TaskBoard.App = function() {
    TaskBoard.storageManager = new TaskBoard.Storages.StorageManager();
  };

  TaskBoard.App.prototype.start = function() {
    TaskBoard.observers.trigger("app::start");
  };

})(TaskBoard);