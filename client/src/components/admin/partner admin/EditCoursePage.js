import React from 'react'
import { connect } from 'react-redux'
import ColorSelector from 'react-color-selector'
import defaultLogo from '../../../img/course/cellphone.jpg'
import Spaces from '../../layout/Spaces'
import Spinner from '../../layout/Spinner'
import { defaultCoursePage, updateCoursePage } from '../../../actions/partner'

const EditCoursePage = ({ defaultCoursePage, updateCoursePage, user, isLoading, partnerID, baseURL }) => {
  const pickerData = {
    col: 48,
    row: 48,
    width: 270,
    height: 150,
    view: 'both',
    theme: 'dark',
    title: 'COLORS',
    cellControl: 4
  }
  const [coursePageLogoImage, setCoursePageLogoImage] = React.useState(null)
  const [coursePageDescription, setCoursePageDescription] = React.useState("Welcome to the onboarding course. The goal of this course is to get you caught up to speed on everything you need to know to get started!")
  const [coursePageBackgroundColor, setCoursePageBackgroundColor] = React.useState("#000000")
  const [coursePageFontColor, setCoursePageFontColor] = React.useState("white")
  const [coursePageBackgroundImage, setCoursePageBackgroundImage] = React.useState(null)
  const [logoImageURL, setLogoImageURL] = React.useState("")
  const [backgroundImageURL, setBackgroundImageURL] = React.useState("")

  const onDefault = () => {
    let answer = window.confirm("Are you sure to make your sales page default?")
    if (answer) {
      defaultCoursePage(partnerID)
    }
  }

  const onUpdate = () => {
    let formData = new FormData()
    formData.append('partnerID', partnerID)
    formData.append('coursePageLogoImage', coursePageLogoImage)
    formData.append('coursePageDescription', coursePageDescription)
    formData.append('coursePageBackgroundColor', coursePageBackgroundColor)
    formData.append('coursePageFontColor', coursePageFontColor)
    formData.append('coursePageBackgroundImage', coursePageBackgroundImage)
    if (coursePageDescription) {
      updateCoursePage(formData)
    } else {
      alert("You should input the description at least.")
    }
  }

  React.useEffect(() => {
    setLogoImageURL(user.coursePageLogoImage ? baseURL + user.coursePageLogoImage : null)
    setCoursePageDescription(user.coursePageDescription ? user.coursePageDescription : "Welcome to the onboarding course. The goal of this course is to get you caught up to speed on everything you need to know to get started!")
    setCoursePageBackgroundColor(user.coursePageBackgroundColor ? user.coursePageBackgroundColor : "#000000")
    setCoursePageFontColor(user.coursePageFontColor ? user.coursePageFontColor : 'white')
    setBackgroundImageURL(user.coursePageBackgroundImage ? baseURL + user.coursePageBackgroundImage : null)
  }, [user, baseURL])

  return (
    <div className="col-md-10 bg-panel">
      <div className="bg-panelMain row">
        <div className="col-md-6">
          <div className="adminSales preview" style={{ background: coursePageBackgroundColor ? coursePageBackgroundColor : 'black', color: coursePageFontColor ? coursePageFontColor : 'white' }}>
            <div style={{ background: `url(${backgroundImageURL}) no-repeat center center/cover` }}>
              <div className="row">
                <div className="col-md-6">
                  <h4>COURSES</h4>
                  <div className="col-md-12 w3-center">
                    <img src={logoImageURL ? logoImageURL : defaultLogo} alt="lalala" style={{ width: 'inherit' }} />
                    <p className="justify" style={{ fontSize: '10px' }}>
                      {coursePageDescription}
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <img src={defaultLogo} alt="COURSE" className="img-responsive" />
                      <p className="w3-center" style={{ fontSize: '10px' }}>
                        TEST
                      </p>
                    </div>
                    <div className="col-md-3">
                      <img src={defaultLogo} alt="COURSE" className="img-responsive" />
                      <p className="w3-center" style={{ fontSize: '10px' }}>
                        TEST
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <h4>REPORTS</h4>
                  <div className="row">
                    <div className="col-md-3">
                      <img src={defaultLogo} alt="COURSE" className="img-responsive" />
                      <p className="w3-center" style={{ fontSize: '10px' }}>
                        TEST
                      </p>
                    </div>
                    <div className="col-md-3">
                      <img src={defaultLogo} alt="COURSE" className="img-responsive" />
                      <p className="w3-center" style={{ fontSize: '10px' }}>
                        TEST
                      </p>
                    </div>
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
                  <h2>EDIT COURSE PAGE</h2>
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
                              setCoursePageLogoImage(e.target.files[0])
                              setLogoImageURL(event.target.result)
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                        accept=".png, .jpg, .jpeg"
                      />
                      <img src={logoImageURL ? logoImageURL : defaultLogo} alt="UPLOAD" style={{ width: '40%' }} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label>DESCRIPTION: </label>
                    </div>
                    <div className="col-md-8">
                      <textarea
                        value={coursePageDescription}
                        rows={3}
                        style={{ minWidth: "300px" }}
                        onChange={e => setCoursePageDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label>BACKGROUND COLOR:</label>
                      <div style={{ padding: "0px 20px" }}>
                        <span>{coursePageBackgroundColor}</span>
                        <div style={{ width: "100%", height: "20px", backgroundColor: coursePageBackgroundColor }}></div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <ColorSelector pallet={pickerData} color={coursePageBackgroundColor} selectedColor={setCoursePageBackgroundColor} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label>FONT COLOR:</label>
                    </div>
                    <div className="col-md-8">
                      <select
                        style={{ minWidth: "300px", height: "30px" }}
                        onChange={e => setCoursePageFontColor(e.target.value)}
                        value={coursePageFontColor}
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
                    <div className="col-md-4">
                      <label>BACKGROUND IMAGE:</label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="file"
                        onChange={e => {
                          let reader = new FileReader();
                          if (e.target.files.length) {
                            reader.onload = (event) => {
                              setCoursePageBackgroundImage(e.target.files[0])
                              setBackgroundImageURL(event.target.result)
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                        accept=".png, .jpg, .jpeg"
                      />
                      {backgroundImageURL ? <img src={backgroundImageURL} alt="UPLOAD" style={{ width: '40%' }} /> : null}
                    </div>
                  </div>
                  <br />
                  <button className="w3-right" onClick={() => onDefault()}><span className="glyphicon glyphicon-refresh"><Spaces spaceLength={1} />DEFAULT</span></button>
                  <Spaces spaceLength={1} className="w3-right" />
                  <button className="w3-right" onClick={() => onUpdate()}><span className="glyphicon glyphicon-ok"><Spaces spaceLength={1} />UPDATE</span></button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  partnerID: state.auth.user._id,
  isLoading: state.partner.editPageIsLoading,
  baseURL: state.admin.baseURL,
})

export default connect(mapStateToProps, { defaultCoursePage, updateCoursePage })(EditCoursePage)