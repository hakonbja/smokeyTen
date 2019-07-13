import React from 'react';
import { ReactComponent as FB } from '../assets/img/facebook_logo.svg';
import { ReactComponent as YouTube } from '../assets/img/youtube_logo.svg';
import { ReactComponent as Email } from '../assets/img/email_1.svg';
import styles from '../assets/style/Footer.module.scss';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state= {

    }
  }

  render() {
    return (
      <footer className={styles.footer}>
        <ul className={styles.social}>
          <li>
            <a href="https://www.facebook.com/Smokey.Feet/" target="_blank" rel="noopener noreferrer">
              <FB className="fb-logo"/>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCZF0ieyE0i8lNCQx1YzXMgw" target="_blank" rel="noopener noreferrer">
              <YouTube className="youtube-logo"/>
            </a>
          </li>
          <li>
            <a href="mailto:info@smokeyfeet.com" target="_blank" rel="noopener noreferrer">
              <Email className={styles.email}/>
            </a>
          </li>
        </ul>
      </footer>
    )
  }
}

export default Footer;