import React from 'react'
import { connect } from 'react-redux'
import ColorSelector from 'react-color-selector'
import Spinner from '../../layout/Spinner'
import Spaces from '../../layout/Spaces'
import { updateSalesPage, defaultSalesPage } from '../../../actions/partner'
import defaultLogo from '../../../img/sales/sales-logo.png'
import salesBundle from '../../../img/sales/sales-bundle.png'
import defaultBackground from '../../../img/sales/sales-bg.png'

const EditSalesPage = ({ user, isLoading, updateSalesPage, defaultSalesPage, partnerID, baseURL }) => {
  const pickerData = {
    col: 48,
    row: 48,
    width: 200,
    height: 150,
    view: 'both',
    theme: 'dark',
    title: 'COLORS',
    cellControl: 4
  }
  const [salesPageLogoImage, setSalesPageLogoImage] = React.useState(null)
  const [salesPageTitle, setSalesPageTitle] = React.useState("Welcome To The Sales Page")
  const [salesPageSubtitle, setSalsePageSubtitle] = React.useState('Hosted By DCG and TEAM')
  const [salesPageDescription, setSalesPageDescription] = React.useState("Lorem ipsum dolor sit amet, consectueture adipiscing elit, sed diam nonummy nibg euismod tinicidiunt ut laroreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim venaim, quis nostrud exercitation aullamcorper suscipt laotrertis nisl ut alliqiuip ex ea commaod consequat. Duils autem ve eum iriure")
  const [salesPageBackgroundColor, setSalesPageBackgroundColor] = React.useState("#000000")
  const [salesPageFontColor, setSalesPageFontColor] = React.useState("white")
  const [salesPageBoxColor, setSalesPageBoxColor] = React.useState("#ebc27e")
  const [salesPageBackgroundImage, setSalesPageBackgroundImage] = React.useState(null)
  const [logoImageURL, setLogoImageURL] = React.useState("")
  const [backgroundImageURL, setBackgroundImageURL] = React.useState("")

  const onUpdate = () => {
    let formData = new FormData()
    formData.append('partnerID', partnerID)
    formData.append('salesPageLogoImage', salesPageLogoImage)
    formData.append('salesPageTitle', salesPageTitle)
    formData.append('salesPageSubtitle', salesPageSubtitle)
    formData.append('salesPageDescription', salesPageDescription)
    formData.append('salesPageBackgroundColor', salesPageBackgroundColor)
    formData.append('salesPageFontColor', salesPageFontColor)
    formData.append('salesPageBoxColor', salesPageBoxColor)
    formData.append('salesPageBackgroundImage', salesPageBackgroundImage)
    if (salesPageTitle && salesPageDescription) {
      updateSalesPage(formData)
    } else {
      alert("You should input the title and the description at least.")
    }
  }

  const onDefault = () => {
    let answer = window.confirm("Are you sure to make your sales page default?")
    if (answer) {
      defaultSalesPage(partnerID)
    }
  }

  React.useEffect(() => {
    setLogoImageURL(user.salesPageLogoImage ? baseURL + user.salesPageLogoImage : null)
    setSalesPageTitle(user.salesPageTitle ? user.salesPageTitle : "Welcome To The Sales Page")
    setSalsePageSubtitle(user.salesPageSubtitle ? user.salesPageSubtitle : "Hosted By DCG and TEAM")
    setSalesPageDescription(user.salesPageDescription ? user.salesPageDescription : "Lorem ipsum dolor sit amet, consectueture adipiscing elit, sed diam nonummy nibg euismod tinicidiunt ut laroreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim venaim, quis nostrud exercitation aullamcorper suscipt laotrertis nisl ut alliqiuip ex ea commaod consequat. Duils autem ve eum iriure")
    setSalesPageBackgroundColor(user.salesPageBackgroundColor ? user.salesPageBackgroundColor : "#000000")
    setSalesPageFontColor(user.salesPageFontColor ? user.salesPageFontColor : 'white')
    setSalesPageBoxColor(user.salesPageBoxColor ? user.salesPageBoxColor : "#ebc27e")
    setBackgroundImageURL(user.salesPageBackgroundImage ? baseURL + user.salesPageBackgroundImage : null)
  }, [user, baseURL])

  return (
    <div className="bg-panelMain row">
      <div className="col-md-6">
        <div className="adminSales preview" style={{ background: salesPageBackgroundColor ? salesPageBackgroundColor : 'black', color: salesPageFontColor ? salesPageFontColor : 'white' }}>
          <div style={{ background: `url(${backgroundImageURL ? backgroundImageURL : defaultBackground}) no-repeat center center/cover` }}>
            <div className="row">
              <div className="col-sm-5 w3-center">
                <img src={logoImageURL ? logoImageURL : defaultLogo} alt="LOGO" style={{ width: 'inherit' }} />
                <h4 className="w3-center">{salesPageTitle ? salesPageTitle : "Welcome To The Sales Page"}</h4>
                <h6 className="w3-center">{salesPageSubtitle ? salesPageSubtitle : "Hosted By DCG and TEAM"}</h6>
                <p className="w3-justify" style={{ fontSize: '10px' }}>
                  {salesPageDescription}
                </p>
              </div>
              <div className="col-sm-7">
                <img src={salesBundle} alt="LOGO" className="img-responsive" />
                <br />
                <div className="col-sm-11 w3-right">
                  <div className="goldBox row w3-center" style={{ backgroundColor: salesPageBoxColor ? salesPageBoxColor : "#ebc27e" }}>
                    <h6>Product Name</h6>
                    <h6>Product Description</h6>
                    <h6>Product Price</h6>
                  </div>
                  <br />
                  <div className="goldBox row w3-center" style={{ backgroundColor: salesPageBoxColor ? salesPageBoxColor : "#ebc27e" }}>
                    <h6>Product Name</h6>
                    <h6>Product Description</h6>
                    <h6>Product Price</h6>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading
        ?
        <Spinner />
        :
        <div className="col-md-6">
          <div className="adminSales">
            <div className="row">
              <div className="col-md-12 ap-box editpage">
                <h2>EDIT SALES PAGE</h2>
                <div className="row">
                  <div className="col-md-4">
                    <label>LOGO IMAGE:</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="file"
                      onChange={e => {
                        let reader = new FileReader();
                        if (e.target.files.length) {
                          reader.onload = (event) => {
                            setSalesPageLogoImage(e.target.files[0])
                            setLogoImageURL(event.target.result)
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      accept=".png, .jpg, .jpeg"
                    />
                    <br/>
                    <div className='w3-center'>
                      <img src={logoImageURL ? logoImageURL : defaultLogo} alt="UPLOAD" style={{ width: '40%' }} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label>TITLE: </label>
                  </div>
                  <div className="col-sm-8">
                    <input
                      value={salesPageTitle}
                      style={{ minWidth: "100%" }}
                      onChange={e => setSalesPageTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label>SUBTITLE: </label>
                  </div>
                  <div className="col-sm-8">
                    <input
                      value={salesPageSubtitle}
                      style={{ minWidth: "100%" }}
                      onChange={e => setSalsePageSubtitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label>DESCRIPTION: </label>
                  </div>
                  <div className="col-sm-8">
                    <textarea
                      value={salesPageDescription}
                      rows={3}
                      style={{ minWidth: "100%" }}
                      onChange={e => setSalesPageDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label>BACKGROUND COLOR:</label>
                    <div style={{ padding: "0px 20px" }}>
                      <span>{salesPageBackgroundColor}</span>
                      <div style={{ width: "100%", height: "20px", backgroundColor: salesPageBackgroundColor }}></div>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <ColorSelector pallet={pickerData} color={salesPageBackgroundColor} selectedColor={setSalesPageBackgroundColor} />
                  </div>
                  <div>
                    I love you
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label>FONT COLOR:</label>
                  </div>
                  <div className="col-sm-8">
                    <select
                      style={{ minWidth: "100%", height: "30px" }}
                      onChange={e => setSalesPageFontColor(e.target.value)}
                      value={salesPageFontColor}
                    >
                      <option value="black">BLACK</option>
                      <option value="white">WHITE</option>
                      <option value="blue">BLUE</option>
                      <option value="yellow">YELLOW</option>
                      <option value="orange">ORANGE</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label>BOX COLOR:</label>
                    <div style={{ padding: "0px 20px" }}>
                      <span>{salesPageBoxColor}</span>
                      <div style={{ width: "100%", height: "20px", backgroundColor: salesPageBoxColor }}></div>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <ColorSelector pallet={pickerData} selectedColor={setSalesPageBoxColor} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label>BACKGROUND IMAGE:</label>
                  </div>
                  <div className="col-sm-8">
                    <input
                      type="file"
                      onChange={e => {
                        let reader = new FileReader();
                        if (e.target.files.length) {
                          reader.onload = (event) => {
                            setSalesPageBackgroundImage(e.target.files[0])
                            setBackgroundImageURL(event.target.result)
                          };
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                      accept=".png, .jpg, .jpeg"
                    />
                    <br/>
                    <div className='w3-center'>
                      <img src={backgroundImageURL ? backgroundImageURL : defaultBackground} alt="UPLOAD" style={{ width: '40%' }} />
                    </div>
                    <br/>
                  </div>
                </div>
                <button className="w3-right" onClick={() => onDefault()}><span className="glyphicon glyphicon-refresh"><Spaces spaceLength={1} />DEFAULT</span></button>
                <Spaces spaceLength={1} className="w3-right" />
                <button className="w3-right" onClick={() => onUpdate()}><span className="glyphicon glyphicon-ok"><Spaces spaceLength={1} />UPDATE</span></button>
              </div>
            </div>
          </div>
          <br />
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  partnerID: state.auth.user._id,
  isLoading: state.partner.editPageIsLoading,
  baseURL: state.admin.baseURL,
})

export default connect(mapStateToProps, { updateSalesPage, defaultSalesPage })(EditSalesPage)