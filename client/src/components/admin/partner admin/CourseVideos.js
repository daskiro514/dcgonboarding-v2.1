import React from 'react'
import { connect } from 'react-redux'
import { getCourses, addNewCourse, updateCourse, deleteCourse } from '../../../actions/partner'
import Spaces from '../../layout/Spaces'

const CourseVideos = ({ courses, getCourses, addNewCourse, updateCourse, deleteCourse, partner, baseURL }) => {
  React.useEffect(() => {
    getCourses(partner)
  }, [getCourses, partner])

  const [stateForCreate, setStateForCreate] = React.useState(false)
  const [stateForEdit, setStateForEdit] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [videoID, setVideoID] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [thumbImage, setThumbImage] = React.useState(null)
  const [courseIdForEdit, setCourseIdForEdit] = React.useState("")

  const stateChange = stateFor => {
    allClear()
    if (stateFor === 'create') {
      setStateForEdit(false)
      setStateForCreate(true)
    } else {
      setStateForCreate(false)
      setStateForEdit(true)
      setCourseIdForEdit(stateFor._id)
      setTitle(stateFor.title)
      setDescription(stateFor.description)
      setVideoID(stateFor.videoID)
    }
  }

  const onCreate = () => {
    let formData = new FormData()
    formData.append('title', title)
    formData.append('videoID', videoID)
    formData.append('description', description)
    formData.append('thumbImage', thumbImage)
    formData.append('partner', partner)
    if (title && videoID && description && thumbImage) {
      addNewCourse(formData)
      setStateForCreate(false)
    } else {
      alert('Please fill in the inputs below.')
    }
  }

  const onUpdate = () => {
    let formData = new FormData()
    formData.append('updateID', courseIdForEdit)
    formData.append('title', title)
    formData.append('videoID', videoID)
    formData.append('description', description)
    formData.append('thumbImage', thumbImage)
    formData.append('partner', partner)
    if (title && videoID && description) {
      updateCourse(formData, partner)
      setStateForEdit(false)
    } else {
      alert('Please fill in the inputs below.')
    }
  }

  const allClear = () => {
    setTitle("")
    setDescription("")
    setVideoID("")
    setThumbImage(null)
  }

  return (
    <div className="bg-panel coursevideos">
      <div className="bg-panelMain row">
        <div className="col-md-12">
          <div className="adminSales">
            <div className="row">
              <div className="col-md-12 ap-box">
                <h2>Course Videos</h2>
                <br />
                <button onClick={() => stateChange('create')} >CREATE A COURSE</button>
                {stateForCreate
                  ?
                  <div className="w3-container">
                    <h3>ADD NEW COURSE VIDEO</h3>
                    <label>TITLE: </label>
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    /><br />
                    <label>VIMEO VIDEO ID: </label>
                    <input
                      value={videoID}
                      onChange={e => setVideoID(e.target.value)}
                    /><br />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label>DESCRIPTION: </label>
                      <textarea
                        value={description}
                        rows={4}
                        onChange={e => setDescription(e.target.value)}
                      /><br />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ display: "flex" }}>
                        <label>IMAGE:</label>
                        <input
                          type="file"
                          onChange={e => setThumbImage(e.target.files[0])}
                          accept=".png, .jpg, .jpeg"
                        />
                      </div>
                    </div>
                    <button
                      className="w3-right"
                      onClick={() => setStateForCreate(false)}
                      style={{ marginLeft: '10px' }}
                    >
                      <span className="glyphicon glyphicon-remove"><Spaces spaceLength={1} />CANCEL</span>
                    </button>
                    <button
                      className="w3-right"
                      onClick={() => onCreate()}
                    >
                      <span className="glyphicon glyphicon-ok"><Spaces spaceLength={1} />SUBMIT</span>
                    </button>
                  </div>
                  :
                  null
                }
                {stateForEdit
                  ?
                  <div className="w3-container">
                    <h3>EDIT COURSE VIDEO</h3>
                    <label>TITLE: </label>
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    /><br />
                    <label>VIMEO VIDEO ID: </label>
                    <input
                      value={videoID}
                      onChange={e => setVideoID(e.target.value)}
                    /><br />
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label>DESCRIPTION: </label>
                      <textarea
                        value={description}
                        rows={4}
                        onChange={e => setDescription(e.target.value)}
                      /><br />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ display: "flex" }}>
                        <label>IMAGE:</label>
                        <input
                          type="file"
                          onChange={e => setThumbImage(e.target.files[0])}
                          accept=".png, .jpg, .jpeg"
                        />
                      </div>
                    </div>
                    <button
                      className="w3-right"
                      onClick={() => setStateForEdit(false)}
                      style={{ marginLeft: '10px' }}
                    >
                      <span className="glyphicon glyphicon-remove"><Spaces spaceLength={1} />CANCEL</span>
                    </button>
                    <button
                      className="w3-right"
                      onClick={() => onUpdate()}
                    >
                      <span className="glyphicon glyphicon-ok"><Spaces spaceLength={1} />SUBMIT</span>
                    </button>
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
                <div className='table-responsive'>
                  <table className="w3-table w3-bordered w3-hoverable">
                    <thead>
                      <tr>
                        <th>NO</th>
                        <th>TITLE</th>
                        <th>THUMB IMAGE</th>
                        <th>DESCRIPTION</th>
                        <th>VIMEO VIDEO ID</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td>
                            <img src={baseURL + item.thumbImage} alt="THUMBIMAGE" width="50px" height="50px" />
                          </td>
                          <td>{item.description}</td>
                          <td>{item.videoID}</td>
                          <td>
                            <button onClick={() => stateChange(item)}><span className="glyphicon glyphicon-pencil"></span></button>
                            <Spaces spaceLength={1} />
                            <button
                              onClick={() => {
                                let deleteAnswer = window.confirm("Are you sure?")
                                if (deleteAnswer) deleteCourse(item._id, partner)
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  courses: state.partner.partnerCourses,
  partner: state.auth.user._id,
  baseURL: state.admin.baseURL
})

export default connect(mapStateToProps, { getCourses, addNewCourse, updateCourse, deleteCourse })(CourseVideos)