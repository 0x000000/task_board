describe("Model::Board", function() {
  var board;

  beforeEach(function() {
    board = new TaskBoard.Models.Board();
  });

  describe(".loadIssues", function() {
    context("with raw issues data", function() {
      var rawData = [
        {id: 1, type: 'bug', name: 'A', status: 'todo'},
        {id: 2, type: 'task', name: 'B', status: 'in_progress'},
        {id: 3, type: 'task', name: 'C', status: 'in_progress'},
        {id: 3, type: 'task', name: 'D', status: 'done'}
      ];

      it("should instantiate issue models for them", function() {
        expect(board.issueModels.length).toBe(0);
        board.loadIssues({}, rawData);

        expect(board.issueModels.length).toBe(4);
        board.issueModels.forEach(function(issue) {
          expect(issue instanceof TaskBoard.Models.Issue).toBeTruthy();
        })
      });

      it("should raise 'issues::display' event with newly created issue models", function() {
        var eventName, eventData;
        spyOn(TaskBoard.observers, 'trigger').andCallFake(function(evName, evData) {
          eventName = evName;
          eventData = evData;
        });

        board.loadIssues({}, rawData);

        expect(eventName).toBe("issues::display");
        expect(eventData.length).toBe(4);
      })

    })
  });
});