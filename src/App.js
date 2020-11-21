import './App.scss';
import FinalForm from './components/FinalForm';
import SuccessPage from './components/SuccssPage';
import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { appPage: true }
  }
  showPage = () => {
    this.setState({
      appPage: false
    })
  }
  render() {
    return (
      <div className="app">
        {this.state.appPage ? <FinalForm showPage={this.showPage} /> : <SuccessPage />}
      </div>
    );
  }
}

export default App;
