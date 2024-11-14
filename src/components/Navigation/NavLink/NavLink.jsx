import { Link } from 'react-router-dom';
import s from './NavLink.module.css';

const NavLink = ({ children, to }) => {
  return (
    <Link className={s.link} to={to}>
      {children}
    </Link>
  );
};

export default NavLink;
