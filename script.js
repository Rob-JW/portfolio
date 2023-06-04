(function() {
  const menuToggle = document.querySelector('#menuToggle');
  const menu = document.querySelector('#menu');
  menuToggle.addEventListener('click', function() {
      if (menu.style.transform === "translate(-100%, 0)") {
          menu.style.transform = "translate(0%, 0)";
      } else {
          menu.style.transform = "translate(-100%, 0)";
      }
  });
})();
