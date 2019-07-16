import React from 'react';
import Homepage from './homepage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Investasi from './Investasi'
import DetailInvestasi from './Investasi/DetailInvestasi'
import AuthLogin from './auth/auth.login'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Homepage} />
          <Switch>
          <Route exact path='/investasi' component={Investasi} />
          <Route path='/investasi/:idInvestasi' component={DetailInvestasi} />
          </Switch>
          
          <Route path='/login' component={AuthLogin}/>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
