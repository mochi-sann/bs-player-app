export const TitileNavBar = () => {
  return (
    <nav className="flex w-full flex-col border-b px-6 py-4 text-center font-sans shadow  sm:flex-row sm:items-baseline sm:justify-between sm:text-left">
      <div className="mb-2 sm:mb-0">
        <a
          href="#"
          className="text-grey-darkest hover:text-blue-dark text-2xl no-underline"
        >
          Home
        </a>
      </div>
    </nav>
  );
};
