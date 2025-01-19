import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "text-sm inline-block rounded-full font-semibold uppercase tracking-wide transition-colors duration-300 focus:outline-none disabled:cursor-not-allowed";

  const colors = {
    yellow:
      "bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2",
    stone:
      "border-2 border-stone-300 text-stone-400 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2",
    red: "text-red-50 bg-red-500 hover:bg-red-600 focus:ring focus:ring-red-500 focus:ring-offset-2",
  };

  const styles = {
    primary: `${base} ${colors.yellow} px-4 py-3 md:px-6 md:py-4`,
    secondary: ` ${base} ${colors.stone} px-4 py-2.5 md:px-6 md:py-3.5`,
    tertiary: `${base} ${colors.red} px-4 py-3 md:px-6 md:py-4`,
    small: `${base} ${colors.yellow} text-xs font-medium px-4 py-2 md:px-5 md:py-2.5`,
    round: `${base} ${colors.yellow} px-2.5 py-1 md:px-3.5 md:py-2`,
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
