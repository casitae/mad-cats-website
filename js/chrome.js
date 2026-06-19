/* Mad Cats — shared chrome: injects menu overlay, header, footer into every .page.
   Single source of truth so header/footer/menu stay identical site-wide. */
(function () {
  var page = document.querySelector('.page');
  if (!page) return;

  var MARK = 'assets/logos/mad-cats-logo-mark.png';
  var WORD = 'assets/logos/mad-cats-wordmark.png';
  var useMark = document.body.dataset.logo === 'mark';

  var nav = [
    ['Dinner', 'dinner.html'], ['The Bar', 'bar.html'], ['Music', 'music.html'],
    ['Special Occasions', 'special-occasions.html'], ['Collabs', 'collabs.html'],
    ['Merch', 'merch.html'], ['FAQ', 'faq.html'], ['Contact', 'contact.html']
  ];
  var here = (location.pathname.split('/').pop() || 'index.html');

  var menuLinks = nav.map(function (n) {
    var active = n[1] === here ? ' is-active' : '';
    return '<a class="menu__link' + active + '" href="' + n[1] + '">' + n[0] + '</a>';
  }).join('');

  var menu =
    '<nav class="menu" id="menu" aria-hidden="true">' +
      '<div class="menu__bar">' +
        '<img class="menu__mark" src="' + MARK + '" alt="Mad Cats">' +
        '<button class="menu__close js-menu-close" aria-label="Close menu">+</button>' +
      '</div>' +
      '<hr class="hairline">' +
      '<div class="menu__nav">' + menuLinks + '</div>' +
      '<div class="menu__cta"><a class="btn btn--inverse js-reserve" href="#reserve">RESERVE</a></div>' +
    '</nav>';

  var headerLogo = useMark
    ? '<img class="site-header__logo--mark" src="' + MARK + '" alt="Mad Cats home">'
    : '<img class="site-header__logo--word" src="' + WORD + '" alt="Mad Cats home">';

  var header =
    '<header class="site-header container">' +
      '<div class="site-header__bar">' +
        '<a class="site-header__logo" href="index.html">' + headerLogo + '</a>' +
        '<button class="site-header__toggle js-menu-open" aria-label="Open menu" aria-controls="menu" aria-expanded="false">+</button>' +
      '</div>' +
      '<hr class="hairline">' +
    '</header>';

  var footer =
    '<footer class="footer container">' +
      '<hr class="separator">' +
      '<div class="footer__cols">' +
        '<div class="footer__col">' +
          '<h2 class="footer__heading">OPENING TIMES</h2>' +
          '<p class="footer__times">Tue: 5pm - 12am\nWed: 5pm - 12am\nThu: 5pm - 1.30am\nFri: 5pm - 2.30am\nSat: 5pm - 2.30am\nSun: 3pm - 8pm</p>' +
        '</div>' +
        '<div class="footer__col">' +
          '<h2 class="footer__heading">LOCATION</h2>' +
          '<div class="footer__links">' +
            '<a href="https://maps.app.goo.gl/FmNF7aVLhm5zkxfh6" target="_blank" rel="noopener">107 Redchurch Street<br>— E2 7DL, Shoreditch</a>' +
            '<a href="tel:+442046192652">+44 2046192652</a>' +
            '<a href="mailto:info@madcats.uk">info@madcats.uk</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  page.insertAdjacentHTML('afterbegin', header);
  page.insertAdjacentHTML('afterbegin', menu);
  page.insertAdjacentHTML('beforeend', footer);
})();
