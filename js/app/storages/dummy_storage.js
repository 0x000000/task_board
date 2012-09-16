(function(S) {
  "use strict";

  S.DummyStorage = function() {

  };

  S.DummyStorage.prototype.loadIssues = function(callback) {
    callback([
      {
        id:    10,
        name:  "Et reiciendis doloremque eius molestiae odit laudantium qui molestias",
        type:  'task',
        status: 'todo'
      },
      {
        id:    12,
        name:  "Eum et et animi omnis consectetur dolorem architecto facilis",
        type:  'task',
        status: 'todo'
      },
      {
        id:    13,
        name:  "Sunt animi modi fuga eaque iusto",
        type:  'bug',
        status: 'in_progress'
      },
      {
        id:    20,
        name:  "Ab quos cumque non similique",
        type:  'task',
        status: 'done'
      },
      {
        id:    21,
        name:  "Vel optio doloremque officia ducimus",
        type:  'bug',
        status: 'done'
      }
    ]);
  };

  S.DummyStorage.prototype.saveIssues = function(issues, callback) {
    callback(issues);
  };

})(TaskBoard.Storages);