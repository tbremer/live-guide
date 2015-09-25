(function() {
  window.addEventListener("message", function(event) {
    var element = document.getElementById(event.data.id);
    if (!element) { return false; }

    element.style.width = event.data.width + 'px';
    element.style.height = event.data.height + 'px';
    console.log('MESSAGE RECIEVED');
    console.log(event.data);
  }, false)
})();
