import {getNode} from "../../../lib/index.js"

//팝업 닫기
export const handlePopupClose = (e) => {
  const popup = getNode(".main_popup");

  invisibleElement(popup);
};


//배너 닫기
export const handleBannerClose = (e) => {
  const banner = getNode(".header_banner");

  
  gsap.to(banner, {
    marginTop: -banner.clientHeight,
    opacity: 0,
    maxHeight: 1,
    duration: 0.5, // 애니메이션 지속 시간을 설정합니다(옵션).

    onComplete: function () {
      banner.style.display = "none";
    },
  });

};