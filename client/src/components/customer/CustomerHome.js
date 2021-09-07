import React from 'react'
// import logoImg from "../../img/logo/logo.svg"
import logoImg from "../../img/logo/logo2.png"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import Spaces from '../layout/Spaces'

const CustomerHome = ({ isAuthenticated, user, logout }) => {
  return (
    <section className="container-fluid bg-home bg-customer">
      <div className="row w3-center">
        <Link to='/home'>
          <img src={logoImg} alt="lalala" className="img-responsive homeLogo" />
        </Link>
      </div>
      <div className="row w3-center">
        <Link to="/coursereports">COURSES & REPORTS</Link>
        <a onClick={logout} href="#!"><Spaces spaceLength={3} />LOGOUT</a>
      </div>
      <div className='row' style={{margin: '50px 20px 20px'}}>
        <div className='container'>
          <div className='row'>
            <div className='w3-center header'>
              <h1>Welcome To The</h1>
              <h1>DCG Trading Mastermind</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='container'>
          <div className='row whitepanel'>
            <div className='w3-center'>
              <p>Welcome to the DCG Mastermind</p>
              <p>hosted by DCG And Team (Jamar James)</p>
              <br />
              <p>
                During your first month in DCG we are focused on education and exposure. You are encouraged to ask questions, to participate and attend in the meetings and please comitt to one hour a day of reading the mastermind chat. Orientation is very important, please attend the Sunday Night Orientation and save step 7 as a favorite. (Training Schedule) Recorded calls are located in the facebook group.
              </p>
              <p>I look forward to working with you!</p>
              <br />
              <p>Make sure to follow steps 1-24 below or else you'll be completely lost.</p>
              <br />
              <p>
                <a href="https://www.evernote.com/shard/s335/sh/c7cb3d15-a384-42e4-a4c3-a5198fbecdbd/dff5721c7ed0503f2be0bb0940a570ba" rel="noopener noreferrer">Download Your 30 Day Checklist</a>
              </p>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://jamarjames.com/nda/' target='_blank' rel="noreferrer">
                <div className='firstspan'>1. Please Complete The DCG NDA</div>
                <div className='secondspan'>Please Do Not Share Any Of Our Material With Non-Members</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://www.facebook.com/jamarjames' target='_blank' rel="noreferrer">
                <div className='firstspan'>2. Friend Request Jamar on Facebook</div>
                <div className='secondspan'>Please Also Text Jamar James at 714 385 7443 - Text (Name - New Member)</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://www.facebook.com/groups/DigitalCurrencyGuy' target='_blank' rel="noreferrer">
                <div className='firstspan'>3. Request to Join  Digital Currency Guy Facebook Group</div>
                <div className='secondspan'>Join The Private DCG Facebook Group Here</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://discord.gg/UAyzjPQkXa' target='_blank' rel="noreferrer">
                <div className='firstspan'>4. Join DCG Mastermind  Discord Group</div>
                <div className='secondspan'>Our 24/7 Chat and Trading Space</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://discord.gg/UAyzjPQkXa' target='_blank' rel="noreferrer">
                <div className='firstspan'>5. Join DCG Mastermind  Discord Alerts Group</div>
                <div className='secondspan'>Our 24/7 Chat and Trading Server</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://discord.gg/UAyzjPQkXa' target='_blank' rel="noreferrer">
                <div className='firstspan'>6. Join DCG Mastermind  NFT Discord Alert Group</div>
                <div className='secondspan'>Our 24/7 NFT Chat and Trading Discord</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://www.dcgmastermind.com/groups/2846330?autojoin=1' target='_blank' rel="noreferrer">
                <div className='firstspan'>7. Join DCG Mastermind  Bootcamp</div>
                <div className='secondspan'>Click Here - Sign Up For Free Account First</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://www.dcgmastermind.com/topics/2705744' target='_blank' rel="noreferrer">
                <div className='firstspan'>8. Complete the 7 Day Challenge</div>
                <div className='secondspan'>(create free account) Please Complete The 7 Day Challenge Before Scheduling A Call</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://thedigitalcurrencyguy.com/DCGTrainingSchedule' target='_blank' rel="noreferrer">
                <div className='firstspan'>9. Zoom Weekly Training Schedule Calendar</div>
                <div className='secondspan'>Click Here To Review The DCG Training Schedule</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='"https://calendar.google.com/calendar?cid=aXM3a25ocmo2MTVwazhoaTNwOGhqdGpsdTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ' target='_blank' rel="noreferrer">
                <div className='firstspan'>10.  Add DCG Google Calendar</div>
                <div className='secondspan'>Click Here To Add</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://www.dropbox.com/s/vl6hcqk4j3tjxh8/DCG%20Orientation%20%26%20Organization%20%28Updated%29.pdf?dl=0' target='_blank' rel="noreferrer">
                <div className='firstspan'>11. Download DCG Organization Download</div>
                <div className='secondspan'>Attend Weds Organization And Orientation Call (See Step 9)</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://www.dcgmastermind.com/share/E4KZn97pAoazE1XL?utm_source=manual' target='_blank' rel="noreferrer">
                <div className='firstspan'>12. Join DCG Mastermind  Network</div>
                <div className='secondspan'>Click Here To Join Now</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://t.me/joinchat/VqY09jSKXfJ9p4lx' target='_blank' rel="noreferrer">
                <div className='firstspan'>13. Join DCG Crypto Telegram Group</div>
                <div className='secondspan'>Click Here To Join Now</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://t.me/joinchat/SenEPJIr10pppAaG' target='_blank' rel="noreferrer">
                <div className='firstspan'>14. Join MCF Forex Telegram Group</div>
                <div className='secondspan'>Click Here To Join Now</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://t.me/joinchat/R0hrjtG47tgV82zo' target='_blank' rel="noreferrer">
                <div className='firstspan'>15. DCG-Gladstone Stock and Options 101</div>
                <div className='secondspan'>Stock and Options Beginners Chat</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://discord.gg/UAyzjPQkXa' target='_blank' rel="noreferrer">
                <div className='firstspan'>16. NFT DCG Master Chat  With Teaila</div>
                <div className='secondspan'>NFT-Gaming-Virtual Land- Digital Assets DCG CHAT</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://thedigitalcurrencyguy.com/2021MasterclassReplay' target='_blank' rel="noreferrer">
                <div className='firstspan'>17. The Business Of DCG Trading - Must Watch</div>
                <div className='secondspan'>Click Here To Watch The Replay (1.5 Hour Replay)</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://thedigitalcurrencyguy.com/Watch-Replay' target='_blank' rel="noreferrer">
                <div className='firstspan'>18. DCG Market Cycle Master Class ( Swing Trading )</div>
                <div className='secondspan'>Click Here To Watch The Replay (2 Hours)</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://www.evernote.com/shard/s335/sh/c7cb3d15-a384-42e4-a4c3-a5198fbecdbd/dff5721c7ed0503f2be0bb0940a570ba' target='_blank' rel="noreferrer">
                <div className='firstspan'>19. DCG 30 Day Checklist - Check Off All In The Next 30 Days</div>
                <div className='secondspan'>Start Your DCG 30 Day Mission</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <p>
                <div style={{color: 'red', fontSize: '32px'}}><strong>Remember New Member Orientation Is</strong></div>
                <div style={{color: 'red', fontSize: '32px'}}><strong>Sunday Evening @ 6:00 P.M PST</strong></div>
              </p>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://www.dcgzoom.com' target='_blank' rel="noreferrer">
                <div className='firstspan'>20. New Member DCG Orientation  Zoom Link</div>
                <div className='secondspan'>This Is The Orientation Link To Attend</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://us02web.zoom.us/j/85714720671' target='_blank' rel="noreferrer">
                <div className='firstspan'>21. Bootcamp Zoom Link</div>
                <div className='secondspan'>Click Here Tuesday and Thursdays At 6pm pst</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://thedigitalcurrencyguy.com/Crypto-Currency-Bootcamp-Links-9428-1241' target='_blank' rel="noreferrer">
                <div className='firstspan'>22. Additional Resources</div>
                <div className='secondspan'>Click Here</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://thedigitalcurrencyguy.com/DCG-Alligator-Links' target='_blank' rel="noreferrer">
                <div className='firstspan'>23. Tradingview Alligator Templates</div>
                <div className='secondspan'>Once You Have Gone Through The 7 Day Challenge - Get More Tempaltes</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <a href='https://thedigitalcurrencyguy.com/kidd-exclusive-invitation' target='_blank' rel="noreferrer">
                <div className='firstspan'>24. DCG Bootcamp Sign up Link for Friends or Family</div>
                <div className='secondspan'>We Love Referrals - Please Refer Friends and Family To Dcgbootcamp.com</div>
              </a>
            </div>
            <div className='w3-center greendiv'>
              <p>
                <div>Kind Regards,</div>
                <div>Jamar James & THE DCG TEAM</div>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='container'>
          <div className='row'>
            <div className='w3-center footer'>
              <p>Copyright 2020 - DigitalCurrencyGuy.com</p>
              <p>Design By OnlineImagePartner.com</p>
              <p>714-266-3026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(CustomerHome);