$(function() {

  if (document.location.hash.match(/#specs\-only/)) {
    window.runSpecs();
  } else {
    window.App = new TaskBoard.App();
    window.App.start();
  }
});