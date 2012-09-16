describe("App", function() {
  var app;

  describe(".start", function() {
    it("should raise 'app::start' event", function() {
      app = new TaskBoard.App();

      var eventName;
      spyOn(TaskBoard.observers, 'trigger').andCallFake(function(evName) {
        eventName = evName;
      });

      app.start();

      expect(eventName).toBe("app::start");
    });
  })
});