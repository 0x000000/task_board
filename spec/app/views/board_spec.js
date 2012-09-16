describe("Views::Board", function() {
  var board;

  beforeEach(function() {
    board = new TaskBoard.Views.Board();
  });

  context("after instantiate", function() {
    it("should find all section for task board", function() {
      expect(Object.keys(board.$sections)).toEqual(['todo', 'in_progress', 'done'])

      expect(board.$sections.todo).toBeDefined();
      expect(board.$sections.todo.length).toBe(1);

      expect(board.$sections.in_progress).toBeDefined();
      expect(board.$sections.in_progress.length).toBe(1);

      expect(board.$sections.done).toBeDefined();
      expect(board.$sections.done.length).toBe(1);

      expect(board.issueViews.length).toBe(0);
    });
  });

  describe(".assignIssuesToSections", function() {
    var fakeTodoSection, fakeInProgressSection, fakeDoneSection;
    var issues = [
      {id: 1, type: 'bug', name: 'A', status: 'todo'},
      {id: 2, type: 'task', name: 'B', status: 'in_progress'},
      {id: 3, type: 'task', name: 'C', status: 'in_progress'},
      {id: 3, type: 'task', name: 'D', status: 'done'}
    ];

    beforeEach(function() {
      fakeTodoSection = { append: function() {
      } };
      spyOn(fakeTodoSection, 'append');

      fakeInProgressSection = { append: function() {
      } };
      spyOn(fakeInProgressSection, 'append');

      fakeDoneSection = { append: function() {
      } };
      spyOn(fakeDoneSection, 'append');

      board.$sections = {
        todo:        fakeTodoSection,
        in_progress: fakeInProgressSection,
        done:        fakeDoneSection
      };

    });

    it("should assign each task to proper board section", function() {
      board.assignIssuesToSections({}, issues);

      expect(fakeTodoSection.append.calls.length).toBe(1);
      expect(fakeInProgressSection.append.calls.length).toBe(2);
      expect(fakeTodoSection.append.calls.length).toBe(1);
    });

    it("should create issue views", function() {
      board.assignIssuesToSections({}, issues);

      expect(board.issueViews.length).toBe(4);

      board.issueViews.forEach(function(issueView) {
        expect(issueView instanceof TaskBoard.Views.Issue).toBeTruthy();
      });
    })
  });


});