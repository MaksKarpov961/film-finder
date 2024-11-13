import { Link } from 'react-router-dom';

const NavLink = ({ children, link }) => {
  return <Link to={link}>{children}</Link>;
};

export default NavLink;
