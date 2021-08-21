import React from 'react'
import { connect } from 'react-redux'
import { getReportByID } from '../../actions/admin'
import { Link } from 'react-router-dom'
import pdfIcon from '../../img/admin/pdfIcon.png'
import Spaces from '../layout/Spaces'

const ReportArticle = ({ baseURL, match, getReportByID, report }) => {
  React.useEffect(() => {
    getReportByID(match.params.id)
  }, [match.params.id, getReportByID])

  return (
    <div className="bg-article" style={{ backgroundColor: 'black' }}>
      <br /><br />
      <div className="container">
        <div className="row">
          <div>
            <Link to="/coursereports" className="btn w3-white">BACK</Link>
          </div>
          <h1 className='w3-center text-center'>{report.title}</h1>
          <br /><br />
          <div className="col-md-5">
            <img src={baseURL + report.thumbimage} alt="REPORT" width='100%' className="img-responsive" />
          </div>
          <div className="col-md-7">
            {report.type === "text"
              ?
              <div className="justify" dangerouslySetInnerHTML={{ __html: report.content }}></div>
              :
              <div className="justify">
                <img src={pdfIcon} alt="lalala" className="img-responsive" width="30px" />
                <Spaces spaceLength={2} />
                <span>{report.pdf}</span><br /><br />
                <a href={baseURL + report.pdf} className="w3-btn w3-blue">Download</a>
              </div>
            }
          </div>
        </div>
        <br /><br /><br />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  baseURL: state.admin.baseURL,
  report: state.admin.reportByID
})

export default connect(mapStateToProps, { getReportByID })(ReportArticle)