import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Registration from './components/Registration';
import Classes from './components/Classes';
import Parties from './components/Parties';
import Artists from './components/Artists';
import About from './components/About';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './assets/style/App.module.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onMobile: (window.innerWidth < 950) ? true : false,
      menuIsOpen: (window.innerWidth < 950) ? false : true,
      headerTop: 0,
      scrollTop: 0,
      scrollLeft: 0,
    }

    // this.backgroundImages =
    //   [
    //     'bianca_nils_jam.jpg',
    //     'feet.jpg',
    //     'social_dancers.jpg',
    //     'band.jpg',
    //     'knee_slap.jpg'
    //   ];
    
    this.mobileSize = 950;

    this.handleOffMenuClick = this.handleOffMenuClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuLinkClick = this.handleMenuLinkClick.bind(this);
  }

  componentDidMount() {
    this.fetchWPArtists();
    window.addEventListener("resize", this.onResize);
    // window.addEventListener("scroll", this.handleScroll); // causes bugs on iPhone
  }

  componentDidUpdate() {
    document.getElementsByTagName('main')[0].addEventListener('click', this.handleOffMenuClick);
  }
  
  componentWillUnmount() {
    document.getElementsByTagName('main')[0].removeEventListener('click', (e) => this.handleOffMenuClick(e));
    window.removeEventListener("resize", this.onResize);
  }

  
  handleOffMenuClick(e) {
    const header = document.getElementsByTagName('header')[0];
    if (this.state.menuIsOpen && this.state.onMobile && !header.contains(e.target)) {
      this.setState({menuIsOpen: false})
    }
  }

  handleMenuClick() {
    this.setState( (prevState) => {
      return {menuIsOpen: !prevState.menuIsOpen,}
    });
  }

  handleMenuLinkClick() {
    if (this.state.onMobile) {
      this.setState({
        menuIsOpen: false,
      });
    }
  }

  onResize()  {
    this.setState( (prevState) => {
      let newOnMobile = (window.innerWidth <= this.mobileSize) ? true : false;
      if (prevState.onMobile !== newOnMobile) {
        return {
          onMobile: newOnMobile,
          menuIsOpen: prevState.onMobile,
        }
      }
    });
  }

  handleScroll() {
    const currentTop = -window.scrollY
    const buffer = 20;

    if (!this.state.onMobile) {
      return;
    }

    if (this.state.scrollLeft !== window.scrollX) {
      this.setState({scrollLeft: window.scrollX});
      return;
    }
      
    this.setState( (prevState) => {
      if (currentTop < prevState.scrollTop - buffer) {
        const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
        return ({
          headerTop: -headerHeight,
          scrollTop: currentTop,
          menuIsOpen: false,
        });
      } else if (currentTop > prevState.scrollTop + buffer) {
        return ({
          headerTop: 0,
          scrollTop: currentTop,
        })
      }
    });
  }

  fetchWPArtists() {
    // let url = 'http://localhost/smokeyfeet/wp/wp-json/wp/v2/artists?per_page=50&_embed';
    let url = 'https://www.smokeyfeet.com/wp/wp-json/wp/v2/artists?per_page=50&_embed';

    fetch(url)
    .then(response => response.json())
    .then(myJSON => {
      let data = myJSON.map(item => {
        let obj = {
          name: item.title.rendered,
          bio: item.content.rendered,
          role: item.role[0],
          img: item._embedded['wp:featuredmedia'][0]['source_url'],
          slug: item.slug,
        }
        return obj;
      });

      data = data.sort(((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }));

      this.setState({
        artists: data
      });
    })
  }

  render() {
    return (
      <Router>
        <Background />
        <main>
          <Header
            onMobile={this.state.onMobile}
            menuIsOpen={this.state.menuIsOpen}
            handleMenuLinkClick={this.handleMenuLinkClick}
            handleMenuClick={this.handleMenuClick}
            headerTop={this.state.headerTop}
          />
          <Switch>
            <Route path="/" exact
              render={(props) =>
                <Home {...props}
                  onMobile={this.state.onMobile}
                />
              }
            />
            <Route path="/registration" component={Registration}/>
            <Route path="/classes" component={Classes}/>
            <Route path="/parties" component={Parties}/>
            <Route path="/artists" // on mobile: automatically add the slug of the first artist in the role that's open
              render={(props) =>  <Artists {...props}
                                    artists={this.state.artists}
                                    onMobile={this.state.onMobile}
                                  />}
            />
            <Route path="/about" component={About}/>
          </Switch>
        <Footer />
        </main>
      </Router>
    )
  }
}

class Background extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundImage: "",
    }

    // this.backgroundImages =
    //   [
    //     'bianca_nils_jam.jpg',
    //     'feet.jpg',
    //     'social_dancers.jpg',
    //     'band.jpg',
    //     'knee_slap.jpg'
    //   ];
  }

  componentDidMount() {
    this.setBackground();
  }
  
  setBackground() {
    const backgroundImages =
      [
        'bianca_nils_jam.jpg',
        'feet.jpg',
        'social_dancers.jpg',
        'band.jpg',
        'knee_slap.jpg'
      ];
    let random = Math.floor(Math.random() * (backgroundImages.length));
    const backgroundImage = require('./assets/img/' + backgroundImages[random]);

    this.setState({
      backgroundImage: backgroundImage
    });
  }
  
  render() {
    return (
      <div
        className={styles.background}
        style={{backgroundImage: `url(${this.state.backgroundImage})`}}
      ></div>
    )
  }
}

export default App;
