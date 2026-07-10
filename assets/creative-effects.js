(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = window.matchMedia && window.matchMedia("(max-width: 767px)").matches;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function () {
    document.documentElement.classList.add("ak-enhanced");

    var hero = document.querySelector("#root section:first-of-type");
    var heroTextColumn = hero && hero.querySelector(".lg\\:col-span-9");
    var heroSideColumn = hero && hero.querySelector(".lg\\:col-span-3");

    if (hero && !hero.querySelector(".ak-hero-console")) {
      var consolePanel = document.createElement("aside");
      consolePanel.className = "ak-hero-console ak-command-center";
      consolePanel.setAttribute("aria-label", "Execution operating model");
      consolePanel.innerHTML =
        '<div class="ak-console-top"><span>Execution OS</span><span class="ak-console-live">Ready</span></div>' +
        '<div class="ak-execution-rail" aria-hidden="true">' +
        "<span>Ambiguity</span><i></i><span>Alignment</span><i></i><span>Launch</span><i></i><span>Scale</span>" +
        '</div>' +
        '<div class="ak-command-copy"><span>Global · Remote · Hybrid</span><strong>Senior TPM, AI/platform transformation, and cross-domain execution leadership.</strong></div>';

      if (isMobile && heroTextColumn) {
        heroTextColumn.appendChild(consolePanel);
      } else if (heroSideColumn) {
        var ctaStack = heroSideColumn.querySelector(".mt-6");
        heroSideColumn.insertBefore(consolePanel, ctaStack || null);
      } else {
        hero.appendChild(consolePanel);
      }
    }

    var revealTargets = document.querySelectorAll(
      ".section-header, #impact .grid > div, #case-studies .grid > div, #expertise .grid > div, #contact .grid > a"
    );

    revealTargets.forEach(function (element, index) {
      element.classList.add("ak-reveal");
      element.style.transitionDelay = Math.min(index % 6, 5) * 55 + "ms";
    });

    if ("IntersectionObserver" in window && !reduceMotion) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      );

      revealTargets.forEach(function (element) {
        observer.observe(element);
      });
    } else {
      revealTargets.forEach(function (element) {
        element.classList.add("is-visible");
      });
    }

    var tiltTargets = document.querySelectorAll(
      "#impact .grid > div, #case-studies button, #case-studies a, #expertise .grid > div, #contact .grid > a"
    );

    tiltTargets.forEach(function (element) {
      element.classList.add("ak-card-tilt");

      if (reduceMotion || isMobile) return;
    });
  });
})();
