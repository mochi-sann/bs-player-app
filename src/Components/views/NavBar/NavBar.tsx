import LogoImage from "../../../assets/icon.png";

type NavBarProps = {};

export const NavBar = (props: NavBarProps) => {
  return (
    <nav
      className="canDrag sticky left-0 top-0 z-50 flex w-full flex-col border-b  bg-white/5 px-6 py-4 text-center font-sans shadow sm:flex-row sm:items-baseline sm:justify-between sm:text-left"
      data-tauri-drag-region
    >
      <div className="mb-2 sm:mb-0">
        <a
          href="/"
          className="text-grey-darkest hover:text-blue-dark inline-flex items-center gap-4 text-2xl font-bold no-underline"
        >
          <img src={LogoImage} alt="logo" className="h-6 w-6" />
          BS Player
        </a>
      </div>
      <div className="titlebar-button" id="titlebar-minimize">
        <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
        />
      </div>
      <div className="titlebar-button" id="titlebar-maximize">
        <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
        />
      </div>
      <div className="titlebar-button" id="titlebar-close">
        <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
      </div>
    </nav>
  );
};
