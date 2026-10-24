// "Morph" animation between a small origin element (the hero preview) and
// the full demo dialog. The dialog is scaled down to sit exactly over the
// origin, with a live copy of the origin laid on top, so at the first frame
// it looks like the preview itself. As the dialog grows, the copy grows with
// it and fades away to reveal the demo underneath. Closing plays it back.

const RADIUS = 22; // matches the hero preview's corner radius

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scale + offset that lays the dialog exactly over `origin`. */
function geometry(dialog: HTMLElement, origin: HTMLElement) {
  const box = dialog.getBoundingClientRect();
  // The preview may be 3D-tilted, so its bounding box is a projection; take
  // the center from it but the size from its untransformed layout box.
  const rect = origin.getBoundingClientRect();
  const width = origin.offsetWidth;
  const height = origin.offsetHeight;
  const sx = width / box.width;
  const sy = height / box.height;
  const dx = rect.left + rect.width / 2 - (box.left + box.width / 2);
  const dy = rect.top + rect.height / 2 - (box.top + box.height / 2);
  return { box, width, height, sx, sy, transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` };
}

/** A copy of `origin` placed inside the dialog at the dialog's full size. */
function makeGhost(dialog: HTMLElement, origin: HTMLElement, g: ReturnType<typeof geometry>) {
  const ghost = origin.cloneNode(true) as HTMLElement;
  ghost.setAttribute("aria-hidden", "true");
  ghost.inert = true;
  ghost.removeAttribute("data-landed");
  Object.assign(ghost.style, {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "20",
    margin: "0",
    width: `${g.width}px`,
    height: `${g.height}px`,
    transformOrigin: "0 0",
    // Inverse of the dialog's starting scale, so the copy shows at exactly
    // the preview's own size and grows along with the dialog.
    transform: `scale(${1 / g.sx}, ${1 / g.sy})`,
    animation: "none",
    transition: "none",
    visibility: "visible",
    pointerEvents: "none",
  });
  // Cloned elements would restart their own entrance animations, which
  // begin invisible; freeze everything at its settled look instead.
  ghost.querySelectorAll<HTMLElement>("*").forEach((el) => {
    el.style.animation = "none";
    el.style.transition = "none";
  });
  dialog.appendChild(ghost);
  return ghost;
}

/** Grows the dialog out of `origin`, overshooting a touch and settling. */
export function morphOpen(dialog: HTMLElement, origin: HTMLElement) {
  const g = geometry(dialog, origin);
  const ghost = makeGhost(dialog, origin, g);
  origin.style.visibility = "hidden";

  dialog.animate(
    [
      { transform: g.transform, borderRadius: `${RADIUS / g.sx}px`, offset: 0, easing: "cubic-bezier(0.3, 0.7, 0.35, 1)" },
      { transform: "scale(1.03)", borderRadius: "24px", offset: 0.68, easing: "ease-in-out" },
      { transform: "scale(0.992)", offset: 0.86, easing: "ease-in-out" },
      { transform: "none", borderRadius: "24px", offset: 1 },
    ],
    { duration: 760 },
  );
  // The copy holds for a beat so the preview is clearly what's growing,
  // then fades out to reveal the real demo.
  ghost
    .animate([{ opacity: 1 }, { opacity: 1, offset: 0.25 }, { opacity: 0 }], { duration: 480, fill: "forwards" })
    .finished.then(() => ghost.remove(), () => ghost.remove());
}

/**
 * Pops the dialog out a little, shrinks it back onto `origin` while the
 * preview copy fades back in, then calls `done`. The preview itself shows
 * again at the end and does its own landing bounce.
 */
export function morphClose(dialog: HTMLElement, origin: HTMLElement, done: () => void) {
  const g = geometry(dialog, origin);
  const ghost = makeGhost(dialog, origin, g);
  ghost.style.opacity = "0";

  const shrink = dialog.animate(
    [
      { transform: "none", borderRadius: "24px", offset: 0, easing: "ease-out" },
      { transform: "scale(1.025)", borderRadius: "24px", offset: 0.16, easing: "cubic-bezier(0.55, 0, 0.3, 1)" },
      { transform: g.transform, borderRadius: `${RADIUS / g.sx}px`, offset: 1 },
    ],
    { duration: 640, fill: "forwards" },
  );
  ghost.animate([{ opacity: 0 }, { opacity: 0, offset: 0.35 }, { opacity: 1, offset: 0.8 }, { opacity: 1 }], {
    duration: 640,
    fill: "forwards",
  });

  shrink.finished.then(
    () => {
      origin.style.visibility = "";
      done();
    },
    () => {
      origin.style.visibility = "";
      done();
    },
  );
}
