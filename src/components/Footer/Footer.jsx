import React from 'react'

const Footer = () => {
    return (
        <div className='bg-footer_img'>
            <div className='container-fluid'>
                <footer class="section ">
                    <div class="container">
                        <div class="row pt-3 ">
                            <div className='col-lg-8 row d-flex'>
                                <div class="col-lg-6 mt-3 text-center">
                                    {/* <div class="text-center">
                        
                        <p className=' text-uppercase  text-white'>Ascribing meaningful safety to the <br />  digital-assets-ecosystem.</p>
                    
                    </div> */}
                                </div>
                                <div class="col-lg-6 mt-3 text-end align-items-center d-flex justify-content-center">
                                    <div class="text-center">
                                        {/* <h6 class="footer-heading text-uppercase text-white">UnMe mitigating/resolving <br /> specific social problems.</h6> */}
                                        <p className=' text-uppercase fw-normal fs-5  text-white'>Ascribing meaningful safety to the  digital-assets-ecosystem.</p>

                                    </div>
                                </div>
                            </div>




                            <div class="col-lg-4 mt-3 ">
                                <div class="d-flex align-items-end justify-content-end flex-column text-start mobile_menu mb-lg-0 mb-3">
                                    <p class="contact-info fw-normal fs-5">Want your project-asset to <br /> be protected as  uToken?</p>
                                    <div class="mt-2 d-flex align-items-center justify-content-center text-white">
                                        <div className='text-start'>Contact us:</div>
                                        <div className='ms-2'><a href="https://t.me/+eXB5_gt3wvtlOGE5"><i class="fa-brands fa-telegram fs-4"></i></a></div>
                                        <div><a href="https://twitter.com/u369eth"><i class="fa-brands fa-twitter fs-4 ms-3"></i></a></div>
                                    </div>
                                    <div class="mt-2 d-flex align-items-center justify-content-center text-white">
                                        <div className='ms-2'>Other inquiries:</div>
                                        <div className='ms-2'><a href="mailto:u369.eth@protonmail.com"><i class="fa-regular fa-envelope fs-4 ms-3"></i></a></div>
                                    </div>
                                    <div class="mt-2 d-flex align-items-center justify-content-center text-white">
                                        <div className='me-2'>Open-source:</div>
                                        <div className='ms-2'><a href="#"><i class="fa-brands fa-github fs-4 ms-3"></i></a></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="text-center">
                        <p class="footer-alt pb-3 mb-0 f-14">(Background/image credit to:  CalcPlot3d, a tool by Paul Seeburger)</p>
                    </div>
                </footer>
            </div>
        </div>

    )
}

export default Footer