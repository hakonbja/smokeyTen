import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import ArtistsLists from './ArtistsLists';
import ArtistInfo from './ArtistInfo';
import { CSSTransition } from "react-transition-group";
import styles from '../assets/style/Artists.module.scss';

class Artists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.isOverflown = this.isOverflown.bind(this);
  }

  isOverflown(element) {
    // console.log(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth);
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  render() {
    
    if (!this.props.artists) {
      return (null);
    }
    
    return (
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="fade"
      >
        <div className={styles.artists}>
          <ArtistsLists
            artists={this.props.artists}
            onMobile={this.props.onMobile}
            isOverflown={this.isOverflown}
          />
          <Route
            path={`/artists/:slug`} 
            render={(props) => <ArtistInfo {...props} artists={this.props.artists} onMobile={this.props.onMobile}/>}
          />
        </div>
      </CSSTransition>
    )
  }
}

Artists.propTypes = {
  artists: PropTypes.array,
  onMobile: PropTypes.bool,
}

export default Artists;