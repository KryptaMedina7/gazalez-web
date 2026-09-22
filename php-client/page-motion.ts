import gsap from "gsap";
export function mountPageMotion() {
  const root = document.querySelector<HTMLElement>(".page-curtain")!;
  const panels = root.children;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let tween: gsap.core.Tween | undefined;
  let navigating = false;
  let restore: ReturnType<typeof setTimeout>;
  const reveal = () => {
    tween?.kill();
    navigating = false;
    gsap.set(panels, { xPercent: -101 });
    root.dataset.phase = "idle";
  };
  if (
    document.documentElement.classList.contains("page-arrival") &&
    !reduce.matches
  ) {
    root.dataset.phase = "revealing";
    gsap.set(panels, { xPercent: 0 });
    tween = gsap.to(panels, {
      xPercent: -101,
      duration: 0.32,
      stagger: 0.035,
      ease: "power3.inOut",
      onComplete: reveal,
    });
  }
  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.detail === 0 ||
      reduce.matches
    )
      return;
    const link = (event.target as Element)?.closest<HTMLAnchorElement>(
      "a[href]",
    );
    if (
      !link ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    )
      return;
    const destination = new URL(link.href, location.href);
    if (
      destination.origin !== location.origin ||
      destination.pathname === location.pathname ||
      /\.[a-z0-9]+$/i.test(destination.pathname)
    )
      return;
    if (navigating) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    navigating = true;
    tween?.kill();
    gsap.set(panels, { xPercent: 101 });
    root.dataset.phase = "covering";
    tween = gsap.to(panels, {
      xPercent: 0,
      duration: 0.18,
      stagger: 0.025,
      ease: "power2.out",
      onComplete: () => {
        try {
          sessionStorage.setItem("gazalez-arrival", destination.pathname);
        } catch {}
        location.assign(destination.href);
        restore = setTimeout(reveal, 2000);
      },
    });
  });
  addEventListener("pageshow", (event) => {
    if (event.persisted) {
      clearTimeout(restore);
      reveal();
    }
  });
  reduce.addEventListener("change", () => {
    if (reduce.matches && !navigating) reveal();
  });
}
