import React from 'react';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import NavbarContainer from './navbar-container';
import Splash from './splash';
import Contract from './contract';
import Footer from './footer';
import ContractShowContainer from './contract_show_container';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <Switch>
          <Route exact path="/" component={Splash} />
          <ProtectedRoute
            path="/contract/:id"
            component={ContractShowContainer}
          />
          <ProtectedRoute path="/contract" component={Contract} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
