import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import salesBundle from '../../img/sales/sales-bundle.png'
import defaultLogo from '../../img/sales/sales-logo.png'
import defaultBackground from '../../img/sales/sales-bg.png'
import { getTempUser, getSalesProducts, getPublishableKey } from '../../actions/partner'

const Sales = ({ match, oneTimeProducts, subscriptionProducts, defaultProducts, getTempUser, getSalesProducts, getPublishableKey, title, subtitle, description, backgroundColor, fontColor, boxColor, logoImage, backgroundImage, baseURL }) => {
  const userID = match.params.id

  React.useEffect(() => {
    getTempUser(userID)
    getSalesProducts(userID)
    getPublishableKey()
  }, [getTempUser, getSalesProducts, getPublishableKey, userID])

  return (
    <div className="bg-sales container-fluid" style={{ background: backgroundColor ? backgroundColor : 'black', color: fontColor ? fontColor : 'white' }}>
      <div style={{ background: `url(${backgroundImage ? baseURL + backgroundImage : defaultBackground}) no-repeat center center/cover` }}>
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <Link to='/home'>
                <img src={logoImage ? baseURL + logoImage : defaultLogo} alt="error" className="img-responsive sales-logo-center logo" />
              </Link>
              <h1 className="w3-center">{title ? title : "Welcome To The Sales Page"}</h1>
              <h3 className="w3-center">{subtitle ? subtitle : "Hosted By DCG and TEAM"}</h3>
              <p className="w3-justify">
                {description ? description : "Lorem ipsum dolor sit amet, consectueture adipiscing elit, sed diam nonummy nibg euismod tinicidiunt ut laroreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim venaim, quis nostrud exercitation aullamcorper suscipt laotrertis nisl ut alliqiuip ex ea commaod consequat. Duils autem ve eum iriuree"}
              </p>
            </div>
            <div className="col-md-5">
              <img src={salesBundle} alt="error" className="img-responsive" />
              <br />
              <br />
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11 overflow">
                  {/* <>
                    MASTER SUBSCRIPTION PRODUCTS<br />
                    {defaultProducts.map((item, index) =>
                      <React.Fragment key={index}>
                        <Link to={`/checkoutsub/${item._id}`}>
                          <div className="goldBox row w3-center" style={{ backgroundColor: boxColor ? boxColor : "#ebc27e" }}>
                            <h3>{item.name}</h3>
                            <h4>{item.description}</h4>
                            <h5>{item.price / 100} $ / {item.recurringInterval}</h5>
                          </div>
                          <br />
                        </Link>
                      </React.Fragment>
                    )}
                  </> */}
                  <>
                    {/* SUBSCRIPTION PRODUCTS<br /> */}
                    {subscriptionProducts.map((item, index) =>
                      <React.Fragment key={index}>
                        <Link to={`/checkoutsub/${item._id}`}>
                          <div className="goldBox row w3-center" style={{ backgroundColor: boxColor ? boxColor : "#ebc27e" }}>
                            <h3>{item.name}</h3>
                            <h4>{item.description}</h4>
                            <h5>{item.price / 100} $ / {item.recurringInterval}</h5>
                          </div>
                        </Link>
                        <br />
                      </React.Fragment>
                    )}
                  </>
                  <>
                    {/* ONE TIME PRODUCTS<br /> */}
                    {oneTimeProducts.map((item, index) =>
                      <React.Fragment key={index}>
                        <Link to={`/checkoutone/${item._id}`}>
                          <div className="goldBox row w3-center" style={{ backgroundColor: boxColor ? boxColor : "#ebc27e" }}>
                            <h3>{item.name}</h3>
                            <h4>{item.description}</h4>
                            <h5>{item.price / 100} $</h5>
                          </div>
                        </Link>
                        <br />
                      </React.Fragment>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  oneTimeProducts: state.partner.oneTimeProducts,
  subscriptionProducts: state.partner.subscriptionProducts,
  defaultProducts: state.partner.defaultProducts,
  title: state.partner.tempUser.salesPageTitle,
  subtitle: state.partner.tempUser.salesPageSubtitle,
  description: state.partner.tempUser.salesPageDescription,
  backgroundColor: state.partner.tempUser.salesPageBackgroundColor,
  fontColor: state.partner.tempUser.salesPageFontColor,
  boxColor: state.partner.tempUser.salesPageBoxColor,
  logoImage: state.partner.tempUser.salesPageLogoImage,
  backgroundImage: state.partner.tempUser.salesPageBackgroundImage,
  baseURL: state.admin.baseURL,
})

export default connect(mapStateToProps, { getTempUser, getSalesProducts, getPublishableKey })(Sales)