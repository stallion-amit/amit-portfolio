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
        '<div class="ak-command-orbit" aria-hidden="true">' +
        '<span></span><span></span><span></span><strong>AK</strong>' +
        "</div>" +
        '<div class="ak-command-copy"><span>How I create leverage</span><strong>Ambiguity into operating rhythm.</strong><p>AI, platform, and transformation programs shaped into clear decisions, safer launches, and measurable business outcomes.</p></div>' +
        '<div class="ak-command-loop" aria-hidden="true">' +
        "<span>Map</span><i></i><span>Align</span><i></i><span>Launch</span><i></i><span>Scale</span>" +
        "</div>" +
        '<div class="ak-signal-board">' +
        "<div><span>Role fit</span><strong>Senior TPM / Transformation</strong></div>" +
        "<div><span>Industries</span><strong>Global, cross-domain</strong></div>" +
        "<div><span>Work model</span><strong>Remote / Hybrid</strong></div>" +
        "<div><span>Operating style</span><strong>Evidence-led execution</strong></div>" +
        '</div>' +
        '<div class="ak-console-note">Built for high-stakes programs where leadership needs truth, pace, and trust.</div>';

      if (isMobile && heroTextColumn) {
        heroTextColumn.appendChild(consolePanel);
      } else if (heroSideColumn) {
        var ctaStack = heroSideColumn.querySelector(".mt-6");
        heroSideColumn.insertBefore(consolePanel, ctaStack || null);
      } else {
        hero.appendChild(consolePanel);
      }
    }

    if (hero && !hero.nextElementSibling?.classList.contains("ak-proof-marquee")) {
      var marquee = document.createElement("div");
      marquee.className = "ak-proof-marquee";
      marquee.setAttribute("aria-label", "Portfolio focus areas");
      marquee.innerHTML =
        '<div class="ak-proof-track">' +
        "<span>AI transformation</span><i></i><span>Platform scale</span><i></i><span>Regulated execution</span><i></i><span>Global collaboration</span><i></i><span>Remote / hybrid ready</span><i></i>" +
        "<span>AI transformation</span><i></i><span>Platform scale</span><i></i><span>Regulated execution</span><i></i><span>Global collaboration</span><i></i><span>Remote / hybrid ready</span><i></i>" +
        "</div>";
      hero.insertAdjacentElement("afterend", marquee);
    }

    if (!reduceMotion && !isMobile) {
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
