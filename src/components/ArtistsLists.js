import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
// import Slider from '../utils/Slider.js';
import styles from '../assets/style/ArtistsLists.module.scss';


class ArtistsLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherIsOpen: true,
      bandIsOpen: false,
      djIsOpen: false,
      otherIsOpen: false,
    }

    this.roles = [
      {
        name: 'Teachers',
        filter: 'teacher'
      },
      {
        name: 'Bands',
        filter: 'band'
      },
      {
        name: 'DJs',
        filter: 'dj'
      },
      {
        name: 'Other',
        filter: 'other'
      },
    ]

  }

  componentDidUpdate() {
    // setTimeout( () => {
    //   this.props.isOverflown(document.getElementById('listsContainer'));

    // }, 500);
  }
 
  handleArtistsHeadingClick(listName) {
    const keyName = listName.toLowerCase() + "IsOpen";

    if (this.props.onMobile) {
    this.roles.forEach(role => {
      let keyName = role.filter + "IsOpen";
      this.setState({
        [keyName]: false,
      })
    });

    this.setState({
      [keyName]: true,
    })
    
    } else {
      this.setState( (prevState) => {
        return {
          [keyName]: !prevState[keyName],
        }
      });
    }
  }

  artistsMobile(obj, roles) {
    // get all roles and push into header
    const header = roles.map((role, i) => {
      return (
        <h3
          onClick={this.handleArtistsHeadingClick.bind(this, role.filter)}
          key={i}>{role.name}
        </h3>
      )
    });

    // sort artists by role and push each role's artist into list + slider!
    const artistsLists = roles.map( (role, i) => {
      const singleRole = obj.filter(item =>item.role.toLowerCase() === role.filter.toLowerCase());
      
      const elements = singleRole.map( (artist, i) => {
        return (
          <NavLink
            to={`/artists/${artist.slug}`}
            key={"artist-" + artist.role + ' ' + i}
            activeClassName={styles.active}
          >
            <li
              dangerouslySetInnerHTML={{__html: artist.name}}
              key={"artist-" + artist.role + ' ' + i}
            ></li>
          </NavLink>
        )
      });

      return ( this.state[role.filter + "IsOpen"] && (
        <div className={styles.sliderOuter} key={i}>
          <div className={styles.sliderInner}>
            {elements}
          </div>
        </div> 

      )
      ) 
    });
    
    return (
      <div className={styles.headersAndListsMobile}>
        <div className={styles.headersMobile}>
          {header}
        </div>
        <div className={styles.listsMobile}>
          {artistsLists}
        </div>
      </div>
    )
    
  }

  artistsDesktop(obj, roles) {
    const artistsLists = roles.map( (role, i) => {
      const singleRole = obj.filter(item =>item.role.toLowerCase() === role.filter.toLowerCase());
      
      const elements = singleRole.map( (artist, i) => {
        return (
          <NavLink
            to={`/artists/${artist.slug}`}
            key={"artist-" + artist.role + ' ' + i}
            activeClassName={styles.active}
          >
            <li
              className="artist"
              dangerouslySetInnerHTML={{__html: artist.name}}
              key={"artist-" + artist.role + ' ' + i}
            ></li>
          </NavLink>
        );
      });

      let icon = this.state[role.filter + "IsOpen"] ? '-' : '+';
      return (
        <div className={styles.list} key={i}>
          <h3
            onClick={this.handleArtistsHeadingClick.bind(this, role.filter)}
          >{role.name}
            <div className={styles.icon}>{icon}</div>
          </h3>
            <CSSTransition
              in={this.state[role.filter + "IsOpen"]}
              appear={true}
              timeout={500}
              classNames={styles}
            >
              <ul>
                {elements}
              </ul>
            </CSSTransition>
        </div>
      );
    });
    
    return (
      <div className={styles.listsDesktop} id="listsContainer">
        {artistsLists}          
      </div>
    )
  }

  render() {
    const {artists} = this.props;
    const artistsLists = (this.props.onMobile) ? this.artistsMobile(artists, this.roles) : this.artistsDesktop(artists, this.roles);
 
    return (
        <div className={styles['list-wrapper']}>
          <div className={styles['heading']}>
            <h1>Artists</h1>            
          </div>
          {artistsLists}
        </div>
    )
  }

}

ArtistsLists.propTypes = {
  artists: PropTypes.array,
  handleArtistClick: PropTypes.func,
  onMobile: PropTypes.bool,
}



export default ArtistsLists;