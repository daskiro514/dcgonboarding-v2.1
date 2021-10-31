import React from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import SunEditor, { buttonList } from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import Spinner from '../../layout/Spinner'
import Spaces from '../../layout/Spaces'
import { addNewReport, getReports, updateReport, deleteReport } from '../../../actions/admin'
import pdfIcon from '../../../img/admin/pdfIcon.png'

const MasterAdminReports = ({ addNewReport, getReports, updateReport, deleteReport, reports, baseURL, isUpdating }) => {
  React.useEffect(() => {
    getReports()
  }, [getReports])

  const [stateForCreate, setStateForCreate] = React.useState(false)
  const [stateForEdit, setStateForEdit] = React.useState(false)
  const [reportIdForEdit, setReportIdForEdit] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [editorValue, setEditorValue] = React.useState("")
  const [reportType, setReportType] = React.useState("text")
  const [thumbimage, setThumbImage] = React.useState(null)
  const [pdfFile, setPdfFile] = React.useState(null)

  const stateChange = stateFor => {
    allClear()
    if (stateFor === 'create') {
      setStateForEdit(false)
      setStateForCreate(true)
    } else {
      setStateForCreate(false)
      setStateForEdit(true)
      setReportIdForEdit(stateFor._id)
      setTitle(stateFor.title)
      setEditorValue(stateFor.content)
      setReportType(stateFor.type)
    }
  }

  const onSelectReportType = (item) => {
    if (item === "text") setPdfFile(null)
    else setEditorValue("")
    setReportType(item)
  }

  const onCreate = () => {
    let formData = new FormData()
    formData.append('thumbimage', thumbimage)
    formData.append('type', reportType)
    formData.append('title', title)
    if (reportType === "text") {
      formData.append('content', editorValue)
    } else {
      formData.append('pdf', pdfFile)
    }
    if (title && reportType && thumbimage && (editorValue.length > 12 || pdfFile)) {
      addNewReport(formData)
      setStateForCreate(false)
    } else {
      alert("Please Check the PDF or Report. You should choose Image for report.")
    }
  }

  const onUpdate = () => {
    let formData = new FormData()
    formData.append('updateID', reportIdForEdit)
    formData.append('thumbimage', thumbimage)
    formData.append('type', reportType)
    formData.append('title', title)
    if (reportType === "text") {
      formData.append('content', editorValue)
    } else {
      formData.append('pdf', pdfFile)
    }
    if (title && reportType) {
      updateReport(formData)
      setStateForEdit(false)
    } else {
      alert("Please Check the PDF or Report. You should choose Image for report.")
    }
  }

  const allClear = () => {
    setReportIdForEdit("")
    setTitle("")
    setEditorValue("")
    setReportType("text")
    setThumbImage(null)
    setPdfFile(null)
  }

  return (
    <div className="bg-panelMain row masterAdminReports">
      <div className="col-md-12">
        <div className="adminSales">
          <div className="row">
            <div className="col-md-12 ap-box">
              <h2 className='mb-2'>REPORTS</h2>
              <button onClick={() => stateChange('create')} >CREATE A REPORT</button>
              {stateForCreate ?
                <div>
                  <h3 className='w3-center mt-2'>CREATE A REPORT</h3>
                  <div className="report_option" style={{ marginLeft: "20px" }}>
                    <input type="radio" value="text" checked={reportType === "text"} onChange={() => onSelectReportType("text")} /><Spaces spaceLength={1} />
                    <label>Text</label><Spaces spaceLength={3} />
                    <input type="radio" value="pdf" checked={reportType === "pdf"} onChange={e => onSelectReportType("pdf")} /><Spaces spaceLength={1} />
                    <label>PDF</label>
                  </div>
                  <div className="w3-container">
                    <label>Title: </label><Spaces spaceLength={2} />
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    /><br />
                    {reportType === "text" ?
                      <SunEditor
                        value={editorValue}
                        setOptions={{
                          height: 100,
                          buttonList: buttonList.complex
                        }}
                        onChange={e => setEditorValue(e)}
                      />
                      :
                      <>
                        <label>Choose PDF File For Report</label>
                        <input
                          type="file"
                          onChange={e => setPdfFile(e.target.files[0])}
                          accept=".pdf"
                        />
                      </>
                    }
                    <label>Choose Thumb Image For Report</label>
                    <input
                      type="file"
                      onChange={e => setThumbImage(e.target.files[0])}
                      accept=".png, .jpg, .jpeg"
                    />
                    <br />
                    <button
                      className="w3-right"
                      onClick={() => setStateForCreate(false)}
                    >
                      <span className="glyphicon glyphicon-remove"><Spaces spaceLength={1} />CANCEL</span>
                    </button>
                    <button
                      className="w3-right"
                      onClick={() => onCreate()}
                    >
                      <span className="glyphicon glyphicon-ok"><Spaces spaceLength={1} />SUBMIT</span>
                    </button>
                    <br /><br />
                  </div>
                </div>
                :
                null
              }
              {stateForEdit ?
                <div>
                  <h3 className='w3-center mt-2'>EDIT A REPORT</h3>
                  <div className="report_option" style={{ marginLeft: "20px" }}>
                    <input type="radio" value="text" checked={reportType === "text"} onChange={() => onSelectReportType("text")} /><Spaces spaceLength={1} />
                    <label>Text</label><Spaces spaceLength={3} />
                    <input type="radio" value="pdf" checked={reportType === "pdf"} onChange={e => onSelectReportType("pdf")} /><Spaces spaceLength={1} />
                    <label>PDF</label>
                  </div>
                  <div className="w3-container">
                    <label>Title: </label><Spaces spaceLength={2} />
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    /><br />
                    {reportType === "text" ?
                      <SunEditor
                        value={editorValue}
                        setOptions={{
                          height: 100,
                          buttonList: buttonList.complex
                        }}
                        setContents={editorValue}
                        onChange={e => setEditorValue(e)}
                      />
                      :
                      <>
                        <label>Choose PDF File For Report</label>
                        <input
                          type="file"
                          onChange={e => setPdfFile(e.target.files[0])}
                          accept=".pdf"
                        />
                      </>
                    }
                    <label>Choose Thumb Image For Report</label>
                    <input
                      type="file"
                      onChange={e => setThumbImage(e.target.files[0])}
                      accept=".png, .jpg, .jpeg"
                    />
                    <br />
                    <button
                      className="w3-right"
                      onClick={() => setStateForEdit(false)}
                    >
                      <span className="glyphicon glyphicon-remove"><Spaces spaceLength={1} />CANCEL</span>
                    </button>
                    <button
                      className="w3-right"
                      onClick={() => onUpdate()}
                    >
                      <span className="glyphicon glyphicon-ok"><Spaces spaceLength={1} />UPDATE</span>
                    </button>
                    <br /><br />
                  </div>
                </div>
                :
                null
              }
            </div>
          </div>
        </div>
        <div className="adminSales" style={{ marginBottom: "20px" }}>
          <div className="row">
            <div className="col-md-12 ap-box">
              {isUpdating
                ?
                <Spinner />
                :
                <div className='table-responsive'>
                  <table className="w3-table w3-bordered w3-hoverable">
                    <thead>
                      <tr>
                        <th>NO</th>
                        <th>THUMBNAIL</th>
                        <th>TITLE</th>
                        <th>CONTENT</th>
                        <th>DATE</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {reports.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td><img src={baseURL + item.thumbimage} alt="THUMB" width="70px" height="70px" /></td>
                          <td><p style={{ width: '100px' }}>{item.title}</p></td>
                          <td>
                            {item.type === 'text' ?
                              <p style={{ width: '300px' }} dangerouslySetInnerHTML={{ __html: item.content }}></p>
                              :
                              <a href={baseURL + item.pdf}>
                                <img src={pdfIcon} alt="PDF" width="50px" height="50px" />
                                <Spaces spaceLength={2} />
                                {item.pdf}
                              </a>
                            }
                          </td>
                          <td><p style={{ width: '100px' }}><Moment format="MM/DD/YYYY HH:mm:ss">{item.date}</Moment></p></td>
                          <td>
                            <button onClick={() => stateChange(item)}><span className="glyphicon glyphicon-erase"></span></button>
                            <Spaces spaceLength={1} />
                            <button
                              onClick={() => {
                                let deleteAnswer = window.confirm("Are you sure?")
                                if (deleteAnswer) deleteReport(item._id)
                              }}
                            >
                              <span className="glyphicon glyphicon-trash"></span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              }
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  reports: state.admin.reports,
  baseURL: state.admin.baseURL,
  isUpdating: state.admin.isReportsUpdating
})

export default connect(mapStateToProps, { addNewReport, getReports, updateReport, deleteReport })(MasterAdminReports)