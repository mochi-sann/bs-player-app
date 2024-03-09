import LogoImage from "../../../assets/icon.png";
import { appWindow } from "@tauri-apps/api/window";
import { Maximize, Minus, X } from "lucide-react";

export const NavBar = () => {
  function minimize() {
    appWindow.minimize();
  }

  async function maximize() {
    let maximizeState = await appWindow.isMaximized();

    if (!maximizeState) {
      appWindow.maximize();
    } else {
      appWindow.unmaximize();
    }
  }

  function hide() {
    appWindow.hide();
  }
  return (
    <header className="bg-fixe h-12 select-none bg-white/5">
      <nav
        data-tauri-drag-region
        className="mx-auto flex items-center justify-between"
        aria-label="Global"
      >
        <div className=" inline-flex items-center gap-2 px-5">
          <img src={LogoImage} alt="logo" className="h-4 w-4" />
          <p className="text-center font-bold">BS Player</p>
        </div>
        <ul className="flex gap-x-1">
          <li>
            <button onClick={minimize} className="window-control-button">
              <Minus size="16" />
            </button>
          </li>
          <li>
            <button onClick={maximize} className="window-control-button">
              <Maximize size="16" />
            </button>
          </li>
          <li>
            <button
              onClick={hide}
              className="window-control-button hover:bg-red-600"
            >
              <X size="16" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
