/* Mad Cats — interactions: menu overlay + accordion */
(function () {
  // ---- Menu overlay ----
  var menu = document.getElementById('menu');
  var openBtn = document.querySelector('.js-menu-open');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (openBtn) openBtn.addEventListener('click', function () { setMenu(true); });
  document.querySelectorAll('.js-menu-close').forEach(function (b) {
    b.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // ---- Accordion ----
  document.querySelectorAll('.accordion__head').forEach(function (head) {
    head.addEventListener('click', function () {
      var item = head.closest('.accordion__item');
      if (!item) return;
      var open = item.classList.toggle('is-open');
      var icon = head.querySelector('.accordion__icon');
      if (icon) icon.textContent = open ? '–' : '+';
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // ---- Carousel (auto-play) ----
  document.querySelectorAll('.carousel').forEach(function (c) {
    var track = c.querySelector('.carousel__track');
    if (!track) return;
    var n = track.children.length;
    if (n < 2) return;
    var dotsWrap = c.querySelector('.carousel__dots');
    var i = 0, timer = null;
    var delay = parseInt(c.getAttribute('data-autoplay'), 10) || 3500;
    var dots = [];
    if (dotsWrap) {
      for (var k = 0; k < n; k++) {
        var d = document.createElement('button');
        d.className = 'carousel__dot';
        d.setAttribute('aria-label', 'Go to slide ' + (k + 1));
        (function (idx) { d.addEventListener('click', function () { go(idx); restart(); }); })(k);
        dotsWrap.appendChild(d);
        dots.push(d);
      }
    }
    function go(idx) {
      i = ((idx % n) + n) % n;
      track.style.transform = 'translateX(-' + (i * 100) + '%)';
      dots.forEach(function (dd, kk) { dd.classList.toggle('is-active', kk === i); });
    }
    function play() { timer = setInterval(function () { go(i + 1); }, delay); }
    function restart() { if (timer) clearInterval(timer); play(); }
    go(0); play();
    // tap / click anywhere on the image advances to the next slide (dots excluded)
    c.addEventListener('click', function (e) {
      if (e.target.closest('.carousel__dots')) return;
      go(i + 1); restart();
    });
    c.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    c.addEventListener('mouseleave', play);
  });
})();
