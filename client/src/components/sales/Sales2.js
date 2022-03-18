import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTempUser, getSalesProducts, getPublishableKey } from '../../actions/partner'
import sales2Logo from '../../img/sales2/sales2-logo.png'
import sales2Sign from '../../img/sales2/sales2-sign.png'
import sales2BG from '../../img/sales2/sales2-bg.jpg'
import sales2Photo from '../../img/sales2/sales2-photo.jpeg'
import sales2Discord from '../../img/sales2/sales2-discord.png'
import sales2Slack from '../../img/sales2/sales2-slack.png'
import sales2Zoom from '../../img/sales2/sales2-zoom.png'
import sales2Facebook from '../../img/sales2/sales2-facebook.png'
import sales2Arrows from '../../img/sales2/sales2-arrows.png'
import sales2MiniPhoto from '../../img/sales2/sales2-miniphoto.png'

const Sales2 = ({ match, getTempUser, getSalesProducts, getPublishableKey, defaultProducts }) => {
  const userID = match.params.id
  const [mastermindProduct, setMastermindProduct] = React.useState({})

  React.useEffect(() => {
    getTempUser(userID)
    getSalesProducts(userID)
    getPublishableKey()
  }, [getTempUser, getSalesProducts, getPublishableKey, userID])

  React.useEffect(() => {
    if (defaultProducts.length) {
      const mastermindProduct = defaultProducts.find(element => element.name === 'Master Mind Package' || element.price === 49700)
      setMastermindProduct(mastermindProduct)
    }
  }, [defaultProducts])


  return (
    <div className='container-fluid sales2'>
      <div className='row'>
        <div className='w3-center'>
          <br /><br />
          <Link to='/home'>
            <img src={sales2Logo} alt='LOGO' width='300px' />
          </Link>
        </div>
        <div className='w3-center'>
          <br />
          <div className='text-uppercase'>
            <h2>do you want to start</h2>
          </div>
          <div className='text-uppercase' style={{ fontSize: '72px', color: '#ff7902' }}>
            trading like a pro?
          </div>
        </div>
        <br />
        <div className='container'>
          <div className='row'>
            <div className='col-sm-7 col-md-7'>
              <div className="video-responsive" style={{ boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.5)' }}>
                <iframe
                  width="100%"
                  src='https://www.youtube.com/embed/62Xj5WXShpM'
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <br />
            </div>
            <div className='col-sm-5 col-md-5'>
              <div className='text-uppercase w3-center'>
                <h2>learn and get full</h2>
                <div style={{ margin: '15px 0px' }}>
                  <h2>access to the</h2>
                  <h2>alligator trading</h2>
                  <h2>stragety for</h2>
                </div>
                <div>
                  <h1>day traders</h1>
                  <h1>and</h1>
                  <h1>swing traders</h1>
                </div>
              </div>
              <br />
              <div className='w3-center'>
                The Trading Mastermind - where entrepreneurs master Stocks, Options, Forex, and Crypto! When you join DCG Mastermind, you get access to over 6, 7 and 8 figure traders' insights and expertise.
              </div>
            </div>
          </div>
          <br />
          <div className='giveButton' style={{
            backgroundColor: '#ff7902',
            fontWeight: 'bold',
            padding: '15px 0px 15px',
            margin: 'auto',
            marginBottom: '10px',
            textAlign: 'center',
            width: '50%',
          }}>
            <Link to={`/checkoutsub2/${mastermindProduct._id}`} style={{
              textDecoration: 'none',
              color: 'white'
            }}>
              <span style={{ fontSize: '24px' }}>GIVE ME ACCESS TO MASTERMIND</span>
            </Link>
          </div>
        </div>
      </div>

      <div className='row' style={{ backgroundColor: 'black', color: 'white', marginTop: '30px' }}>
        <div className='text-uppercase w3-center' style={{ padding: '50px 0px 30px' }}>
          <h1>what will you get!</h1>
        </div>
        <div className='container blackParts'>
          <div className='row'>
            <ul>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Learn from the Masterminds</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>All DCG Classes are LIVE - taught by Traders who actually trade</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Learn Day Trading and Swing Trading strategies without sitting in front of charts all day</li>
              <li>
                <span className='glyphicon glyphicon-ok-sign'></span>
                Many Traders find success within 30 days - the DCG culture is to provide help for those who do not have time to spend months watching videos
              </li>
              <li>
                <span className='glyphicon glyphicon-ok-sign'></span>
                When you join DCG, you get access to these types of live courses:
                <ul>
                  <li><i className='fa fa-dot-circle-o mr-1'></i>Business as a Trader - Structuring Your Business to Minimize Taxes</li>
                  <li><i className='fa fa-dot-circle-o mr-1'></i>How to Leverage Other Traders to Generate Profits</li>
                  <li><i className='fa fa-dot-circle-o mr-1'></i>No Charts - The Ability to Make Money in Trading Without Charts</li>
                </ul>
              </li>
              <li>
                <span className='glyphicon glyphicon-ok-sign'></span>
                You'll also receive:
                <ul>
                  <li><i className='fa fa-dot-circle-o mr-1'></i>Our Masterclass on NFTs and Mindset Training for Traders and Entrepreneurs</li>
                  <li><i className='fa fa-dot-circle-o mr-1'></i>Education on how to make money in crypto with digital assets</li>
                  <li><i className='fa fa-dot-circle-o mr-1'></i>How to make 6 and 7 figure income with Land, Digital Art, and Gaming NFTs</li>
                  <li><i className='fa fa-dot-circle-o mr-1'></i>Our proven Time Management Formula helping you manage more in less time</li>
                  <li><i className='fa fa-dot-circle-o mr-1'></i>All DCG Strategies</li>
                  <li><i className='fa fa-dot-circle-o mr-1'></i>And Our monthly Mastermind Oracle Trading Report ($197 value)</li>
                </ul>
              </li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Do You Know How To Leverage Other Traders To Generate Profits?</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>You will have access to our No Chart Course - The Ability To Make Money In Trading Without Charts.</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Get access to our Masterclass On NFT's.</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Learn How To Making Money in Crypto With Digital Assets.</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Make 6 and 7 Figures With Virtual Land, Digital Art, Gaming NFT's.</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Access To Our Time Management Formula - Manage More In Less Time.</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Our Mastermind Course Include Mindset Training For Traders and Entrepreneurs.</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Our Discord Server has 24/7 full chat support and signals</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>We are totally transparent; you will know when we trade and what we are trading</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Get Access To All The Strategies.</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>The No Chart Trading Strategy.</li>
              <li><span className='glyphicon glyphicon-ok-sign'></span>Also, get a copy of our Mastermind Oracle Trading Report.</li>
            </ul>
          </div>
          <div className='row'>
            <img src={sales2Sign} alt='SIGN' width='auto' className='img-responsive' height='auto' style={{
              marginLeft: 'auto',
              marginRight: 'auto'
            }} />
          </div>
        </div>
      </div>

      <div className='row' style={{ backgroundColor: '#eee', height: '80px', width: '100%' }}></div>

      <div className='row'>
        <div className='container'>
          <div className='row'>
            <div className='text-uppercase w3-center' style={{ marginTop: '40px' }}>
              <h1><strong>ONCE YOU JOIN, GET ACCESS TO:</strong></h1>
            </div>
            <div className='w3-center getAccess' style={{ marginTop: '20px' }}>
              <ul>
                <li><span className='glyphicon glyphicon-ok'></span><strong>DCG TRADING BOOTCAMP</strong> (Every Tuesday and Thursday night LIVE course for beginners)</li>
                <li><span className='glyphicon glyphicon-ok'></span><strong>Market Cycle Course</strong> (learn Seasonal Trading and Market Cycles and Trading with a full-time job)</li>
                <li><span className='glyphicon glyphicon-ok'></span><strong>24-hour education</strong> (access recordings daily even if you are not able to attend live)</li>
                <li><span className='glyphicon glyphicon-ok'></span><strong>ll revised courses from 2021</strong></li>
                <li><span className='glyphicon glyphicon-ok'></span><strong>Stocks and Options 101</strong></li>
                <li><span className='glyphicon glyphicon-ok'></span><strong>Crypto Trading 101</strong></li>
                <li><span className='glyphicon glyphicon-ok'></span><strong>Forex Trading 101</strong></li>
              </ul>
            </div>
            <div className='giveButton' style={{
              backgroundColor: '#ff7902',
              fontWeight: 'bold',
              padding: '15px 0px 15px',
              margin: 'auto',
              marginBottom: '10px',
              textAlign: 'center',
              width: '50%',
            }}>
              <Link to={`/checkoutsub2/${mastermindProduct._id}`} style={{
                textDecoration: 'none',
                color: 'white'
              }}>
                <span style={{ fontSize: '24px' }}>GIVE ME ACCESS TO MASTERMIND</span>
                <br />

              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='row' style={{ backgroundColor: 'black', color: 'white', paddingTop: '40px' }}>
        <div className='container blackParts'>
          <div className='row'>
            <div className='w3-center text-uppercase'>
              <h1>IT'S ALL ABOUT TIMING - WE GIVE YOU EVERYTHING YOU NEED IN ADVANCE!</h1>
              <br />
              {/* <h3>the mastermind is all inclusive.</h3> */}
            </div>
          </div>
          <div className='row'>
            <div className='container'>
              <div className='row'>
                <ul>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Daily Live Zoom Calls</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>24/7 Trading Alert Group</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Telegram Alert Group</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Alligator Strategy Education</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Automated Trading Platform</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Trading View Templates and Strategies</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Month-to-Month Subscription Program</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>DCG Bootcamp and Mastermind Alliance</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>We hold nothing back - you will be around others that are WINNING!</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>How to know what to buy, when and why</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>How to Swing Trade saving you time</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Learn the method and process I use to turn 2K into $41K in one trade!</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>You will be surprised how much you can learn in a short amount of time</li>
                  {/* <li><span className='glyphicon glyphicon-ok-sign'></span>You will be around others that are winning.</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>How To Identify What To Buy, When, and Why.</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Get Access To all the trading view tools we use while trading.</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Learn how to SWING TRADING that saves your time.</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Trading Rehab Mastermind Material</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Learn and receive my alligator strategy with your membership</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>Learn the exact method and process I use to turn 2k into$41,000 in one trade.</li>
                  <li><span className='glyphicon glyphicon-ok-sign'></span>You will be surprised at what you can learn in a short amount of time.</li> */}
                </ul>
                <div className='giveButton' style={{
                  backgroundColor: '#ff7902',
                  fontWeight: 'bold',
                  padding: '15px 0px 15px',
                  margin: 'auto',
                  marginTop: '30px',
                  marginBottom: '30px',
                  textAlign: 'center',
                  width: '50%',
                }}>
                  <Link to={`/checkoutsub2/${mastermindProduct._id}`} style={{
                    textDecoration: 'none',
                    color: 'white'
                  }}>
                    <span style={{ fontSize: '24px' }}>GIVE ME ACCESS TO MASTERMIND</span>
                    <br />

                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row' style={{
        // backgroundColor: 'rgb(15,15,15)'
      }}>
        <div style={{
          background: `url(${sales2BG}) no-repeat center center/cover`,
        }}>
          <div style={{ backgroundColor: 'rgba(15,15,15,0.7)' }}>
            <div className='container'>
              <div className='row'>
                <div className='w3-center dollars'>
                  <h1><strong>Our Goal Is To Give You The Tools You Need To Make Money For The Rest Of Your Life</strong></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='container'>
          <div className='row aboutCoach'>
            <div className='w3-center' style={{ margin: '30px 0px 70px' }}>
              <h1><strong>About Your Coach</strong></h1>
            </div>
            <div className='col-md-6 w3-center'>
              <p>Jamar James is a Professional Trader and Crypto Currency Coach who helps entrepreneurs and business professionals earn a full-time income investing in cryptocurrency strategies.</p>
              <p>Jamar, also known as the Digital Currency Guy has created a dynamic coaching group designed to take an individual from being introduced to cryptocurrency to living completely off of cryptocurrency investments within 12 months.</p>
              <p>Before creating the perfect DCG cryptocurrency system, Jamar spent 20 years as a Technology Consultant and Prop Trader for private financial firms in the U.S. After a successful career in I.T., helping fortune 500 companies and investing money successfully in the stock market, as well as real estate, Jamar has now built a community of traders and Mastermind members who are now earning a full-time income from cryptocurrency in their spare time.</p>
              <p>Jamar also loves to teach programming to children and often hosts workshops to bring mass awareness about the benefits of digital currency.</p>
              <div className='giveButton' style={{
                backgroundColor: '#ff7902',
                fontWeight: 'bold',
                padding: '10px 0px 10px',
                margin: 'auto',
                marginTop: '30px',
                marginBottom: '30px',
                textAlign: 'center',
                width: '50%',
              }}>
                <Link to={`/checkoutsub2/${mastermindProduct._id}`} style={{
                  textDecoration: 'none',
                  color: 'white'
                }}>
                  <span style={{ fontSize: '20px' }}>CHECKOUT NOW</span>
                </Link>
              </div>
            </div>
            <div className='col-md-6'>
              <img src={sales2Photo} alt='SELFPHOTO' width='100%' className='img-responsive' />
            </div>
          </div>
          <div className='row' style={{ marginTop: '60px' }}>
            <div className='w3-center'>
              <h1 style={{ fontSize: '50px' }}><strong>Get 24/7 Trading Support Via</strong></h1>
            </div>
          </div>
          <div className='row' style={{ marginTop: '60px' }}>
            <div className='col-md-3 w3-center'>
              <img src={sales2Discord} alt='DISCORD' width='100' />
            </div>
            <div className='col-md-3 w3-center'>
              <img src={sales2Slack} alt='SLACK' width='100' />
            </div>
            <div className='col-md-3 w3-center'>
              <img src={sales2Zoom} alt='ZOOM' width='100' />
            </div>
            <div className='col-md-3 w3-center'>
              <img src={sales2Facebook} alt='FACEBOOK' width='100' />
            </div>
          </div>
          <div className='row' style={{ marginTop: '60px' }}>
            <div className='w3-center'>
              <h1 style={{ fontSize: '50px' }}><strong>THIS IS YOUR DEFINING MOMENT.</strong></h1>
            </div>
          </div>
          <div className='row' style={{ marginTop: '40px' }}>
            <div className='w3-center'>
              <h3><strong>Raise your edge, the decision is now.</strong></h3>
            </div>
          </div>
          <div className='row' style={{ marginTop: '20px' }}>
            <div className='w3-center'>
              <img src={sales2Arrows} alt='ARROW' width='250' />
            </div>
          </div>
          <div className='giveButton' style={{
            backgroundColor: '#ff7902',
            fontWeight: 'bold',
            padding: '15px 0px 15px',
            margin: 'auto',
            marginBottom: '10px',
            textAlign: 'center',
            width: '50%',
          }}>
            <Link to={`/checkoutsub2/${mastermindProduct._id}`} style={{
              textDecoration: 'none',
              color: 'white'
            }}>
              <span style={{ fontSize: '24px' }}>GIVE ME ACCESS TO MASTERMIND</span>
              <br />

            </Link>
          </div>
          <div className='row' style={{ marginTop: '80px' }}>
            <div className='w3-center'>
              <img src={sales2MiniPhoto} alt='ARROW' width='150' />
            </div>
          </div>
          <div className='row ending' style={{ margin: '20px' }}>
            <div className='w3-center'>
              <p>Copyright © 2021, All Rights Reserved - DCG™</p>
              <p>
                Trading financial instruments is a challenging and potentially profitable endeavor for educated and disciplined investors who are willing to take an above-average risk on their capital. Before you decide to invest in the markets you should carefully consider your objectives, education, and capability but most importantly your risk aversion. The possibility of sustaining a loss of some or all of your initial investment exists, it's because of this that you should never invest money you cannot afford to lose.
                <br />
                <span>Past performance is not indicative of future results.</span>
              </p>
              <p>Disclaimer of liability: The interpretation and use of the trading signals and market analysis generated by DCG is at the sole discretion of the customer, subscriber, member, or trader. DCG and its owners shall not be responsible for any claims in losses directly consequential of any trading activity.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  defaultProducts: state.partner.defaultProducts,
})

export default connect(mapStateToProps, { getTempUser, getSalesProducts, getPublishableKey })(Sales2)