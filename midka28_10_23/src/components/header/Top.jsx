import s from "./Top.module.css";
import { Link } from "react-router-dom";

const Top = () => {
  return (
    <nav className={s.nav}>
      <Link to="/" className={s.logo}>
        <h3>Twitter(home)</h3>
      </Link>
      <ul>
        <li className={s.active}>
          <Link to="/post">POST</Link>
        </li>
        <li>
          <Link to="/account">ACCOUNT</Link>
        </li>
      </ul>
      <Search></Search>
    </nav>
  );
};

export default Top;

function Search() {
  return (
    <form className={s.search_box}>
      <input type="text" placeholder="Search ..." />
      <button type="reset"></button>
    </form>
  );
}
