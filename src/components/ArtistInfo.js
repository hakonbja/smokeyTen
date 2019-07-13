import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from '../assets/style/ArtistInfo.module.scss';
import slideUp from '../assets/style/slideUp.module.scss';
import slideDown from '../assets/style/slideDown.module.scss';
import slideLeft from '../assets/style/slideLeft.module.scss';
import slideRight from '../assets/style/slideRight.module.scss';


const ArtistInfo = (props) => {
  const artist = props.artists.filter(item => item.slug === props.match.params.slug)[0];
  const name = artist.name
  const image = artist.img;
  const bio = artist.bio;
  
  return (
    <div className={styles['artist-info']}>
      <TransitionGroup component={null}>
        <CSSTransition
          in={true}
          appear={true}
          key={name}
          timeout={800}
          classNames={props.onMobile ? slideRight : slideUp}
        >
          <Bio bio={bio}/>
        </CSSTransition>
      </TransitionGroup>

      <TransitionGroup component={null}>
        <CSSTransition
          in={true}
          appear={true}
          key={name}
          timeout={800}
          classNames={props.onMobile ? slideLeft : slideDown}
        >
          <Image image={image}/>
        </CSSTransition>
      </TransitionGroup>
      
      {!props.onMobile && (
      <TransitionGroup className={styles.imageHover}>
        <CSSTransition
          in={true}
          appear={true}
          key={name}
          timeout={800}
          classNames={props.onMobile ? slideLeft : slideDown}
        >
          <Image image={image}/>
        </CSSTransition>
      </TransitionGroup>

      )}
    </div>
  )
}

ArtistInfo.propTypes = {
    artists: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    onMobile: PropTypes.bool.isRequired,
}

const Image = (props) => {
  if (props.image) {
    return (
        <div className={styles['image-wrapper']}>
          <div className={styles.image}>
            <img src={props.image} alt=""/>
          </div>
        </div>
    )
  }
  return (null);
}

Image.propTypes = {
  image: PropTypes.string,
}

const Bio = (props) => {
  return (
    <div className={styles['bio-wrapper']}>
      <div
        className={styles.bio}
        dangerouslySetInnerHTML={{__html: props.bio}}
      >
      </div>
    </div>
  )
}

Bio.propTypes = {
  bio: PropTypes.string,
}

export default ArtistInfo;