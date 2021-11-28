import React, {useMemo} from "react";
import {Link} from "react-router-dom";
import objectPath from "object-path";
import {Brand} from "../brand/Brand";
import {AsideMenu} from "./aside-menu/AsideMenu";
import {useHtmlClassService} from "../../_core/MetronicLayout";

export function Aside() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      disableScroll:
          objectPath.get(uiService.config, "aside.menu.dropdown") === "true" ||
          false,
      asideClassesFromConfig: uiService.getClasses("aside", true),
      disableAsideSelfDisplay:
          objectPath.get(uiService.config, "aside.self.display") === false,
      headerLogo: uiService.getLogo()
    };
  }, [uiService]);

  return (
      <>
        <div id="kt_aside"
          className={`aside aside-left  ${layoutProps.asideClassesFromConfig} d-flex flex-column flex-row-auto`}>
          <Brand/>

          <div id="kt_aside_menu_wrapper" className="aside-menu-wrapper flex-column-fluid">
            {layoutProps.disableAsideSelfDisplay && (
              <>
                <div className="header-logo">
                  <Link to="">
                    <img alt="logo" src={layoutProps.headerLogo}/>
                  </Link>
                </div>
              </>
            )}
            <AsideMenu disableScroll={layoutProps.disableScroll}/>
          </div>
        </div>
      </>
  );
}
