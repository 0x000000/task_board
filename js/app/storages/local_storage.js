(function(S) {
  "use strict";

  S.LocalStorage = function() {

  };

  S.LocalStorage.prototype.loadIssues = function(callback) {
    callback([]);
  };

  S.LocalStorage.prototype.saveIssues = function(issues, callback) {
    callback(issues);
  };

})(TaskBoard.Storages);