import React from 'react';
import styles from '../assets/style/Home.module.scss';
import fadeIn from '../assets/style/transitions/fadeIn.module.scss';
import rollDown from '../assets/style/transitions/rollDown.module.scss';
import { CSSTransition } from "react-transition-group";
import PropTypes from 'prop-types';

const Home = (props) =>(
  
    <div className={styles.home}>
      {!props.onMobile && (
        <CSSTransition
          in={true}
          appear={true}
          timeout={800}
          classNames={rollDown}
        >
          <div className={styles.ribbonWrapper}>
            <div className={styles.ribbon}>
            <CSSTransition
              in={true}
              appear={true}
              timeout={800}
              classNames={fadeIn}
            >
              <div className={styles.ribbonContent}>
                <h3><span className={styles.orange}>5 parties</span> with live music</h3>
                <h3>2 days of <span className={styles.orange}>workshops</span></h3>
                <h3>register on <span className={styles.orange}>january 11th</span></h3>
              </div>
            </CSSTransition>
            </div>
          </div>
        </CSSTransition>
      )}

      {props.onMobile && (
        <div className={styles.textContainer}>
          <h3><span className={styles.orange}>5 parties</span> with live&nbsp;music</h3>
          <h3>2 days of <span className={styles.orange}>workshops</span></h3>
        </div>
      )}

      <CSSTransition
        in={true}
        appear={true}
        timeout={800}
        classNames={fadeIn}
      >
        <div className={styles.dateWrapper}>
          <div className={styles.border}>
            <div className={styles.date}>
              <h1>21-25</h1>
              <h1>may</h1>
              <h1>2020</h1>
            </div>
            <div className={styles.line}></div>
            <div className={styles.location}>
              <h2>Amsterdam</h2>
            </div>
          </div>
        </div>
      </CSSTransition>

      {props.onMobile && (
        <div className={styles.textContainer}>
          <h3>register on <span className={styles.orange}>january&nbsp;11th</span></h3>
        </div>
      )}

    </div>
)

Home.propTypes = {
  onMobile: PropTypes.bool.isRequired,
}

export default Home;