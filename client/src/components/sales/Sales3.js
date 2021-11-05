import React from 'react'
import './Sales3.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTempUser, getSalesProducts, getPublishableKey } from '../../actions/partner'
import Vimeo from '@u-wave/react-vimeo'

const Sales3 = ({ match, getTempUser, getSalesProducts, getPublishableKey, defaultProducts }) => {
  const userID = match.params.id
  const [eliteProduct, setEliteProduct] = React.useState({})

  React.useEffect(() => {
    getTempUser(userID)
    getSalesProducts(userID)
    getPublishableKey()
  }, [getTempUser, getSalesProducts, getPublishableKey, userID])

  React.useEffect(() => {
    if (defaultProducts.length) {
      const eliteProduct = defaultProducts.find(element => element.name === 'DCG Elite Membership' || element.price === 99700)
      console.log(defaultProducts)
      setEliteProduct(eliteProduct)
    }
  }, [defaultProducts])

  return (
    <div>
      <div className="bg-fixed bgCover"></div>
      <div>
        <div id="preview-container" className="preview-container hl_page-preview--content">
          <div data-v-44243b2d="">
            <div id="section-OfdpESRUP" className="fullSection none noBorder radius0 none c-section c-wrapper section-OfdpESRUP"
              data-v-44243b2d="">
              <div className="inner" data-v-44243b2d="">
                <div id="row-jjuYiUcPqs" className="row-align-center none noBorder radius0 none c-row c-wrapper row-jjuYiUcPqs"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-_9oZxm4pt" className="c-column c-wrapper col-_9oZxm4pt" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-gQlf-eB5a" className="c-image c-wrapper image-gQlf-eB5a" data-v-44243b2d="">
                          <div id="image-gQlf-eB5a" className="image-container cimage-gQlf-eB5a" style={{ cursor: "default" }}
                            data-v-34293473="">
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085="">
                                <Link to='/home'>
                                  <img alt=""
                                    data-src="https://storage.googleapis.com/highlevel-backend.appspot.com/location/XqTAS1kTiw19f9dh8t44/images/4393efdc-34ae-4bf9-8fca-5edd29f02ae8.png"
                                    height="125" width="auto" loading="lazy"
                                    className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                    data-v-69838085=""
                                    src="https://storage.googleapis.com/highlevel-backend.appspot.com/location/XqTAS1kTiw19f9dh8t44/images/4393efdc-34ae-4bf9-8fca-5edd29f02ae8.png" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="section-TXcLQSWcM" className="fullSection none noBorder radius0 none c-section c-wrapper section-TXcLQSWcM"
              data-v-44243b2d="">
              <div className="bg bgCover"
                style={{
                  background: "url(https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/6178102ac680d79e16860f84.jpeg)", opacity: "1"
                }}
                data-v-2aaf018b="" ></div>
              <div className="inner" data-v-44243b2d="">
                <div id="row-8ILrYuECsb" className="row-align-center none noBorder radius0 none c-row c-wrapper row-8ILrYuECsb"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-AVq06bncO" className="c-column c-wrapper col-AVq06bncO" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-Kmi6FAWLf" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-Kmi6FAWLf text-output cheading-Kmi6FAWLf none noBorder radius0 none">
                            <div>
                              <h1>DCG <strong>INVITATION ONLY ELITE MASTERMIND CLUB</strong>!!!</h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-npvewSjmt" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-npvewSjmt text-output csub-heading-npvewSjmt none noBorder radius0 none">
                            <div>
                              <h2>UPGRADE TO TEAM DCG ELITE - A Special <strong>MASTERMIND UNIT WORKING WITH JAMAR'S INNER
                                CIRCLE.</strong></h2>
                              <h2><strong>WORK WITH THE SELECTED MASTERMIND TRADERS </strong>FROM JAMARS INNER CIRCLE. GET
                                UNLIMITED ACCESS. </h2>
                              <h2><strong>WORK DIRECTLY WITH DCG ELITE THE MOST PROFITABLE GROUP OF TRADERS IN DCG.</strong>
                              </h2>
                              <p> <strong>WE WIN TOGETHER..</strong></p>
                            </div>
                          </div>
                        </div>
                        <div id="video-blJFCo3p4" className="c-video c-wrapper video-blJFCo3p4" data-v-44243b2d="">
                          <figure className="youtube figure cvideo-blJFCo3p4 none noBorder radius0 none" style={{
                            width: "100%"
                          }}
                            data-v-e08fb840="" >
                            <div data-v-e08fb840="" id="video-blJFCo3p4" className="video-container">
                              <div data-v-e08fb840="" className="iframe-container" style={{
                                paddingBottom: "56.25%"
                              }}> <iframe
                                data-v-e08fb840=""
                                title='youtube1'
                                src="https://www.youtube.com/embed/7qfdtE9pkiM?autoplay=1&amp;rel=0&amp;controls=1&amp;mute=1"
                                allow="autoplay" allowFullScreen="allowfullscreen"></iframe></div>
                            </div>
                          </figure>
                        </div>
                        <div id="button-zGqq7_8D4" className="c-button c-wrapper button-zGqq7_8D4" data-v-44243b2d="">
                          <Link to={`/checkoutsub2/${eliteProduct._id}`} style={{
                            textDecoration: 'none',
                            color: 'white'
                          }}>
                            <button
                              id="button-zGqq7_8D4"
                              className="cbutton-zGqq7_8D4 buttonElevate btnshadow custom btn-vp btn-hp noBorder radius0 none"
                              data-v-87df0c64="">
                              <div className="main-heading-group" data-v-87df0c64="">
                                <div className="button-icon-start" data-v-87df0c64=""></div>
                                <div className="main-heading-button" data-v-87df0c64="">Join DCG ELITE INNER CIRCLE</div>
                                <div className="button-icon-end" data-v-87df0c64=""></div>
                              </div>
                              <div className="text-xs font-sans" data-v-87df0c64="">
                                <div className="sub-heading-button" data-v-87df0c64="">GET ACCESS TO DCG ELITE 2022</div>
                              </div>
                              <div className="btn-loader-position" style={{ display: "none" }} data-v-87df0c64="">
                                <div className="v-spinner" style={{ display: "none" }} data-v-87df0c64="">
                                  <div className="v-moon v-moon1" style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <div className="v-moon v-moon2"
                                      style={{ height: "4.285714285714286px", width: "4.285714285714286px", borderRadius: "100%", top: "12.857142857142858px", backgroundColor: "rgb(255, 255, 255)" }}>
                                    </div>
                                    <div className="v-moon v-moon3"
                                      style={{ height: "30px", width: "30px", borderRadius: "100%", border: "4.285714285714286px solid rgb(255, 255, 255)" }} >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div >
                  </div >
                </div >
              </div >
            </div >
            <div id="section-4tK6QSfAS" className="fullSection none noBorder radius0 none c-section c-wrapper section-4tK6QSfAS"
              data-v-44243b2d="">
              <div className="inner" data-v-44243b2d="">
                <div id="row-HZEtQeyoT7" className="row-align-center none noBorder radius0 none c-row c-wrapper row-HZEtQeyoT7"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-gw800S0-2" className="c-column c-wrapper col-gw800S0-2" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-NUpDUiH7k" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-NUpDUiH7k text-output cheading-NUpDUiH7k none noBorder radius0 none">
                            <div>
                              <h1><strong>What's Inside</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-J5Q5n7PT9" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-J5Q5n7PT9 text-output csub-heading-J5Q5n7PT9 none noBorder radius0 none">
                            <div>
                              <h2>GET ACCESS TO <strong>VARIOUS STRATERGIES </strong>AND <strong>VARIOUS TRICKS</strong>
                                THAT<strong> MASTERMINDS</strong> USE TO <strong>TRADE</strong></h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="row-61oduShmf" className="row-align-center none noBorder radius0 none c-row c-wrapper row-61oduShmf"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-wi-8CBlpG6" className="c-column c-wrapper col-wi-8CBlpG6" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-CfDu0Js-K" className="c-image c-wrapper image-CfDu0Js-K" data-v-44243b2d="">
                          <div id="image-CfDu0Js-K" className="image-container cimage-CfDu0Js-K" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a429686c229f39325.jpeg"
                                height="480" width="auto" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a429686c229f39325.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-uOkyTwfELz" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-uOkyTwfELz text-output cheading-uOkyTwfELz none noBorder radius0 none">
                            <div>
                              <h1><strong>Break Down Of DCG Mastermind Report</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-b06pE4Z8r" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-b06pE4Z8r text-output csub-heading-b06pE4Z8r none noBorder radius0 none">
                            <div>
                              <h2>Get <strong>exclusives insight</strong> on the trades inside the report and detailed
                                explanation on what to <strong>purchase</strong> and when to <strong>exit</strong>!</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-zxNZq4m4W-" className="c-column c-wrapper col-zxNZq4m4W-" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-gwbcfhrErt" className="c-image c-wrapper image-gwbcfhrErt" data-v-44243b2d="">
                          <div id="image-gwbcfhrErt" className="image-container cimage-gwbcfhrErt" style={{
                            cursor: "default"
                          }} data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/6179720d587b0964dd7d5eed.jpeg"
                                height="480" width="auto" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/6179720d587b0964dd7d5eed.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-3OTm4RpjYd" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-3OTm4RpjYd text-output cheading-3OTm4RpjYd none noBorder radius0 none">
                            <div>
                              <h1><strong>Expand Deeper Into The Intro Crypto Course</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-u-TZVckgB" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-u-TZVckgB text-output csub-heading-u-TZVckgB none noBorder radius0 none">
                            <div>
                              <h2>Get the <strong>in-depth</strong> knowledge about <strong>Crypto currencies</strong> and
                                dive deeper with <strong>Crypto Black</strong>.</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="row-uBiL-jS3e" className="row-align-center none noBorder radius0 none c-row c-wrapper row-uBiL-jS3e"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-q-NMuJJkZg" className="c-column c-wrapper col-q-NMuJJkZg" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-Hk7aGl4HLf" className="c-image c-wrapper image-Hk7aGl4HLf" data-v-44243b2d="">
                          <div id="image-Hk7aGl4HLf" className="image-container cimage-Hk7aGl4HLf" style={{ cursor: "default" }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a4296864b8bf39320.jpeg"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a4296864b8bf39320.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-5zLoTpbi1g" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-5zLoTpbi1g text-output cheading-5zLoTpbi1g none noBorder radius0 none">
                            <div>
                              <h1><strong>Stocks and Options - The Source</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-thwh0LuKD" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-thwh0LuKD text-output csub-heading-thwh0LuKD none noBorder radius0 none">
                            <div>
                              <h2>Access The <strong>Masterminds</strong> Who Select The <strong>Best DCG picks</strong>.
                              </h2>
                              <h2>Know which <strong>Stocks and Options</strong> are being bought!</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-ttEcFSe9GU" className="c-column c-wrapper col-ttEcFSe9GU" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-swlPsRM5Ny" className="c-image c-wrapper image-swlPsRM5Ny" data-v-44243b2d="">
                          <div id="image-swlPsRM5Ny" className="image-container cimage-swlPsRM5Ny" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a6b8546703d810997.jpeg"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a6b8546703d810997.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-zKZcovFOHa" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-zKZcovFOHa text-output cheading-zKZcovFOHa none noBorder radius0 none">
                            <div>
                              <h1><strong>Trade Forex Live</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-8h1PhCKNz" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-8h1PhCKNz text-output csub-heading-8h1PhCKNz none noBorder radius0 none">
                            <div>
                              <h2>Get the in-depth <strong>knowledge</strong> about<strong> Foreign Exchanges</strong> and
                                how it works</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div >
                </div >
                <div id="row-dvOqU9_Ug" className="row-align-center none noBorder radius0 none c-row c-wrapper row-dvOqU9_Ug"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-X3CCZAReZc" className="c-column c-wrapper col-X3CCZAReZc" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-I6pCT7X8Xp" className="c-image c-wrapper image-I6pCT7X8Xp" data-v-44243b2d="">
                          <div id="image-I6pCT7X8Xp" className="image-container cimage-I6pCT7X8Xp" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a429686f312f39321.jpeg"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a429686f312f39321.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-x3na2hslrE" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-x3na2hslrE text-output cheading-x3na2hslrE none noBorder radius0 none">
                            <div>
                              <h1><strong>Be Your Own Bank</strong> </h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-cpMp2k2yz" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-cpMp2k2yz text-output csub-heading-cpMp2k2yz none noBorder radius0 none">
                            <div>
                              <h2>An in-depth guide on how to take a loan from <strong>Youself</strong> </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-OiQuPr1yzA" className="c-column c-wrapper col-OiQuPr1yzA" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-2Wj75ahPta" className="c-image c-wrapper image-2Wj75ahPta" data-v-44243b2d="">
                          <div id="image-2Wj75ahPta" className="image-container cimage-2Wj75ahPta" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a6b8546357b810998.jpeg"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a6b8546357b810998.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-zSVnEGveiF" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-zSVnEGveiF text-output cheading-zSVnEGveiF none noBorder radius0 none">
                            <div>
                              <h1><strong>DCG NFT Elite Access</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-LsngKiWY6" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-LsngKiWY6 text-output csub-heading-LsngKiWY6 none noBorder radius0 none">
                            <div>
                              <h2>NFT are an <strong>Intangible Assets</strong> and with the correct knowledge you can just
                                live on passive incomes</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div >
                </div >
                <div id="row-KWXyRfeKR" className="row-align-center none noBorder radius0 none c-row c-wrapper row-KWXyRfeKR"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-lDNc1s02ne" className="c-column c-wrapper col-lDNc1s02ne" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-4ObAsAkb0" className="c-image c-wrapper image-4ObAsAkb0" data-v-44243b2d="">
                          <div id="image-4ObAsAkb0" className="image-container cimage-4ObAsAkb0" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a6b854679e6810996.jpeg"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a6b854679e6810996.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-pDwHM9eur" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-pDwHM9eur text-output cheading-pDwHM9eur none noBorder radius0 none">
                            <div>
                              <h1><strong>Alligator Strategy</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-WMzdfwwf9" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-WMzdfwwf9 text-output csub-heading-WMzdfwwf9 none noBorder radius0 none">
                            <div>
                              <h2>DCG Primary Strategy For Swing Trades. Learn how DCG <strong>MASTERMIND Traders</strong>
                                benefit from swing trading and get exclusive access to when this strategy will lead to
                                profitability..</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-YYsySIKfBY" className="c-column c-wrapper col-YYsySIKfBY" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-CGg7fypqhv" className="c-image c-wrapper image-CGg7fypqhv" data-v-44243b2d="">
                          <div id="image-CGg7fypqhv" className="image-container cimage-CGg7fypqhv" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a4296867a68f39322.jpeg"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a4296867a68f39322.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-6JLweL46eG" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-6JLweL46eG text-output cheading-6JLweL46eG none noBorder radius0 none">
                            <div>
                              <h1><strong>7 Day Strategy</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-tXiowuiSq" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-tXiowuiSq text-output csub-heading-tXiowuiSq none noBorder radius0 none">
                            <div>
                              <h2>A collection of <strong>Strategies and Tricks</strong> that you will have access to on how
                                to make your every trade profitable.</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div >
                </div >
                <div id="row-kTzl19tEH" className="row-align-center none noBorder radius0 none c-row c-wrapper row-kTzl19tEH"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-9RpJCMd1Iv" className="c-column c-wrapper col-9RpJCMd1Iv" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-gaRjEijNtH" className="c-image c-wrapper image-gaRjEijNtH" data-v-44243b2d="">
                          <div id="image-gaRjEijNtH" className="image-container cimage-gaRjEijNtH" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a4296862a4af39324.jpeg"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a4296862a4af39324.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-a5lPj_49mr" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-a5lPj_49mr text-output cheading-a5lPj_49mr none noBorder radius0 none">
                            <div>
                              <h1><strong>DCG Wealth Building Toolbox</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-JOC4oYT0S" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-JOC4oYT0S text-output csub-heading-JOC4oYT0S none noBorder radius0 none">
                            <div>
                              <h2>A <strong>CAccess To DCG Business and Finances Resources. Monthly Special Access Classes
                                to help </strong>your wealth grow!</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-17j98s7yWr" className="c-column c-wrapper col-17j98s7yWr" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-bJH2vMPF90" className="c-image c-wrapper image-bJH2vMPF90" data-v-44243b2d="">
                          <div id="image-bJH2vMPF90" className="image-container cimage-bJH2vMPF90" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a429686d259f39323.jpeg"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a429686d259f39323.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-Dc9E7BsfUF" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-Dc9E7BsfUF text-output cheading-Dc9E7BsfUF none noBorder radius0 none">
                            <div>
                              <h1><strong>DCG Special Elite Alerts</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-Rv_SUhVGz" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-Rv_SUhVGz text-output csub-heading-Rv_SUhVGz none noBorder radius0 none">
                            <div>
                              <h2>Get The Most Important Alerts In A <strong>Private Alert Group</strong>.</h2>
                              <h2><strong>Additional Details</strong> Will Be Provided On Alerts.</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div >
                </div >
                <div id="row-pjGLxq4AB" className="row-align-center none noBorder radius0 none c-row c-wrapper row-pjGLxq4AB"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col--Bs5dF9nT7" className="c-column c-wrapper col--Bs5dF9nT7" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-asT89ht_m6" className="c-image c-wrapper image-asT89ht_m6" data-v-44243b2d="">
                          <div id="image-asT89ht_m6" className="image-container cimage-asT89ht_m6" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a4296862c5ff39327.jpeg"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/617c399a4296862c5ff39327.jpeg" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-rfukC1ZD2e" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-rfukC1ZD2e text-output cheading-rfukC1ZD2e none noBorder radius0 none">
                            <div>
                              <h1><strong>Replay Access To The 30 days private Masterclass</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-Sp7tuYp-D" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-Sp7tuYp-D text-output csub-heading-Sp7tuYp-D none noBorder radius0 none">
                            <div>
                              <h2>Get Access To A <strong>Special Stocks and Option private masterclass</strong> replay to
                                take your <strong>crypto and stocks options</strong> trading to the next level. </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-g2W-iDzkcZ" className="c-column c-wrapper col-g2W-iDzkcZ" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-uUjBzq6aSG" className="c-image c-wrapper image-uUjBzq6aSG" data-v-44243b2d="">
                          <div id="image-uUjBzq6aSG" className="image-container cimage-uUjBzq6aSG" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/6183b44bed3829c9d5d46cf0.png"
                                height="auto" width="480" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://storage.googleapis.com/msgsndr/XqTAS1kTiw19f9dh8t44/media/6183b44bed3829c9d5d46cf0.png" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="heading-47ANHsEl7h" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-47ANHsEl7h text-output cheading-47ANHsEl7h none noBorder radius0 none">
                            <div>
                              <h1><strong>A private exclusive DCG group with direct access to the DCG Elite Team.</strong>
                              </h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-f_8NA_7yA" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-f_8NA_7yA text-output csub-heading-f_8NA_7yA none noBorder radius0 none">
                            <div>
                              <h2>Get Exclusive invites into DCG teams. Join our <strong>Inner MASTERMIND Circle
                              </strong>and get<strong> access to 1 team per month.</strong></h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div >
                </div >
                <div id="row-tByNqx4Ut" className="row-align-center none noBorder radius0 none c-row c-wrapper row-tByNqx4Ut"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-2J-p0T3m_g" className="c-column c-wrapper col-2J-p0T3m_g" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-BxJshR4sLk" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-BxJshR4sLk text-output cheading-BxJshR4sLk none noBorder radius0 none">
                            <div>
                              <h1><strong>Also Get Exclusive Insider knowledge with </strong></h1>
                              <h1><strong>Weekly Trading Calls with specific MASTERMINDS.</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-H3mNAS1XW" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-H3mNAS1XW text-output csub-heading-H3mNAS1XW none noBorder radius0 none">
                            <div>
                              <h2>GET TO KNOW ALL THE TRADING STRATERGY USED BY THE <strong>MASTERMINDS </strong>ON </h2>
                              <h2> WEEKLY Zoom TRADING SESSIONS</h2>
                            </div>
                          </div>
                        </div>
                        <div id="button-57LDb9ifn" className="c-button c-wrapper button-57LDb9ifn" data-v-44243b2d="">
                          <Link to={`/checkoutsub2/${eliteProduct._id}`} style={{
                            textDecoration: 'none',
                            color: 'white'
                          }}>
                            <button
                              id="button-57LDb9ifn"
                              className="cbutton-57LDb9ifn buttonElevate btnshadow custom btn-vp btn-hp noBorder radius0 none"
                              data-v-87df0c64="">
                              <div className="main-heading-group" data-v-87df0c64="">
                                <div className="button-icon-start" data-v-87df0c64=""></div>
                                <div className="main-heading-button" data-v-87df0c64="">GET ACCESS FOR $1000 A Month.</div>
                                <div className="button-icon-end" data-v-87df0c64=""></div>
                              </div>
                              <div className="text-xs font-sans" data-v-87df0c64="">
                                <div className="sub-heading-button" data-v-87df0c64="">GET ACCESS TO DCG EXCLUSIVE</div>
                              </div>
                              <div className="btn-loader-position" style={{ display: "none" }} data-v-87df0c64="">
                                <div className="v-spinner" style={{ display: "none" }} data-v-87df0c64="">
                                  <div className="v-moon v-moon1" style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <div className="v-moon v-moon2"
                                      style={{ height: "4.285714285714286px", width: "4.285714285714286px", borderRadius: "100%", top: "12.857142857142858px", backgroundColor: "rgb(255, 255, 255)" }}>
                                    </div>
                                    <div className="v-moon v-moon3"
                                      style={{ height: "30px", width: "30px", borderRadius: "100%", border: "4.285714285714286px solid rgb(255, 255, 255)" }}>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button >
                          </Link>
                        </div >
                      </div >
                    </div >
                  </div >
                </div >
              </div >
            </div >
            <div id="section-HCMfBNl2Y" className="fullSection none noBorder radius0 none c-section c-wrapper section-HCMfBNl2Y"
              data-v-44243b2d="">
              <div className="inner" data-v-44243b2d="">
                <div id="row-TG1kxTf-P1" className="row-align-center none noBorder radius0 none c-row c-wrapper row-TG1kxTf-P1"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-4wWx0pV7YW" className="c-column c-wrapper col-4wWx0pV7YW" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-EoSlAX0nDg" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-EoSlAX0nDg text-output cheading-EoSlAX0nDg none noBorder radius0 none">
                            <div>
                              <h1><strong>WE GIVE YOU EVERYTHING YOU NEED, IN ADVANCE.</strong></h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="row-0SQC_am7xN" className="row-align-center none noBorder radius0 none c-row c-wrapper row-0SQC_am7xN"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-gsxB6Q8vPx" className="c-column c-wrapper col-gsxB6Q8vPx" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="bulletList-4NnBOfMFjg" className="c-bullet-list c-wrapper" data-v-44243b2d="">
                          <div className="bulletList-4NnBOfMFjg text-output cbulletList-4NnBOfMFjg none noBorder radius0 none">
                            <div>
                              <ul>
                                <li>Access To The <strong>NFT Special Elite Group</strong></li>
                                <li>Virtual Land, Gaming, And Digital Arts.</li>
                                <li>DCG <strong>Mastermind Material And Alerts.</strong></li>
                                <li>Access To <strong>Special Energy &amp; Mindset Trainings</strong>.</li>
                                <li>Get Access and support on all the trading view Templates And Strategies we use while
                                  trading.</li>
                                <li>Access To All Special Business Growth hacks and income opportunities for the ELITE.</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-4sYo_WFDjI" className="c-column c-wrapper col-4sYo_WFDjI" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="bulletList-pwHIthVtt_" className="c-bullet-list c-wrapper" data-v-44243b2d="">
                          <div className="bulletList-pwHIthVtt_ text-output cbulletList-pwHIthVtt_ none noBorder radius0 none">
                            <div>
                              <ul>
                                <li>Access To <strong>Alligator Strategy</strong>.</li>
                                <li>Access To Get Set Up On Special DCG Index Fund Setup.</li>
                                <li>How To Identify What To Buy, When, and Why.</li>
                                <li>Learn how to <strong>manage your bank (BYOB) information </strong>that saves you time.
                                </li>
                                <li>You will be around others that are <strong>Winning</strong>.</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="row-aZhJX0QmBc" className="row-align-center none noBorder radius0 none c-row c-wrapper row-aZhJX0QmBc"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-8UgGqwBPuj" className="c-column c-wrapper col-8UgGqwBPuj" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="button--rqIbunzcb" className="c-button c-wrapper button--rqIbunzcb" data-v-44243b2d="">
                          <Link to={`/checkoutsub2/${eliteProduct._id}`} style={{
                            textDecoration: 'none',
                            color: 'white'
                          }}>
                            <button
                              id="button--rqIbunzcb"
                              className="cbutton--rqIbunzcb buttonElevate btnshadow custom btn-vp btn-hp noBorder radius0 none"
                              data-v-87df0c64="">
                              <div className="main-heading-group" data-v-87df0c64="">
                                <div className="button-icon-start" data-v-87df0c64=""></div>
                                <div className="main-heading-button" data-v-87df0c64="">GET ACCESS FOR $1000</div>
                                <div className="button-icon-end" data-v-87df0c64=""></div>
                              </div>
                              <div className="text-xs font-sans" data-v-87df0c64="">
                                <div className="sub-heading-button" data-v-87df0c64="">GET ACCESS TO DCG ELITE</div>
                              </div>
                              <div className="btn-loader-position" style={{ display: "none" }} data-v-87df0c64="">
                                <div className="v-spinner" style={{ display: "none" }} data-v-87df0c64="">
                                  <div className="v-moon v-moon1" style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <div className="v-moon v-moon2"
                                      style={{ height: "4.285714285714286px", width: "4.285714285714286px", borderRadius: "100%", top: "12.857142857142858px", backgroundColor: "rgb(255, 255, 255)" }}>
                                    </div>
                                    <div className="v-moon v-moon3" style={{ height: "30px", width: "30px", borderRadius: "100%", border: "4.285714285714286px solid rgb(255, 255, 255)" }}>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </Link>
                        </div>
                      </div >
                    </div >
                  </div >
                </div >
              </div >
            </div >
            <div id="section-BPVZKRSzF" className="fullSection none noBorder radius0 none c-section c-wrapper section-BPVZKRSzF"
              data-v-44243b2d="">
              <div className="inner" data-v-44243b2d="">
                <div id="row-NHSexlS_OO"
                  className="row-align-center shadow40 noBorder radius0 none c-row c-wrapper row-NHSexlS_OO" data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-YU7K70Ax48" className="c-column c-wrapper col-YU7K70Ax48" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-MhobXlJ_bG" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-MhobXlJ_bG text-output cheading-MhobXlJ_bG none noBorder radius0 none">
                            <div>
                              <h1><strong>Special DCG ELITE - Invite Only Access Training Schedule</strong></h1>
                            </div>
                          </div>
                        </div>
                        <div id="bulletList-F-nnJ9bPc1" className="c-bullet-list c-wrapper" data-v-44243b2d="">
                          <div className="bulletList-F-nnJ9bPc1 text-output cbulletList-F-nnJ9bPc1 none noBorder radius0 none">
                            <div>
                              <ul>
                                <li><strong>TRADING BOOTCAMP</strong> (EVERY TUESDAY AND THURSDAY NIGHT COURSE FOR
                                  BEGINNERS)</li>
                                <li><strong>Market Cycle Course</strong> ( Learn To Trade Seasonality and Market Cycles)
                                  Trading With A Full-Time Job</li>
                                <li><strong>Our Trading Is 24 Hours</strong> – Access Live Recordings Daily Even IF You Are
                                  Not Able To Attend Live</li>
                                <li><strong>Access to all of our revised Courses For 2021</strong></li>
                                <li><strong>Stocks and Options 101</strong></li>
                                <li><strong>Crypto Trading 101</strong></li>
                                <li><strong>Forex Trading 101</strong></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="section-RdxX-eLXU" className="fullSection none noBorder radius0 none c-section c-wrapper section-RdxX-eLXU"
              data-v-44243b2d="">
              <div className="bg bgCover"
                style={{ background: "url(https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2F93708956-7ef3-419e-a66d-40a98e6c1c80.png?alt=media)", opacity: "0.3" }}
                data-v-2aaf018b=""></div>
              <div className="inner" data-v-44243b2d="">
                <div id="row-z2s77rZ4Ru" className="row-align-center none noBorder radius0 none c-row c-wrapper row-z2s77rZ4Ru"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-BVFpeHC2YW" className="c-column c-wrapper col-BVFpeHC2YW" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-V6ZkRrQjlR" className="c-image c-wrapper image-V6ZkRrQjlR" data-v-44243b2d="">
                          <div id="image-V6ZkRrQjlR" className="image-container cimage-V6ZkRrQjlR" style={{ cursor: "default" }}
                            data-v-34293473="">
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt="" height="auto"
                                src="https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2F7e7fc34a-872b-4225-be18-f34bba79c7c1.jpeg?alt=media"
                                width="auto" className="img-round-corners img-border-none img-shadow-none img-effects-none"
                                data-v-69838085="" /></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-Vg0JouHXfB" className="c-column c-wrapper col-Vg0JouHXfB" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-0InJ7Zn9iu" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-0InJ7Zn9iu text-output cheading-0InJ7Zn9iu none noBorder radius0 none">
                            <div>
                              <p><strong>No Greater Opportunity In Crypto! </strong></p>
                              <p><strong>Bitcoin Gains Have Been GREAT!</strong></p>
                              <p><strong> </strong></p>
                              <p><strong>NFT's, DeFi, Digital Art, Digital Real Estate Has Exploded</strong></p>
                              <p><strong>DO NOT MISS OUT, AGAIN.</strong></p>
                              <p><br /></p>
                              <p><strong>Missed Bitcoin at .01 In 2009?</strong></p>
                              <p><strong>Never Again </strong></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="row-a3xziAEWsZ" className="row-align-center none noBorder radius0 none c-row c-wrapper row-a3xziAEWsZ"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-jAy7GYCkzc" className="c-column c-wrapper col-jAy7GYCkzc" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-k-DlWxc_z7" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-k-DlWxc_z7 text-output cheading-k-DlWxc_z7 none noBorder radius0 none">
                            <div>
                              <p><strong>DCG EXPERT ACCESS TO ELITE MASTERMIND MEMBERS</strong></p>
                              <p><strong>YOU WILL LEARN, YOU WILL PROFIT:</strong></p>
                            </div>
                          </div>
                        </div>
                        <div id="bulletList-Ok1dwm7UQ0" className="c-bullet-list c-wrapper" data-v-44243b2d="">
                          <div className="bulletList-Ok1dwm7UQ0 text-output cbulletList-Ok1dwm7UQ0 none noBorder radius0 none">
                            <div>
                              <ul>
                                <li><strong>Identify what resources you must have in 2022 to make huge profits</strong>
                                  (Crypto moves at the speed of light and you have the opportunity to be at the forefront.)
                                </li>
                                <li><strong>How much money can really be made? </strong>Let us show you some of our biggest
                                  wins. Leverage our experience...</li>
                                <li><strong>Defi-The new way to build generational wealth?</strong> Defi has given us a huge
                                  opportunity, we will reveal why.</li>
                                <li><strong>A Digital Currency Real Estate Broker.</strong> The advantage of virtual real
                                  estate. The new monopoly game.</li>
                                <li><strong>Day Trading, Swing Trading, Investing, to now focused on NFT's?
                                </strong>Knowledge is truly power, if you have time to watch youtube for 1 hour a day, we
                                  will show you significant gains. Anyone can generate unbelievable returns with NFT's.</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="row-YAPSMMgfrQ" className="row-align-center none noBorder radius0 none c-row c-wrapper row-YAPSMMgfrQ"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-5INiJ_SAFA" className="c-column c-wrapper col-5INiJ_SAFA" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="button-ZkuQctWiFs" className="c-button c-wrapper button-ZkuQctWiFs" data-v-44243b2d="">
                          <Link to={`/checkoutsub2/${eliteProduct._id}`} style={{
                            textDecoration: 'none',
                            color: 'white'
                          }}>
                            <button
                              id="button-ZkuQctWiFs"
                              className="cbutton-ZkuQctWiFs buttonBounce button-shadow-sharp1 custom btn-vp btn-hp borderFull radius3 none"
                              data-v-87df0c64="">
                              <div className="main-heading-group" data-v-87df0c64="">
                                <div className="button-icon-start" data-v-87df0c64=""></div>
                                <div className="main-heading-button" data-v-87df0c64="">Be The First To Profit From This </div>
                                <div className="button-icon-end" data-v-87df0c64=""></div>
                              </div>
                              <div className="text-xs font-sans" data-v-87df0c64="">
                                <div className="sub-heading-button" data-v-87df0c64="">Dont Miss This Chance</div>
                              </div>
                              <div className="btn-loader-position" style={{ display: "none" }} data-v-87df0c64="">
                                <div className="v-spinner" style={{ display: "none" }} data-v-87df0c64="">
                                  <div className="v-moon v-moon1" style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <div className="v-moon v-moon2" style={{ height: "4.285714285714286px", width: "4.285714285714286px", borderRadius: "100%", top: "12.857142857142858px", backgroundColor: "rgb(255, 255, 255)" }}>
                                    </div>
                                    <div className="v-moon v-moon3"
                                      style={{ height: "30px", width: "30px", borderRadius: "100%", border: "4.285714285714286px solid rgb(255, 255, 255)" }}>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button >
                          </Link>
                        </div >
                        <div id="sub-heading-4Oxf6n-RWo" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div
                            className="sub-heading-4Oxf6n-RWo text-output csub-heading-4Oxf6n-RWo none noBorder radius0 none">
                            <div>
                              <p>ONLY <s>$2100</s><strong> $1000</strong></p>
                            </div>
                          </div>
                        </div>
                        <div id="image-Sybc4AgE5H" className="c-image c-wrapper image-Sybc4AgE5H" data-v-44243b2d="">
                          <div id="image-Sybc4AgE5H" className="image-container cimage-Sybc4AgE5H" style={{ cursor: "default" }}
                            data-v-34293473="">
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2Fa7e43986-a640-48d9-95a7-d831ae66e233.jpg?alt=media"
                                height="auto" width="300" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2Fa7e43986-a640-48d9-95a7-d831ae66e233.jpg?alt=media" />
                              </div>
                            </div>
                          </div>
                        </div >
                      </div >
                    </div >
                  </div >
                </div >
              </div >
            </div >
            <div id="section-gDj-TDyiF" className="radius0 noBorder c-section c-wrapper section-gDj-TDyiF" data-v-44243b2d="">
              <div className="bg fill-width-height"
                style={{
                  background: "url(https://cdn.msgsndr.com/location%2Fmglu0JjZ8I5DcjKayjsO%2Fimages%2F61df7c36-4f61-4fa7-ba4c-6a0b68e3c50d.jpg?alt=media&amp;token=453095ac-d5b6-4e1c-abff-640d30c7fbf6)", opacity: "1"
                }}
                data-v-2aaf018b="" ></div>
              <div className="inner" data-v-44243b2d="">
                <div id="row-9i_-xbQoZ_" className="row-align-center radius0 noBorder c-row c-wrapper row-9i_-xbQoZ_"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-dQVChgHQ1k" className="c-column c-wrapper col-dQVChgHQ1k" data-v-44243b2d="">
                      <div className="inner radius0 noBorder bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-qyAeVO6Tfz" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-qyAeVO6Tfz text-output cheading-qyAeVO6Tfz radius0 noBorder">
                            <div>
                              <p><strong>Access To The Proven 7 Day Trading Training And Crypto Resource Guide For New
                                Traders! </strong></p>
                            </div>
                          </div>
                        </div>
                        <div id="heading-Mrf3ecY3gT" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-Mrf3ecY3gT text-output cheading-Mrf3ecY3gT radius0 noBorder">
                            <div>
                              <p>The complete trading challenge for new traders. Easy step by step strategy that gives you
                                the trading blueprint and strategy needed to become a profitable trader. Learn how to trade
                                and become profitable right away. You have never been exposed to trading like this!</p>
                            </div>
                          </div>
                        </div>
                        <div id="button-2DM8AgdDer" className="c-button c-wrapper button-2DM8AgdDer" data-v-44243b2d="">
                          <Link to={`/checkoutsub2/${eliteProduct._id}`} style={{
                            textDecoration: 'none',
                            color: 'white'
                          }}>
                            <button
                              id="button-2DM8AgdDer"
                              className="cbutton-2DM8AgdDer radius3 borderFull btn-hp-25 button-vp-15 none button-shadow-sharp1 buttonElevate"
                              data-v-87df0c64="">
                              <div className="main-heading-group" data-v-87df0c64="">
                                <div className="button-icon-start" data-v-87df0c64=""></div>
                                <div className="main-heading-button" data-v-87df0c64="">Click The Button And You Will Gain Access
                                  To The Perfect Strategy!</div>
                                <div className="button-icon-end" data-v-87df0c64=""></div>
                              </div>
                              <div className="btn-loader-position" style={{ display: "none" }} data-v-87df0c64="">
                                <div className="v-spinner" style={{ display: "none" }} data-v-87df0c64="">
                                  <div className="v-moon v-moon1" style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <div className="v-moon v-moon2"
                                      style={{ height: "4.285714285714286px", width: "4.285714285714286px", borderRadius: "100%", top: "12.857142857142858px", backgroundColor: "rgb(255, 255, 255)" }}>
                                    </div>
                                    <div className="v-moon v-moon3"
                                      style={{ height: "30px", width: "30px", borderRadius: "100%", border: "4.285714285714286px solid rgb(255, 255, 255)" }}>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </Link>
                        </div >
                      </div >
                    </div >
                    <div id="col-V3b7eZPbAa" className="c-column c-wrapper col-V3b7eZPbAa" data-v-44243b2d="">
                      <div className="inner radius0 noBorder bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-m4HHbepqJH" className="c-image c-wrapper image-m4HHbepqJH" data-v-44243b2d="">
                          <div id="image-m4HHbepqJH" className="image-container cimage-m4HHbepqJH" style={{
                            cursor: "pointer"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2F652c1f29-8906-4f70-9f04-8f4ccb76beb8.jpeg?alt=media"
                                height="auto" width="auto" loading="lazy" className="lazyload radius0 image-white-border"
                                data-v-69838085=""
                                src="https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2F652c1f29-8906-4f70-9f04-8f4ccb76beb8.jpeg?alt=media" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div >
                  </div >
                </div >
              </div >
            </div >
            <div id="section-PQyXvnuia" className="radius0 noBorder c-section c-wrapper section-PQyXvnuia" data-v-44243b2d="">
              <div className="inner" data-v-44243b2d="">
                <div id="row-XxUhRdw7WB" className="row-align-center radius0 noBorder c-row c-wrapper row-XxUhRdw7WB"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-DY6vZ7GWjL" className="c-column c-wrapper col-DY6vZ7GWjL" data-v-44243b2d="">
                      <div className="inner radius0 noBorder bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-zHxZG3Lz3M" className="c-image c-wrapper image-zHxZG3Lz3M" data-v-44243b2d="">
                          <div id="image-zHxZG3Lz3M" className="image-container cimage-zHxZG3Lz3M" style={{
                            cursor: "pointer"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt="" height="auto"
                                src="https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2Fe0257ca8-c3f8-46f5-abe2-997ba90d76d8.jpg?alt=media"
                                width="350" className="radius0 img-border-none img-circle" data-v-69838085="" /></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-sGyjunWsTX" className="c-column c-wrapper col-sGyjunWsTX" data-v-44243b2d="">
                      <div className="inner radius0 noBorder bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-tDiPDOYATA" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-tDiPDOYATA text-output cheading-tDiPDOYATA radius0 noBorder">
                            <div>
                              <p><strong>Impact 2021 SUCCESS STORY</strong></p>
                            </div>
                          </div>
                        </div>
                        <div id="paragraph-1nbM0U6SO-" className="c-paragraph c-wrapper" data-v-44243b2d="">
                          <div className="paragraph-1nbM0U6SO- text-output cparagraph-1nbM0U6SO- radius0 noBorder">
                            <div>
                              <p><strong>"</strong>I never knew that I could feel this confident and focused. Taking these
                                small steps allows me to feel motivated and energized about trading. I am now a more
                                confident trader! I am no longer intimidated by the markets. DCG mindset training is one of
                                the best trading training ever. Thanks a million!<strong>"</strong></p>
                            </div>
                          </div>
                        </div>
                        <div id="sub-heading-k4zqByU4Wc" className="c-sub-heading c-wrapper" data-v-44243b2d="">
                          <div className="sub-heading-k4zqByU4Wc text-output csub-heading-k4zqByU4Wc radius0 noBorder">
                            <div>
                              <p><strong>-Joey C, New York</strong></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div >
            <div id="section-bK-ISAIDD" className="radius0 noBorder c-section c-wrapper section-bK-ISAIDD" data-v-44243b2d="">
              <div className="inner" data-v-44243b2d="">
                <div id="row-6SEn4Ms_Zw" className="row-align-center radius0 noBorder c-row c-wrapper row-6SEn4Ms_Zw"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-XicqKh2HyJ" className="c-column c-wrapper col-XicqKh2HyJ" data-v-44243b2d="">
                      <div className="inner radius0 noBorder bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-Yakoy0r-ZT" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-Yakoy0r-ZT text-output cheading-Yakoy0r-ZT radius0 noBorder">
                            <div>
                              <p>99.9% of our Mastermind member Take Advantage of THE DCG DISCORD SERVICES - Mastermind
                                Report + TEAM ALERTS</p>
                            </div>
                          </div>
                        </div>
                        <div id="heading-4CTiHKu48X" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-4CTiHKu48X text-output cheading-4CTiHKu48X radius0 noBorder">
                            <div>
                              <p>Work with the best trading team IN DCG. Gain Daily Exclusive access to Crypto, Stocks, and
                                Options Experts!</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="col-_ux5DdaKzh" className="c-column c-wrapper col-_ux5DdaKzh" data-v-44243b2d="">
                      <div className="inner radius0 noBorder bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-PJ_4b9xBXF" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-PJ_4b9xBXF text-output cheading-PJ_4b9xBXF radius0 noBorder">
                            <div>
                              <p>Get Access To DCG TEAMS - Joining The DCG Elite Gives You Special Access To SneakPreview of
                                DCG Teams.</p>
                            </div>
                          </div>
                        </div>
                        <div id="heading-HcHeF3mbQ4" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-HcHeF3mbQ4 text-output cheading-HcHeF3mbQ4 radius0 noBorder">
                            <div>
                              <p>Trading Is A Lifestyle! Our Members MAKE A Full Time Trader INCOME WHILE ENJOYING LIFE!</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="section-Mn8r-Ahp0" className="fullSection none noBorder radius0 none c-section c-wrapper section-Mn8r-Ahp0"
              data-v-44243b2d="">
              <div className="bg bgCover"
                style={{ background: "url(https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2F93708956-7ef3-419e-a66d-40a98e6c1c80.png?alt=media)", opacity: "0.3" }}
                data-v-2aaf018b=""></div>
              <div className="inner" data-v-44243b2d="">
                <div id="row-MuQ35_12Nd" className="row-align-center none noBorder radius0 none c-row c-wrapper row-MuQ35_12Nd"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-SEuK3xxZph" className="c-column c-wrapper col-SEuK3xxZph" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="heading-80xEKva54o" className="c-heading c-wrapper" data-v-44243b2d="">
                          <div className="heading-80xEKva54o text-output cheading-80xEKva54o none noBorder radius0 none">
                            <div>
                              <h1><strong>What our MEMBERS have to say about us</strong></h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="row-oAsGfDkE9Q" className="row-align-center none noBorder radius0 none c-row c-wrapper row-oAsGfDkE9Q"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-bRfhaSLD2j" className="c-column c-wrapper col-bRfhaSLD2j" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="video-cYB9nwk5f1" className="c-video c-wrapper video-cYB9nwk5f1" data-v-44243b2d="">
                          <figure className="youtube figure cvideo-cYB9nwk5f1 none noBorder radius0 none" style={{
                            width: "100%"
                          }}
                            data-v-e08fb840="" >
                            <div data-v-e08fb840="" id="video-cYB9nwk5f1" className="video-container">
                              <div data-v-e08fb840="" className="iframe-container" style={{
                                paddingBottom: "56.25%"
                              }}> <iframe
                                data-v-e08fb840=""
                                title='youtube2'
                                src="https://www.youtube.com/embed/62Xj5WXShpM?autoplay=1&amp;rel=0&amp;controls=1&amp;mute=1"
                                allow="autoplay" allowFullScreen="allowfullscreen"></iframe></div>
                            </div>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div >
                <div id="row-buACL0gLUW" className="row-align-center none noBorder radius0 none c-row c-wrapper row-buACL0gLUW"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-QOv8ZDGi7B" className="c-column c-wrapper col-QOv8ZDGi7B" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="video-BCeFgx8aVb" className="c-video c-wrapper video-BCeFgx8aVb" data-v-44243b2d="">
                          <figure className="figure cvideo-BCeFgx8aVb none noBorder radius0 none" style={{ width: "100%" }} data-v-e08fb840="" >
                            <Vimeo
                              video="575850724"
                              responsive={true}
                            />
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div id="col-JVAzcAYAD_" className="c-column c-wrapper col-JVAzcAYAD_" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="video-W2VV-AaB4i" className="c-video c-wrapper video-W2VV-AaB4i" data-v-44243b2d="">
                          <figure className="figure cvideo-W2VV-AaB4i none noBorder radius0 none" style={{
                            width: "100%"
                          }} data-v-e08fb840="" >
                            <Vimeo
                              video="575860875"
                              responsive={true}
                            />
                          </figure>
                        </div>
                      </div >
                    </div >
                  </div >
                </div >
                <div id="row-AQlBOFBJFT" className="row-align-center none noBorder radius0 none c-row c-wrapper row-AQlBOFBJFT"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-XLrYvrw1cC" className="c-column c-wrapper col-XLrYvrw1cC" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="video-Mf_Neb0isR" className="c-video c-wrapper video-Mf_Neb0isR" data-v-44243b2d="">
                          <figure className="figure cvideo-Mf_Neb0isR none noBorder radius0 none" style={{ width: "100%" }}
                            data-v-e08fb840="">
                            <Vimeo
                              video="575852128"
                              responsive={true}
                            />
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div id="col-WO7e_X9Xgb" className="c-column c-wrapper col-WO7e_X9Xgb" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="video-HaP3t0dDSMm" className="c-video c-wrapper video-HaP3t0dDSMm" data-v-44243b2d="">
                          <figure className="figure cvideo-HaP3t0dDSMm none noBorder radius0 none" style={{ width: "100%" }}
                            data-v-e08fb840="">
                            <Vimeo
                              video="575851430"
                              responsive={true}
                            />
                          </figure>
                        </div>
                      </div >
                    </div >
                  </div >
                </div >
                <div id="row-9SJ4M7Q4wqB"
                  className="row-align-center none noBorder radius0 none c-row c-wrapper row-9SJ4M7Q4wqB" data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-VGIce77MVVV" className="c-column c-wrapper col-VGIce77MVVV" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="button-7NMGNM86L-o" className="c-button c-wrapper button-7NMGNM86L-o" data-v-44243b2d="">
                          <Link to={`/checkoutsub2/${eliteProduct._id}`} style={{
                            textDecoration: 'none',
                            color: 'white'
                          }}>
                            <button id="button-7NMGNM86L-o"
                              className="cbutton-7NMGNM86L-o buttonElevate btnshadow custom btn-vp btn-hp noBorder radius0 none"
                              data-v-87df0c64="">
                              <div className="main-heading-group" data-v-87df0c64="">
                                <div className="button-icon-start" data-v-87df0c64=""></div>
                                <div className="main-heading-button" data-v-87df0c64="">GET ACCESS FOR $1000</div>
                                <div className="button-icon-end" data-v-87df0c64=""></div>
                              </div>
                              <div className="text-xs font-sans" data-v-87df0c64="">
                                <div className="sub-heading-button" data-v-87df0c64="">GET ACCESS TO ALL OUR TRADING STRATEGIES
                                </div>
                              </div>
                              <div className="btn-loader-position" style={{ display: "none" }} data-v-87df0c64="">
                                <div className="v-spinner" style={{ display: "none" }} data-v-87df0c64="">
                                  <div className="v-moon v-moon1" style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <div className="v-moon v-moon2"
                                      style={{ height: "4.285714285714286px", width: "4.285714285714286px", borderRadius: "100%", top: "12.857142857142858px", backgroundColor: "rgb(255, 255, 255)" }}>
                                    </div>
                                    <div className="v-moon v-moon3" style={{ height: "30px", width: "30px", borderRadius: "100%", border: "4.285714285714286px solid rgb(255, 255, 255)" }}>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button >
                          </Link>
                        </div >
                      </div >
                    </div >
                  </div >
                </div >
              </div >
            </div >
            <div id="section-GxrTM8Sm1" className="fullSection none noBorder radius0 none c-section c-wrapper section-GxrTM8Sm1"
              data-v-44243b2d="">
              <div className="inner" data-v-44243b2d="">
                <div id="row-co9FVRtdh0" className="row-align-center none noBorder radius0 none c-row c-wrapper row-co9FVRtdh0"
                  data-v-44243b2d="">
                  <div className="inner" data-v-44243b2d="">
                    <div id="col-PXQ7Ddhjmf" className="c-column c-wrapper col-PXQ7Ddhjmf" data-v-44243b2d="">
                      <div className="inner none noBorder radius0 none bg bgCover vertical" data-v-44243b2d="">
                        <div id="image-owW8tMttE7" className="c-image c-wrapper image-owW8tMttE7" data-v-44243b2d="">
                          <div id="image-owW8tMttE7" className="image-container cimage-owW8tMttE7" style={{
                            cursor: "default"
                          }}
                            data-v-34293473="" >
                            <div data-v-69838085="" data-v-34293473="">
                              <div data-v-69838085=""><img alt=""
                                data-src="https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2F664f1073-17fe-429d-8426-799a0e200f53.png?alt=media"
                                height="auto" width="100" loading="lazy"
                                className="lazyload img-none img-border-none img-shadow-none img-effects-none"
                                data-v-69838085=""
                                src="https://cdn.msgsndr.com/location%2FXqTAS1kTiw19f9dh8t44%2Fimages%2F664f1073-17fe-429d-8426-799a0e200f53.png?alt=media" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="paragraph-yezq5DdsF0" className="c-paragraph c-wrapper" data-v-44243b2d="">
                          <div className="paragraph-yezq5DdsF0 text-output cparagraph-yezq5DdsF0 none noBorder radius0 none">
                            <div>
                              <p><strong>Copyright © 2021, All Rights Reserved - DCG™</strong></p>
                              <p><br /></p>
                              <p>Trading financial instruments is a challenging and potentially profitable endeavor for
                                educated and disciplined investors who are willing to take an above-average risk on their
                                capital. Before you decide to invest in the markets you should carefully consider your
                                objectives, education, and capability but most importantly your risk aversion. The
                                possibility of sustaining a loss of some or all of your initial investment exists, it´s
                                because of this that you should never invest money you cannot afford to lose.</p>
                              <p><br /></p>
                              <p>Past performance is not indicative of future results.</p>
                              <p><br /></p>
                              <p>Disclaimer of liability: The interpretation and use of the trading signals and market
                                analysis generated by DCG is at the sole discretion of the customer, subscriber, member, or
                                trader. DCG and its owners shall not be responsible for any claims in losses directly
                                consequential of any trading activity.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div >
          </div >
        </div >
      </div >
      <div>
        <div id="nav-menu-popup" className="hide" style={{
          display: "none"
        }}>
          <div className="nav-menu-body"><i className="close-menu fas fa-times"></i>
            <ul className="nav-menu"></ul>
          </div>
        </div>
      </div >
    </div >
  )
}

const mapStateToProps = state => ({
  defaultProducts: state.partner.defaultProducts,
})

export default connect(mapStateToProps, { getTempUser, getSalesProducts, getPublishableKey })(Sales3)