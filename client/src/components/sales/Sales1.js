import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTempUser, getSalesProducts, getPublishableKey } from '../../actions/partner'
import street from '../../img/sales1/street.jpg'
import comDisplay from '../../img/sales1/com-display.jpg'
import apartments from '../../img/sales1/apartments.jpg'
import table from '../../img/sales1/table.jpg'
import marketCycle from '../../img/sales1/market-cycle.jpg'
import bitcoin from '../../img/sales1/bitcoin.jpg'
import hitmap from '../../img/sales1/hitmap.jpg'
import mayDays from '../../img/sales1/may-days.jpg'
import volumnTiming from '../../img/sales1/volumn-timing.jpg'
import dcgPhoto from '../../img/sales2/sales2-photo.jpeg'
import kyle from '../../img/sales1/kyle.jpg'
import latredick from '../../img/sales1/latredick.jpg'
import devon from '../../img/sales1/devon.jpg'

const Sales1 = ({ match, getTempUser, getSalesProducts, getPublishableKey, defaultProducts }) => {
  const userID = match.params.id
  const [reportsonlyProduct, setReportsonlyProduct] = React.useState({})

  React.useEffect(() => {
    getTempUser(userID)
    getSalesProducts(userID)
    getPublishableKey()
  }, [getTempUser, getSalesProducts, getPublishableKey, userID])

  React.useEffect(() => {
    if (defaultProducts.length) {
      const reportsonlyProduct = defaultProducts.find(element => element.name === 'Reports Only' || element.price === 19900)
      setReportsonlyProduct(reportsonlyProduct)
    }
  }, [defaultProducts])

  return (
    <div className='container-fluid sales1'>
      <div className='row salesTop'>
        <div className='container'>
          <div className='row'>
            <div className='w3-center'>
              <br /><br />
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '40px' }}>
                  <strong>Get The Monthly Report That The Market Makers Don't Want You To See.</strong>
                </p>
              </div>
              <br />
              <div>
                <p style={{ fontSize: '38px' }}>
                  <em>For the first time ever...</em>
                </p>
              </div>
              <br /><br />
              <div>
                <p style={{ fontSize: '24px' }}>
                  Leverage the same understanding of market cycles, global trends, and mass psychology that the big money players use to fool 98% of retail traders.
                </p>
              </div>
              <br />
              <div>
                <p style={{ fontSize: '24px' }}>
                  <strong><u>Now you can trade Crypto, Stocks, & Options, with the confidence of knowing you are on the "inside"</u></strong>
                </p>
              </div>
              <br />
              <div>
                <p style={{ fontSize: '24px' }}>
                  <strong>The DCG Monthly Oracle Report puts decades of tested market forecasting and analysis into an easily-digestible & immediately-actionable daily guide.</strong>
                </p>
              </div>
              <br /><br />
              <div>
                <div className='giveButton' style={{
                  fontWeight: 'bold',
                }}>
                  <Link to={`/checkoutsub2/${reportsonlyProduct._id}`} style={{
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: '#37ca37',
                    padding: '15px 20px',
                    textShadow: '1px 1px 3px rgb(0 0 0 / 50%)'
                  }}>
                    <span style={{ fontSize: '20px' }}>Get The Oracle Report Now</span>
                    <br />
                  </Link>
                </div>
              </div>
              <br /><br />
              <div>
                <p style={{ fontSize: '36px' }}>
                  Did You Ever Wonder...
                </p>
              </div>
              <br /><br /><br />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <img src={street} alt='STREET' className='img-responsive' />
            </div>
            <div className='col-md-8'>
              <div className='w3-center'>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '30px 0px' }}>
                  <p style={{ fontSize: '22px' }}>Why do so few people become consistently profitable traders?</p>
                  <br />
                  <p style={{ fontSize: '22px' }}>Why does the market seem to do the opposite of what you expect it to?</p>
                  <br />
                  <p style={{ fontSize: '22px' }}>How do the big dogs of finance always seem to get it right?</p>
                </div>
              </div>
            </div>
          </div>
          <br /><br />
        </div>
      </div>

      <div className='row'>
        <div className='container'>
          <div className='row'>
            <div className='w3-center'>
              <br />
              <p style={{ fontSize: '31px' }}>In trading, there's something <em>even more powerful</em> than information.</p>
              <br />
            </div>
          </div>

          <div className='row' style={{ backgroundColor: 'black', color: 'white' }}>
            <div className='col-md-6' style={{ padding: '40px 30px' }}>
              <div className='w3-center' style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '17px' }}>
                  If you've ever been left speechless, staring at your screen, watching a trade backfire on you, then there's something you need to understand.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  The problem might not be your system. Or your chart analysis. And you very well already have a great understanding of what you're trading.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  So what keeps you at arm's length from finally hitting your goals and trading at a high level?
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  Information might be power, but...
                </p>
                <br />
                <p style={{ fontSize: '20px', color: '#e93d3d' }}>
                  <strong>Timing is everything.</strong>
                </p>
              </div>
            </div>
            <div className='col-md-6' style={{ padding: '40px 30px' }}>
              <img src={comDisplay} alt='DISPLAY' className='img-responsive' />
            </div>
          </div>

          <div className='row' style={{ marginTop: '70px' }}>
            <div className='col-md-7'>
              <div className='w3-center'>
                <p style={{ fontSize: '17px' }}>
                  International banks, multi-billion dollar hedge funds, and behemoth traders <strong>forecast their moves days, weeks, or even months in advance.</strong>
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  They're hyper-aware of seasonal movements and historic cycles in the markets. And they forecast how things will play out with a frightening degree of accuracy, allowing them to take positions that few retail traders would be able to forsee.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  For years the big dogs have kept the lid on their forecast-based strategies.
                </p>
                <br />
                <p style={{ fontSize: '22px', color: '#e93d3d' }}>
                  <strong><em>But the tides are changing...</em></strong>
                </p>
                <br />
              </div>
            </div>
            <div className='col-md-5'>
              <img src={apartments} alt='APARTMENTS' className='img-responsive' />
            </div>
          </div>

          <div className='row' style={{ backgroundColor: 'black', color: 'white', maxWidth: '960px', margin: 'auto', marginTop: '50px' }}>
            <div className='w3-center'>
              <p style={{ fontSize: '30px', padding: '40px' }}>
                <strong>INTRODUCING THE DCG ORACLE REPORT</strong>
              </p>
            </div>
          </div>

          <div className='row' style={{ marginTop: '50px' }}>
            <div className='w3-center'>
              <p style={{ fontSize: '17px' }}>
                DCG is a select Mastermind of technical analysis experts and veteran traders. During the last few years, they've developed a revolutionary approach to trading cryptocurrency through understanding the cycles that affect ALL markets.
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                The Oracle is a monthly report that rips the lid off the forecasting methods that the market makers use.
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                <strong>Think of it as a day-by-day resource that gives you the closest thing possible to reading the future.</strong>
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                Because history absolutely repeats itself.
              </p>
            </div>
          </div>

          <div className='row tableShow' style={{ margin: '60px 0px' }}>
            <div className='col-md-6' style={{ padding: '0px 20px' }}>
              <img src={table} alt='TABLE' className='img-responsive' />
            </div>
            <div className='col-md-6'>
              <div className='w3-center'>
                <p style={{ fontSize: '17px' }}>
                  This monthly report isn't something you read through, think is interesting, and then toss aside.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  <strong><em>The DCG Oracle Report is curated and created specifically to serve as your daily intel into the markets.</em></strong>Using the report as a briefing before you begin trading gives you a clearer picture of how each day and week is shaping up.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  Pull the curtain aside and learn the best days to buy and sell. Understand when to stay out, while the majority of traders sink their accounts with amateur mistakes like FOMO and following crowd behavior.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  <u>Even a new trader can take the calendars, forecasts, and picks presented here and be immediately more profitable than someone more experienced trying to grind profits out the hard way.</u>
                </p>
                <hr />
                <br />
                <div style={{
                  fontWeight: 'bold',
                }}>
                  <Link to={`/checkoutsub2/${reportsonlyProduct._id}`} style={{
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: '#37ca37',
                    padding: '15px 20px',
                    textShadow: '1px 1px 3px rgb(0 0 0 / 50%)',
                  }}>
                    <span style={{ fontSize: '20px' }}>Get The Report Now</span>
                    <br />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='row' style={{ borderTop: '1px solid' }}>
            <div className='w3-center'>
              <br />
              <p style={{ fontSize: '30px' }}>
                <strong>EVERY MONTH, THE DCG ORACLE REPORT SHOWS YOU:</strong>
              </p>
            </div>
          </div>

          <div className='row tableShow' style={{ margin: '60px 0px' }}>
            <div className='col-md-6'>
              <ul>
                <li><span className='glyphicon glyphicon-ok'></span><strong>Over 119 years worth of condensed Dow Jones Industrial Average tends, insights, and cycles.</strong></li>
                <li><span className='glyphicon glyphicon-ok'></span>How to easily implement knowledge uncovered from enigmatic trader, W.D. Gann, and his geometric tech analysis that let him predict the crash of 1929 and make millions (equal to hundreds of millions by today's rates)</li>
                <li><span className='glyphicon glyphicon-ok'></span><strong>A look at current cultural trends that most traders never even consider, and how to adjust your strategy accordingly.</strong></li>
                <li><span className='glyphicon glyphicon-ok'></span>Updated advice, data and insight regarding what’s happening RIGHT NOW in the crypto, options and stock markets, and takes you by the hand and shows you exactly what to do if you want to make money.</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <img src={marketCycle} alt='MARKETCYCLE' className='img-responsive' />
            </div>
          </div>

          <div className='row'>
            <div className='w3-center'>
              <div style={{
                fontWeight: 'bold',
              }}>
                <Link to={`/checkoutsub2/${reportsonlyProduct._id}`} style={{
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: '#37ca37',
                  padding: '15px 20px',
                  textShadow: '1px 1px 3px rgb(0 0 0 / 50%)',
                }}>
                  <span style={{ fontSize: '20px' }}>Start Trading At A New Level Now</span>
                  <br />
                </Link>
              </div>
            </div>
          </div>

          <div className='row' style={{ backgroundColor: 'black', color: 'white', marginTop: '70px', padding: '10px' }}>
            <div className='w3-center'>
              <p style={{ fontSize: '30px' }}>
                <strong>The New Bitcoin & Crypto Authority</strong>
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                Any trader can profit from the information in the DCG Oracle Report.
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                But if you're interested in the future of currency, you will NOT find a more comprehensive report of all things Bitcoin and Altcoins.
              </p>
            </div>
          </div>

          <div className='row tableShow' style={{ margin: '60px 0px' }}>
            <div className='col-md-6' style={{ padding: '0px 20px' }}>
              <img src={bitcoin} alt='TABLE' className='img-responsive' />
            </div>
            <div className='col-md-6'>
              <div className='w3-center'>
                <p style={{ fontSize: '17px' }}>
                  The simple truth is that Wall Street's interest in crypto is growing exponentially. The Oracle Report presents any correlation (or lack of) between Bitcoin and other indexes. We then look to historical movements to get a multi-dimensional understanding of how price is likely to react.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  <strong>International adaptation of blockchain, the repercussions of COVID-19, the 800% YoY growth in Stable Coins...</strong>
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  These are just some of the trends the Oracle Report dissects and incorporates.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  It does all the heavy lifting for you. Just look at the daily forecasts and plan accordingly.
                </p>
                <br />
                <p style={{ fontSize: '17px', color: '#e93d3d' }}>
                  <strong><em>This report will give you the unshakeable confidence and practical, no-fluff, “here’s exactly what you need to buy” advice for turning clicks on a computer into wealth in your portfolio.</em></strong>
                </p>
              </div>
            </div>
          </div>

          <div className='row' style={{ marginBottom: '50px' }}>
            <div className='col-md-5'>
              <div className='w3-center'>
                <img src={hitmap} alt='HITMAP' width='60%' />
              </div>
              <br /><br />
            </div>
            <div className='col-md-7'>
              <div className='w3-center'>
                <img src={mayDays} alt='MAYDAYS' width='90%' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row' style={{ backgroundColor: 'black', color: 'white', padding: '50px 0px' }}>
        <div className='container'>
          <div className='row tableShow' style={{ marginBottom: '60px' }}>
            <div className='col-md-5'>
              <div className='w3-center'>
                <p style={{ fontSize: '17px' }}>
                  You also receive chart templates and additional resources that illustrate the 3 central tenets of DCG philosophy...
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  Understanding:
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  <span style={{ color: '#e93d3d' }}>Volume.</span> See where the big money is going.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  <span style={{ color: '#e93d3d' }}>Sentiment.</span> Decipher the 3 emotions of hope, fear, and indecision.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  Timing. Retail traders are often right in their analysis, they just don't know when to execute.
                </p>
              </div>
            </div>
            <div className='col-md-7'>
              <img src={volumnTiming} alt='TIMING' className='img-responsive' />
            </div>
          </div>

          <div className='row'>
            <div className='w3-center'>
              <div style={{
                fontWeight: 'bold',
              }}>
                <Link to={`/checkoutsub2/${reportsonlyProduct._id}`} style={{
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: '#37ca37',
                  padding: '15px 20px',
                  textShadow: '1px 1px 3px rgb(0 0 0 / 50%)',
                }}>
                  <span style={{ fontSize: '20px' }}>Get Your Report Now!</span>
                  <br />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='container'>
          <div className='row' style={{ margin: '40px 0px', borderTop: '1px solid' }}>
            <div className='w3-center'>
              <br />
              <p style={{ fontSize: '30px' }}>
                <strong>DCG: Bringing The Past & Future Of Trading Together.</strong>
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6' style={{ margin: '30px 0px' }}>
              <div className='w3-center'>
                <img src={dcgPhoto} alt='DCGPHOTO' width='50%' />
                <br /><br />
                <p style={{ fontSize: '12px' }}>
                  Jamar James,
                </p>
                <p style={{ fontSize: '12px' }}>
                  DCG Founder & Chief Director of the Oracle Report
                </p>
              </div>
            </div>
            <div className='col-md-6' style={{ margin: '30px 0px' }}>
              <div className='w3-center'>
                <p style={{ fontSize: '17px' }}>
                  After serving proudly in the Marine Corps, Jamar James pursued the life of an entrepreneur.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  He found success in real estate, and then entered the financial markets.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  He served as a business analyst for Blue Chip companies like <strong>Disney, Bank of America,</strong> and <strong>Black and Decker.</strong> He's been an analyst for billion-dollar corporations you've probably never heard of, like <strong>Pacific Life Variable Annuities</strong> and <strong>Allergan.</strong>
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  He saw the potential of Bitcoin back in 2009 and has since become one of the foremost authorities of cryptocurrency.
                </p>
                <br />
                <p style={{ fontSize: '17px' }}>
                  He now resides in Southern California, managing accounts for the extremely affluent who want to get involved in crypto, and turning DCG into a Mastermind and trading force to be reckoned with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row' style={{ backgroundColor: 'black', color: 'white' }}>
        <div className='container'>
          <div className='row' style={{ padding: '40px 0px' }}>
            <div className='w3-center'>
              <p style={{ fontSize: '30px' }}>
                Traders Are Seeing The Markets In Ways They Never Have Before.
              </p>
            </div>
          </div>

          <div className='row tableShow' style={{ padding: '30px 0px' }}>
            <div className='col-md-6'>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <div className='w3-center'>
                  <img src={kyle} alt='kyle' width='100%' />
                </div>
              </div>
              <div className='col-md-2'></div>
            </div>
            <div className='col-md-6'>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <div className='w3-center'>
                  <img src={latredick} alt='latredick' width='100%' />
                </div>
              </div>
              <div className='col-md-2'></div>
            </div>
          </div>
          <div className='row' style={{ padding: '30px 0px' }}>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
              <div className='w3-center'>
                <img src={devon} alt='devon' width='100%' />
              </div>
            </div>
            <div className='col-md-2'></div>
          </div>
          <div className='row' style={{ padding: '30px 0px' }}>
            <div className='w3-center'>
              <p style={{ fontSize: '20px' }}>
                Browse Through A Previous Oracle Report Below!
              </p>
            </div>
          </div>
          <div className='row' style={{ padding: '30px 0px' }}>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
              <div className="video-responsive" style={{ boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.5)' }}>
                <iframe
                  width="100%"
                  src='https://www.youtube.com/embed/NhAI8Prq7ho?autoplay=1&controls=1'
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            </div>
            <div className='col-md-2'></div>
          </div>
          <div className='row' style={{ padding: '50px 0px' }}>
            <div className='w3-center'>
              <div style={{
                fontWeight: 'bold',
              }}>
                <Link to={`/checkoutsub2/${reportsonlyProduct._id}`} style={{
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: '#37ca37',
                  padding: '15px 20px',
                  textShadow: '1px 1px 3px rgb(0 0 0 / 50%)',
                }}>
                  <span style={{ fontSize: '20px' }}>Get Your Cheat Code For The Markets Now!</span>
                  <br />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row' style={{ padding: '50px 0px' }}>
        <div className='container'>
          <div className='row' style={{ borderTop: '1px solid' }}>
            <div className='w3-center'>
              <br />
              <p style={{ fontSize: '30px' }}>
                <strong>The Future Is In Your Hands</strong>
                <br /><br />
              </p>
              <p style={{ fontSize: '17px' }}>
                <strong>You didn't' get into trading to spend countless hours looking at charts while life passes you by.</strong>
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                And even if you did, you wouldn't be able to assemble this scope of data, historical trends, and analysis...
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                ...all put together for you in plain English.
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                Trying to go it alone won't cut it if you want to get to the next level in trading.
              </p>
              <br />
              <p style={{ fontSize: '17px', color: '#e93d3d' }}>
                <strong>Market cycles are REAL. The big money players know it. And they would rather you didn't.</strong>
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                And while no one can predict the future with 100% accuracy...
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                The DCG Oracle Report demonstrates uncanny ability to see how the markets are likely to act based on how they've acted before.
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                <strong>Discover the DCG Oracle Report now, and start becoming more profitable tomorrow.</strong>
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                Will you be part of the future?
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                Or get stuck in the past...
              </p>
              <br />
              <p style={{ fontSize: '17px' }}>
                The choice is up to you.
              </p>
              <br />
              <div style={{
                fontWeight: 'bold',
              }}>
                <Link to={`/checkoutsub2/${reportsonlyProduct._id}`} style={{
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: '#37ca37',
                  padding: '15px 20px',
                  textShadow: '1px 1px 3px rgb(0 0 0 / 50%)',
                }}>
                  <span style={{ fontSize: '20px' }}>Get Your Oracle Report Now!</span>
                  <br />
                </Link>
              </div>
              <br /><br /><br /><br />
              <p style={{ fontSize: '12px' }}>
                © Digital Currency Guy | 2020 | <span style={{color: '#188bf6'}}>Refund Policy</span>
              </p>
              <p style={{ fontSize: '12px' }}>
                All Rights Reserved
              </p>
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

export default connect(mapStateToProps, { getTempUser, getSalesProducts, getPublishableKey })(Sales1)