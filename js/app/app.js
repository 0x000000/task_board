window.TaskBoard = {
  observers: $({}),
  Views:     {},
  Models:    {},
  Storages:  {},

  storageManager: null,
  boardView:      null,
  boardModel:     null,

  NO_LOAD_SEED_COOKIE_KEY: 'TaskBoard_noNeedToLoadSeed',
  EXPIRE_COOKIE_AFTER_DAYS: 1000
};

(function(TaskBoard) {
  "use strict";

  TaskBoard.App = function() {
    TaskBoard.storageManager = new TaskBoard.Storages.StorageManager();
    TaskBoard.boardModel = new TaskBoard.Models.Board();
    TaskBoard.boardView = new TaskBoard.Views.Board();
  };

  TaskBoard.App.prototype.start = function() {
    TaskBoard.observers.trigger("app::start");
  };

})(TaskBoard);