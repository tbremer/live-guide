(function() {
  window.$ = window.$ || function(query) { return [].concat.apply([], document.querySelectorAll(query)); }

  window.addEventListener('message', function(event) {
    var element = document.getElementById(event.data.id);
    if (!element) { return false; }

    element.style.height = event.data.height + 'px';

    if (event.data.height === 0) {
      element.className += ' hidden';
      element.nextElementSibling.className += ' hidden';
      element.nextElementSibling.nextElementSibling.className = element.nextElementSibling.nextElementSibling.className.replace('hidden', '').trim();
    }
  }, false)

  document.addEventListener('DOMContentLoaded', function() {
    $('.js-showsource').forEach(function(node) {
      /**
       * add click listener if iframe is shown
       */
      node.addEventListener('click', function(event) {
        var code = node.nextElementSibling,
          addClass = 'hidden';

        if(new RegExp(addClass).test(code.className)) {
          code.className = code.className.replace(addClass, '').trim();
          node.innerHTML = node.innerHTML.replace('show', 'hide');
        } else {
          code.className += ' ' + addClass;
          node.innerHTML = node.innerHTML.replace('hide', 'show');
        }
      }, false);
    });
  });
})();
