describe("Storages::DummyStorage", function() {
  var dummyStorage;
  beforeEach(function(){
    dummyStorage = new TaskBoard.Storages.DummyStorage();
  });

  context("as storage implementation", function() {
    it("should respond to saveIssues", function() {
      expect(dummyStorage.saveIssues).toBeDefined();
      expect(typeof(dummyStorage.saveIssues)).toBe("function");
    });

    it("should respond to loadIssues", function() {
      expect(dummyStorage.loadIssues).toBeDefined();
      expect(typeof(dummyStorage.loadIssues)).toBe("function");
    });
  });

  describe(".loadIssues", function(){
    it("should return result thru callback call", function(){
      var testResult;
      dummyStorage.loadIssues(function(issues) {
        testResult = issues;
      });

      expect(testResult instanceof Array).toBeTruthy();
    });
  });

  describe(".saveIssues", function(){
    it("should return result thru callback call", function(){
      var testResult;
      dummyStorage.saveIssues('test', function(issues) {
        testResult = issues;
      });

      expect(testResult).toBe('test');
    });
  });

});