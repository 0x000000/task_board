(function(TaskBoard, Storages) {
  "use strict";

  Storages.StorageManager = function() {
    this.dummyStorage = new Storages.DummyStorage();
    this.localStorage = new Storages.LocalStorage();

    TaskBoard.observers.bind("app::start", $.proxy(this.loadIssues, this));
  };

  Storages.StorageManager.prototype.loadIssues = function() {
    var storage;

    if (this.isNeedToLoadSeed()) {
      storage = this.dummyStorage;
    } else {
      storage = this.localStorage;
    }

    storage.loadIssues($.proxy(function(issues) {
      TaskBoard.observers.trigger("issues::loaded", {data: issues});
    }, this));
  };

  Storages.StorageManager.prototype.saveIssues = function(issues) {
    var storage = this.localStorage;

    if (this.isNeedToLoadSeed()) {
      this.disableLoadingSeed();
    }

    return storage.saveIssues(issues);
  };

  Storages.StorageManager.prototype.isNeedToLoadSeed = function() {
    return !$.cookie(TaskBoard.NO_LOAD_SEED_COOKIE_KEY);
  };

  Storages.StorageManager.prototype.disableLoadingSeed = function() {
    $.cookie(TaskBoard.NO_LOAD_SEED_COOKIE_KEY, true, {expires: TaskBoard.EXPIRE_COOKIE_AFTER_DAYS});
  }

})(TaskBoard, TaskBoard.Storages);