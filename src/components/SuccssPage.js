import React, { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div style={{maxWidth: '500px'}}>
        <h1 className={'secondary-color'}>THANK YOU!</h1>
        <p style={{lineHeight: 3,letterSpacing:' 0.16em'}}>Welcome to our community. We are glad that you joined us. For this reason, we are giving you a special welcome offer. On this message, you can find a link to a coupon to use on our <a href={'https://squashapps.com/'}> website </a></p>
      </div>
    );
  }
}

export default App;
