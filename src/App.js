import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './scss/manageCampaigns.scss';
import ManageCampaignsContainer from './containers/ManageCampaignsContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/ManageCampaigns' component={ManageCampaignsContainer} />
        </Switch>
        <Redirect from='/' to='/ManageCampaigns' />
      </Router>
    </div>
  );
}

export default App;
