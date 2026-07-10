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
    var modes = [
      {
        key: "map",
        label: "Map",
        title: "Map ambiguity",
        copy: "Turn unclear goals, risks, and dependencies into one visible operating picture.",
        nodes: [
          ["Signals", "12+"],
          ["Risk map", "Live"],
          ["Owners", "Clear"],
          ["Decision path", "Short"]
        ]
      },
      {
        key: "align",
        label: "Align",
        title: "Align the system",
        copy: "Create shared rhythm across product, engineering, risk, ops, vendors, and leadership.",
        nodes: [
          ["Teams", "2K eng"],
          ["Repos", "1.5K"],
          ["Forums", "Tight"],
          ["Governance", "Lean"]
        ]
      },
      {
        key: "launch",
        label: "Launch",
        title: "Launch with evidence",
        copy: "Move from confidence theater to readiness evidence before customer impact is at stake.",
        nodes: [
          ["Scale", "20K TPS"],
          ["Incidents", "0 P1/P2"],
          ["Migration", "0 Down"],
          ["Readiness", "Bank-grade"]
        ]
      },
      {
        key: "scale",
        label: "Scale",
        title: "Scale adoption",
        copy: "Make the operating model repeatable so teams keep using it after launch day.",
        nodes: [
          ["Adoption", "88%"],
          ["Impact", "$12M+"],
          ["Champions", "200+"],
          ["Reach", "Global"]
        ]
      }
    ];

    if (hero && !hero.querySelector(".ak-hero-console")) {
      var consolePanel = document.createElement("aside");
      consolePanel.className = "ak-hero-console ak-mode-map";
      consolePanel.setAttribute("aria-label", "Execution signal dashboard");
      consolePanel.innerHTML =
        '<div class="ak-console-top"><span>Execution Signal</span><span class="ak-console-live">Live</span></div>' +
        '<div class="ak-mode-stage" aria-hidden="true"><span></span><span></span><span></span><strong>AK</strong></div>' +
        '<div class="ak-mode-copy"><span>Mode 01</span><strong>Map ambiguity</strong><p>Turn unclear goals, risks, and dependencies into one visible operating picture.</p></div>' +
        '<div class="ak-mode-rail" role="tablist" aria-label="Execution modes">' +
        modes
          .map(function (mode, index) {
            return (
              '<button class="ak-mode-chip' +
              (index === 0 ? " is-active" : "") +
              '" type="button" role="tab" aria-selected="' +
              (index === 0 ? "true" : "false") +
              '" data-mode-index="' +
              index +
              '">' +
              mode.label +
              "</button>"
            );
          })
          .join("") +
        "</div>" +
        '<div class="ak-console-grid">' +
        '<div class="ak-console-node" style="--ak-delay: 0s"><span>Signals</span><strong>12+</strong></div>' +
        '<div class="ak-console-node" style="--ak-delay: .35s"><span>Risk map</span><strong>Live</strong></div>' +
        '<div class="ak-console-node" style="--ak-delay: .7s"><span>Owners</span><strong>Clear</strong></div>' +
        '<div class="ak-console-node" style="--ak-delay: 1.05s"><span>Decision path</span><strong>Short</strong></div>' +
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

      var modeIndex = 0;
      var modeButtons = Array.prototype.slice.call(consolePanel.querySelectorAll(".ak-mode-chip"));
      var modeTitle = consolePanel.querySelector(".ak-mode-copy strong");
      var modeCopy = consolePanel.querySelector(".ak-mode-copy p");
      var modeNumber = consolePanel.querySelector(".ak-mode-copy span");
      var modeNodes = Array.prototype.slice.call(consolePanel.querySelectorAll(".ak-console-node"));

      function setMode(nextIndex) {
        var mode = modes[nextIndex];
        modeIndex = nextIndex;
        consolePanel.className = "ak-hero-console ak-mode-" + mode.key;
        modeTitle.textContent = mode.title;
        modeCopy.textContent = mode.copy;
        modeNumber.textContent = "Mode " + String(nextIndex + 1).padStart(2, "0");

        modeButtons.forEach(function (button, index) {
          var active = index === nextIndex;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-selected", active ? "true" : "false");
        });

        modeNodes.forEach(function (node, index) {
          node.classList.remove("is-swapping");
          void node.offsetWidth;
          node.classList.add("is-swapping");
          node.querySelector("span").textContent = mode.nodes[index][0];
          node.querySelector("strong").textContent = mode.nodes[index][1];
        });
      }

      modeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          setMode(Number(button.getAttribute("data-mode-index")));
        });
      });

      if (!reduceMotion) {
        window.setInterval(function () {
          setMode((modeIndex + 1) % modes.length);
        }, 3600);
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
