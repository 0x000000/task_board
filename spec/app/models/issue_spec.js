describe("Models::Issue", function() {
  var issue;
  var rawData = {"id": 1, "name": "A", "type": "bug", "status": "todo"};

  context("after initialize with raw data", function() {
    it("should initialize all own properties with them", function() {
      issue = new TaskBoard.Models.Issue(rawData);

      expect(issue.id).toEqual(rawData.id);
      expect(issue.name).toEqual(rawData.name);
      expect(issue.type).toEqual(rawData.type);
      expect(issue.status).toEqual(rawData.status);
    });
  });

  describe(".toJSON", function() {

    context("for empty instance", function() {
      it("should return object with undefined values", function() {
        issue = new TaskBoard.Models.Issue({});
        expect(issue.toJSON()).toEqual({id: undefined, name: undefined, status: undefined, type: undefined});
      });
    });

    context("for instance without changes", function() {
      it("should return initial object", function() {
        issue = new TaskBoard.Models.Issue(rawData);
        expect(issue.toJSON()).toEqual(rawData);
      });
    });

    context("for instance with changes", function() {
      it("should return object which reflects data changes", function() {
        issue = new TaskBoard.Models.Issue(rawData);

        issue.name = 'F';
        issue.status = 'in_progress';
        issue.type = 'task';

        expect(issue.toJSON()).toEqual({
          id:     rawData.id,
          name:   'F',
          type:   'task',
          status: 'in_progress'
        });
      });
    });

  });

  describe(".save", function() {
    it("should raise 'issue::save' event", function() {
      var eventName, eventData;

      spyOn(TaskBoard.observers, 'trigger').andCallFake(function(evName, evData) {
        eventName = evName;
        eventData = evData;
      });

      issue = new TaskBoard.Models.Issue(rawData);
      issue.save();

      expect(eventName).toEqual('issue::save');
      expect(eventData.issueJSON).toEqual(issue.toJSON());
    });
  });
});