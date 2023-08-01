export function fadeIn() {
  const node = getNodes(".main_banner_button");
  gsap.to(node, { duration: 1, opacity: 1, ease: "expo.out" });
}
export function fadeout() {
  const node = getNodes(".main_banner_button");
  gsap.to(node, { duration: 1, opacity: 0, ease: "expo.out" });
}
