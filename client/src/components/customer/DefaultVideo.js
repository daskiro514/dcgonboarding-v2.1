import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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

const DefaultVideo = ({ match, baseURL }) => {
  const [video, setVideo] = React.useState('')
  const [title, setTitle] = React.useState('')

  React.useEffect(() => {
    const video = baseURL + 'default/' + defaultVideos[match.params.id] + '.mp4'
    setVideo(video)
    setTitle(defaultVideos[match.params.id])
  }, [match])

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
              {title}
            </p>
            <div className="w3-center">
              <video width="100%" height="100%" controls>
                <source src={video} type="video/mp4" />
              </video>
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
  baseURL: state.admin.baseURL,
})

export default connect(mapStateToProps, {})(DefaultVideo)