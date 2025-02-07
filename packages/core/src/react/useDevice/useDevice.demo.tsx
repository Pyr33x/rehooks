import { useDevice } from "./index";
import { useState } from "react";

function Component() {
  const { isMobile, isDesktop, isTablet, DesktopView, MobileView, TabletView } =
    useDevice();

  const [isMobileView, setIsMobileView] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  return (
    <div>
      <div>
        {isMobileView && <div>Mobile View</div>}
        {isDesktopView && <div>Desktop View</div>}
        {isTabletView && <div>Tablet View</div>}
      </div>
      <button onClick={() => setIsMobileView(MobileView())}>
        {isMobile ? "Hide" : "Show"} Mobile View
      </button>
      <button onClick={() => setIsDesktopView(DesktopView())}>
        {isDesktop ? "Hide" : "Show"} Desktop View
      </button>
      <button onClick={() => setIsTabletView(TabletView())}>
        {isTablet ? "Hide" : "Show"} Tablet View
      </button>
    </div>
  );
}
