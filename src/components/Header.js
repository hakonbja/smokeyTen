import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import { ReactComponent as Logo } from '../assets/img/white_logo.svg';
import styles from '../assets/style/Header.module.scss';
import { ReactComponent as TenYears } from '../assets/img/10_year_anniversary.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    }

  }
  
  componentDidMount() {
    this.fetchWPMenu();
  }
  
  fetchWPMenu() {
    let url = 'https://www.smokeyfeet.com/wp/wp-json/wp/v2/menu';

    fetch(url)
    .then(response => response.json())
    .then(myJSON => {
      let menuItems = myJSON.map(item => {
        return (
          {
          name: item.title,
          slug: item.url,
          }
        );
      });

      this.setState({
        menuItems: menuItems,
      });
  })
}


  render() {
    return (
      <header
        className={styles.header}
        style={{top: this.props.headerTop}}
      >
        <div className={styles.left} onClick={this.props.handleMenuLinkClick}>
          <Link to="/">
            <Logo className={styles.logo}/>
            <div className={styles.text}>
              <h3>Smokey Feet</h3>
            </div>
          </Link>
        </div>
          <div
            className={styles.tenYearsWrapper}
          >
            <Link to="/">
              <TenYears
              className={styles.tenYears}
              onClick={this.props.handleMenuLinkClick}
            />
            </Link>
          </div>
        <nav className={styles.navbar}>
        
        <CSSTransition
          in={this.props.menuIsOpen}
          timeout={500}
          classNames={styles}
        >
          <ul className={styles.linksList}>
            <Links
              list={this.state.menuItems}
              onClick={this.props.handleMenuLinkClick}
            />
          </ul>
        </CSSTransition>

          <div
            className={(this.props.menuIsOpen) ? styles.hamburgerMenuWrapperOpen : styles.hamburgerMenuWrapper}
          >
            <div className={styles.hamburgerMenu}
              onClick={this.props.handleMenuClick}
            >
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  menuIsOpen: PropTypes.bool,
  handleMenuClick: PropTypes.func,
  handleMenuLinkClick: PropTypes.func,
  onMobile: PropTypes.bool,
  headerTop: PropTypes.number,
}

const Links = (props) => {
  const {list, onClick} = props;
  const links = list.map((item, i) => {
    return (
      <NavLink
        to={item.slug}
        onClick={onClick}
        key={i}
        activeClassName={styles.active}
      >
        <li>{item.name}</li>
      </NavLink>
    )
  })
  return links;
}

export default Header;