import LogoImage from "../../../assets/icon.png";
import { Button } from "@/Components/ui/button";
import { appWindow } from "@tauri-apps/api/window";
import { Maximize, Minus, Settings, X } from "lucide-react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  function minimize() {
    appWindow.minimize();
  }

  async function maximize() {
    const maximizeState = await appWindow.isMaximized();

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
          <li className="flex items-center">
            <Link to="/settings" className="text-white">
              <Button variant={"ghost"} size={"icon"}>
                <Settings className="h- w-" size={"17"} />
              </Button>
            </Link>
          </li>
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

NavBar.displayName = "NavBar";
