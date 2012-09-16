(function(jasmine) {

  window.context = window.describe;

  function setupSpecEnv() {
    TaskBoard.NO_LOAD_SEED_COOKIE_KEY = 'test_' + TaskBoard.NO_LOAD_SEED_COOKIE_KEY;
  }

  window.runSpecs = function() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    setupSpecEnv();
    jasmineEnv.execute();
  };

})(window.jasmine);