describe("Storages::LocalStorage", function() {
  var localStorage;
  beforeEach(function(){
    localStorage = new TaskBoard.Storages.LocalStorage();
  });

  context("as storage implementation", function() {
    it("should respond to saveIssues", function() {
      expect(localStorage.saveIssues).toBeDefined();
      expect(typeof(localStorage.saveIssues)).toBe("function");
    });

    it("should respond to loadIssues", function() {
      expect(localStorage.loadIssues).toBeDefined();
      expect(typeof(localStorage.loadIssues)).toBe("function");
    });
  });

  describe(".loadIssues", function(){
    it("should return result thru callback call", function(){
      var testResult;
      localStorage.loadIssues(function(issues) {
        testResult = issues;
      });

      expect(testResult instanceof Array).toBeTruthy();
    });
  });

  describe(".saveIssues", function(){
    it("should return result thru callback call", function(){
      var testResult;
      localStorage.saveIssues('test', function(issues) {
        testResult = issues;
      });

      expect(testResult).toBe('test');
    });
  });

});