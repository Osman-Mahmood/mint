import React from 'react'

const Footer = () => {
  return (
    <div>
     <footer class="section bg-footer_img">
        <div class="container">
            <div class="row pt-3">
                <div class="col-lg-3">
                    <div class="">
                        <h6 class="footer-heading text-uppercase text-white">UnMe mitigating/resolving <br /> specific social problems.</h6>
                        {/* <ul class="list-unstyled footer-link mt-4">
                            <li><a href="">Women</a></li>
                            <li><a href="">Men</a></li>
                            <li><a href="">Kids & Youth</a></li>
                            <li><a href="">Hats</a></li>
                        </ul> */}
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="">
                        <h6 class=" text-white"></h6>
                        {/* <ul class="list-unstyled footer-link mt-5">
                            <li><a href="">Accessories</a></li>
                            <li><a href="">Home</a></li>
                            <li><a href="">LifeStyle</a></li>
                            <li><a href="">Content Guideline & Policies</a></li>
                        </ul> */}
                    </div>
                </div>

                <div class="col-lg-2">
                    {/* <div class="">
                        <h6 class="footer-heading text-uppercase text-white">Help</h6>
                        <ul class="list-unstyled footer-link mt-4">
                            <li><a href="">Sign Up </a></li>
                            <li><a href="">Login</a></li>
                            <li><a href="">Terms of Services</a></li>
                            <li><a href="">Privacy Policy</a></li>
                        </ul>
                    </div> */}
                </div>

                <div class="col-lg-4">
                    <div class="">
                        <h6 class="footer-heading text-uppercase text-white">Get In Touch</h6>
                        <p class="contact-info mt-4">Contact us if need help with anything</p>
                        <p class="contact-info">+01 123-456-7890</p>
                        <div class="mt-5">
                            <ul class="list-inline">
                                <li class="list-inline-item"><a href="#"><i class="fab facebook footer-social-icon fa-facebook-f"></i></a></li>
                                <li class="list-inline-item"><a href="#"><i class="fab twitter footer-social-icon fa-twitter"></i></a></li>
                                <li class="list-inline-item"><a href="#"><i class="fab google footer-social-icon fa-google"></i></a></li>
                                <li class="list-inline-item"><a href="#"><i class="fab apple footer-social-icon fa-apple"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="text-center mt-5">
            <p class="footer-alt pb-3 mb-0 f-14">2023 © Copyright, All Rights Reserved</p>
        </div>
    </footer>
    </div>
  )
}

export default Footer
