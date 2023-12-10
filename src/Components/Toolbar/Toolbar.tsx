import {NavLink} from 'react-router-dom';

const Toolbar = () => {


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to='/' className="navbar-brand">Colories tracker</NavLink>
        <ul className="navbar-nav mr-auto fles-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add-meal" className="nav-link">Add new meal</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;