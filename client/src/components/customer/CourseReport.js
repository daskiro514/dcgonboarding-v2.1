import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getReports } from '../../actions/admin'
import { getCourses } from '../../actions/partner'
import logoImage from '../../img/course/logo2.png'

const defaultVideos = [
  'Class 1 Bootcamp 10 Welcome TeailaK',
  'Class 2 Bootcamp 7 Coinbase Binance Kucoin Day Checklist TeailaK',
  'Class 2a Bootcamp 10 Coinbase TeailaK',
  'Class 3 Bootcamp 5 Trading Plan & Q&A TeailaK',
  'Class 4 Bootcamp 9 Trust Wallet & Uniswap TeailaK',
  'Class 5 Bootcamp 4 Alligator Strategy TeailaK',
  'Class 6 Bootcamp 7 DCG Mastermind Report TeailaK',
  'Class 8 NFT DCG Class - Feb 2021',
  'Start up - Dcg Organization & New Member Start Up',
]

const CourseReport = ({ baseURL, seller, getReports, getCourses, reports, courses }) => {
  React.useEffect(() => {
    getReports()
    getCourses(seller)
  }, [getReports, getCourses, seller])

  return (
    <div className="bg-report">
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/home" className="btn w3-white">BACK</Link>
          </div>
          <br />
          <div className="col-md-5">
            <h1>COURSES</h1>
            <br />
            <div className="report-below-courses">
              <img src={logoImage} alt="lalala" className="img-responsive" />
              <p className="justify">
                Welcome to the onboarding course. The goal of this course is to get you caught up to speed on everything you need to know to get started!
              </p>
            </div>
            <div className="row">
              {defaultVideos.map((item, index) =>
                <Link key={index} className="w3-quarter w3-center" to={"/defaultvideo/" + index}>
                  <div>
                    <img src={baseURL + 'default/' + item + '.JPG'} alt="COURSE" width="100px" height="80px" />
                  </div>
                  <p style={{
                    margin: "5px 10px",
                    maxHeight: '65px',
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>{item}</p>
                </Link>
              )}
            </div>
            <div className="row" style={{marginTop: '40px'}}>
              {courses.map((item, index) =>
                <Link key={index} className="w3-quarter w3-center" to={"/video/" + item._id}>
                  <div>
                    <img src={baseURL + item.thumbImage} alt="COURSE" width="100px" height="80px" />
                  </div>
                  <p style={{
                    margin: "5px 10px",
                    // whiteSpace: "nowrap",
                    maxHeight: '65px',
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>{item.title}</p>
                </Link>
              )}
            </div>
          </div>
          <div className="col-md-2">

          </div>
          <div className="col-md-5">
            <h1>
              REPORTS
            </h1>
            <div className="w3-row under-report">
              {reports.map((item, index) =>
                <Link key={index} className="w3-quarter w3-center" to={"/report/" + item._id}>
                  <div>
                    <img src={baseURL + item.thumbimage} alt="REPORT" width="100px" height="80px" />
                  </div>
                  <p style={{ 
                    margin: "5px 10px", 
                    // whiteSpace: "nowrap", 
                    maxHeight: '65px',
                    overflow: "hidden", 
                    textOverflow: "ellipsis" }}>{item.title}</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  )
}

const mapStateToProps = state => ({
  reports: state.admin.reports,
  baseURL: state.admin.baseURL,
  seller: state.auth.user.seller,
  courses: state.partner.partnerCourses
})

export default connect(mapStateToProps, { getReports, getCourses })(CourseReport)