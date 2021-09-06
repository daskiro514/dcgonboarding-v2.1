import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Vimeo from '@u-wave/react-vimeo'
import { getCourseByID } from '../../actions/partner'

const Video = ({ course, match, getCourseByID }) => {
  React.useEffect(() => {
    getCourseByID(match.params.id)
  }, [match.params.id, getCourseByID])

  return (
    <div className="bg-video">
      <br /><br />
      <div className="container">
        <div className=" row">
          <div className="col-md-12">
            <Link to="/coursereports" className="btn w3-white">
              BACK
            </Link>
          </div>
          <br />
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <p className="text-center">
              {course.title}
            </p>
            <div className="w3-center">
              <Vimeo
                video={course.videoID ? course.videoID : "180265904"}
                autoplay
                responsive={true}
              />
            </div>
            <br /><br />
            <div className="justify video-para w3-center">
              {course.description}
            </div>
            <br /><br />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  course: state.partner.customerCourse
})

export default connect(mapStateToProps, { getCourseByID })(Video)