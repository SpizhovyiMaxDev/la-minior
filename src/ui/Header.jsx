import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link
        to="/"
        className="flex select-none items-center gap-2 font-paint text-lg font-semibold tracking-[5px] drop-shadow-sm hover:cursor-pointer sm:text-3xl sm:drop-shadow-xl"
      >
        <img
          src="/images/logo.png"
          className="h-12 w-12 object-cover"
          alt="logotype"
        />
        <span className="w-8 sm:w-auto">La Minor</span>
      </Link>

      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;
