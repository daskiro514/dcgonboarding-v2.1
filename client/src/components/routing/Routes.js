import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import Register from '../auth/Register'
import Login from '../auth/Login'
import ForgotPassword from '../auth/ForgotPassword'
import ResetPassword from '../auth/ResetPassword'
// import Alert from '../layout/Alert'
import Alert1 from '../layout/Alert1'
import NotFound from '../layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute'

import Home from '../layout/Home'
import PartnerApplication from '../partner/PartnerApplication'
import Thanks from '../layout/Thanks'
import FailedConnectAccount from '../layout/FailedConnectAccount'
import Sales from '../sales/Sales'
import Sales1 from '../sales/Sales1'
import Sales2 from '../sales/Sales2'
import CheckoutForSubscription from '../sales/CheckoutForSubscription'
import CheckoutForSubscription2 from '../sales/CheckoutForSubscription2'
import CheckoutForProduct from '../sales/CheckoutForProduct'
import ThanksForCustomer from '../layout/ThanksForCustomer'
import CourseReport from '../customer/CourseReport'
import ReportArticle from '../customer/ReportArticle'
import Video from '../customer/Video'
import DefaultVideo from '../customer/DefaultVideo'

const Routes = props => {
  return (
    <section>
      {/* <Alert /> */}
      <Alert1 />
      <Switch>
        {/* <Route exact path="/register" component={Register} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path='/forgotPassword' component={ForgotPassword} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/resetpassword/:id" component={ResetPassword} />
        <PrivateRoute path="/home" component={Home} />
        <Route exact path="/partner" component={PartnerApplication} />
        <Route exact path="/thanks/:id" component={Thanks} />
        <Route exact path="/failedconnectaccount/:id" component={FailedConnectAccount} />
        <Route path="/sales/:id" component={Sales} />
        <Route path="/sales1/:id" component={Sales1} />
        <Route path="/sales2/:id" component={Sales2} />
        <Route path="/checkoutsub/:id" component={CheckoutForSubscription} />
        <Route path="/checkoutsub2/:id" component={CheckoutForSubscription2} />
        <Route path="/checkoutone/:id" component={CheckoutForProduct} />
        <Route path="/thankscustomer" component={ThanksForCustomer} />
        <PrivateRoute path="/coursereports" component={CourseReport} />
        <PrivateRoute path="/report/:id" component={ReportArticle} />
        <PrivateRoute path="/video/:id" component={Video} />
        <PrivateRoute path="/defaultvideo/:id" component={DefaultVideo} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
