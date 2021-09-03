import React from 'react'
import sales2Logo from '../../img/sales2/sales2-logo.png'

const Sales2 = () => {

  return (
    <div className='container-fluid sales2'>
      <div className='row'>
        <div className='w3-center'>
          <br /><br />
          <img src={sales2Logo} alt='LOGO' width='300px' />
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
            <div className='col-md-7'>
              <div className="video-responsive" style={{boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.5)'}}>
                <iframe
                  width="100%"
                  height="100%"
                  src='https://www.youtube.com/embed/62Xj5WXShpM'
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen='allowfullscreen'
                  title="Embedded youtube"
                />
              </div>
            </div>
            <div className='col-md-5'>
              <div className='text-uppercase w3-center'>
                <h2 style={{ color: '#aaa' }}>learn and get full</h2>
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
                The Trading Mastermind - Where Entrepreneurs Master Stocks, Options, Forex, and Crypto! When you join DCG Mastermind You Get Access To Over 6, 7, and 8 Figure Traders.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sales2