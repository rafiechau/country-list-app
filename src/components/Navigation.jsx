import { Link } from 'react-router-dom';
import ThemeButton from './ThemeButton';
import Container from "../styles/navigation.module.scss";


export default function Navigation() {
  return (
      <header>
        <div className={Container.logo}>
           <Link to={'/'}>Where in the world?</Link>
        </div>
        <nav className={Container.navigation}>
          <ul>
          <ThemeButton />
          <li><Link to={'/favorites'}>Favorit Country</Link></li>
          </ul>
        </nav>
      </header>
  );
}

