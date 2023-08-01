// 이미지 확대
export function onMouseEnter(e) {
  gsap.to(e.target, { duration: 0.3, scale: 1.05, ease: "power2.out" });
}

export function onMouseLeave(e) {
  gsap.to(e.target, { duration: 0.3, scale: 1, ease: "power2.out" });
}