import React from 'react';
import Homepage from './homepage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Investasi from './Investasi'
import DetailInvestasi from './Investasi/DetailInvestasi'
import AuthLogin from './auth/auth.login'
import InvestasiForm from './Investasi/InvestasiForm'
import Register from './auth/register';
import Admin from './auth/Admin'
import UserShow from './User/UserShow'
import EditProfile from './User/editProfile'
import TransferEditProfile from './User/TransferEditProfile'
import PaymentForm from './BankTransfer/PaymentForm'



class App extends React.Component {
  render() {
    return (

      <div style={{ height: '100%' }}>
        <BrowserRouter>
          <Route exact path='/' component={Homepage} />
          <Switch>
            <Route exact path='/investasi' component={Investasi} />
            <Route path='/investasi/:idInvestasi' component={DetailInvestasi} />
          </Switch>
          <Route exact path='/investasi-form' component={InvestasiForm} />
          <Route exact path='/login' component={AuthLogin} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/admin' component={Admin} />
          <Switch>
            <Route exact path='/user/:userId' component={UserShow} />
            <Route path='/user/:userId/edit-form' component={EditProfile} />
            <Route path='/user/:userId/edit-form-transfer' component={TransferEditProfile} />
            <Route path='/user/:userId/transfer-form' component={PaymentForm} />
          </Switch>
          </BrowserRouter>
        </div>

        )
      }
    }
    export default App;
