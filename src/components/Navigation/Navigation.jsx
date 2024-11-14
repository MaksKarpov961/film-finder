import s from './Navigation.module.css';
import NavLink from './NavLink/NavLink';
const Navigation = () => {
  return (
    <>
      <nav className={s.container}>
        <ul className={s.nav_list}>
          <li>
            <NavLink className={s.link} to={'/'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={s.link} to={'/movies'}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={s.line}></div>
    </>
  );
};

export default Navigation;
