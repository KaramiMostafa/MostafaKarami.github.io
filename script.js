// ===== Publication filter by year =====
(function () {
  const list = document.getElementById("pub-list");
  const buttons = document.querySelectorAll(".pub-filters [data-filter]");
  if (!list || !buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      const year = btn.getAttribute("data-filter");
      list.querySelectorAll(".pub").forEach((item) => {
        const show = year === "all" || item.getAttribute("data-year") === year;
        item.style.display = show ? "" : "none";
      });
    });
  });
})();

// ===== Active section highlighting (left rail + mobile section nav) =====
(function () {
  const sections = Array.from(document.querySelectorAll("main .section[id]"));
  if (!sections.length) return;

  const navItems = Array.from(
    document.querySelectorAll(".side-nav .nav-item[data-section]")
  );
  const mobileLinks = Array.from(
    document.querySelectorAll(".m-section-nav a[data-section]")
  );

  const setActive = (id) => {
    navItems.forEach((a) => {
      const on = a.dataset.section === id;
      a.classList.toggle("active", on);
      a.setAttribute("aria-current", on ? "page" : "false");
    });
    mobileLinks.forEach((a) => {
      const on = a.dataset.section === id;
      a.classList.toggle("active", on);
    });
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { root: null, rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((s) => obs.observe(s));
})();

// ===== Scroll reveal animation for cards =====
(function () {
  const cards = document.querySelectorAll(".section-card");
  if (!cards.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((c) => obs.observe(c));
})();

// ===== Back-to-top button show/hide =====
(function () {
  const btn = document.querySelector(".scroll-top");
  if (!btn) return;

  const toggle = () => {
    if (window.scrollY > 250) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
})();

// ===== Custom cursor ring =====
(function () {
  const ring = document.getElementById("cursor-ring");
  if (!ring) return;

  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isCoarse || reduce) {
    ring.remove();
    return;
  }

  let x = window.innerWidth / 2,
    y = window.innerHeight / 2;
  let tx = x,
    ty = y;
  const speed = 0.18;

  function raf() {
    x += (tx - x) * speed;
    y += (ty - y) * speed;
    ring.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  window.addEventListener(
    "mousemove",
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      ring.style.opacity = "1";
    },
    { passive: true }
  );

  window.addEventListener("mouseleave", () => {
    ring.style.opacity = "0";
  });

  const interactive =
    "a, button, .btn, .icon-btn, [role='button'], input, textarea, select, summary, .chip";
  document.addEventListener("pointerover", (e) => {
    if (e.target.closest(interactive)) ring.classList.add("hover");
  });
  document.addEventListener("pointerout", (e) => {
    if (e.target.closest(interactive)) ring.classList.remove("hover");
  });

  document.addEventListener("mousedown", () => ring.classList.add("down"));
  document.addEventListener("mouseup", () => ring.classList.remove("down"));
})();
