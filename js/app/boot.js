$(function() {

  if (document.location.hash.match(/#specs\-only/)) {
    $("header, .board").hide();
    window.runSpecs();
  } else {
    window.App = new TaskBoard.App();
    window.App.start();
  }
});