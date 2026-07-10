(function () {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      consolePanel.className = "ak-hero-console";
      consolePanel.setAttribute("aria-label", "Execution signal dashboard");
      consolePanel.innerHTML =
        '<div class="ak-console-top"><span>Execution Signal</span><span class="ak-console-live">Live</span></div>' +
        '<div class="ak-console-grid">' +
        '<div class="ak-console-node" style="--ak-delay: 0s"><span>AI Adoption</span><strong>88%</strong></div>' +
        '<div class="ak-console-node" style="--ak-delay: .35s"><span>Scale Readiness</span><strong>20K TPS</strong></div>' +
        '<div class="ak-console-node" style="--ak-delay: .7s"><span>Migration</span><strong>0 Downtime</strong></div>' +
        '<div class="ak-console-node" style="--ak-delay: 1.05s"><span>Impact</span><strong>$12M+</strong></div>' +
        '</div>' +
        '<div class="ak-flow-row"><span>Ambiguity</span><i></i><span>Operating Model</span><i></i><span>Outcomes</span></div>';

      if (window.matchMedia("(max-width: 767px)").matches && heroTextColumn) {
        heroTextColumn.appendChild(consolePanel);
      } else if (heroSideColumn) {
        var ctaStack = heroSideColumn.querySelector(".mt-6");
        heroSideColumn.insertBefore(consolePanel, ctaStack || null);
      } else {
        hero.appendChild(consolePanel);
      }
    }

    if (!reduceMotion) {
      var spotlight = document.createElement("div");
      spotlight.className = "ak-spotlight";
      document.body.appendChild(spotlight);

      window.addEventListener(
        "pointermove",
        function (event) {
          document.body.classList.add("ak-pointer");
          document.documentElement.style.setProperty("--ak-x", event.clientX + "px");
          document.documentElement.style.setProperty("--ak-y", event.clientY + "px");
        },
        { passive: true }
      );
    }

    var revealTargets = document.querySelectorAll(
      "section, .section-header, #impact .grid > div, #case-studies .grid > div, #expertise .grid > div, #contact .grid > a"
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

      if (reduceMotion) return;

      element.addEventListener(
        "pointermove",
        function (event) {
          var rect = element.getBoundingClientRect();
          var x = ((event.clientX - rect.left) / rect.width) * 100;
          var y = ((event.clientY - rect.top) / rect.height) * 100;
          var rotateY = (x - 50) / 28;
          var rotateX = (50 - y) / 32;

          element.style.setProperty("--ak-mx", x + "%");
          element.style.setProperty("--ak-my", y + "%");
          element.style.setProperty("--ak-rx", rotateX + "deg");
          element.style.setProperty("--ak-ry", rotateY + "deg");
        },
        { passive: true }
      );

      element.addEventListener("pointerleave", function () {
        element.style.removeProperty("--ak-rx");
        element.style.removeProperty("--ak-ry");
      });
    });
  });
})();
