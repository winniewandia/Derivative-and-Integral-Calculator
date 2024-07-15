import React from 'react';
import '../styles/Footer.css';

function Footer() {
    const fullYear = new Date().getFullYear;
  return (
    <footer id="footer">
    <div class="bg-primary text-center">
      <div class="container wrapper">
        <div class="m-t-xl m-b">
          For your faster and easier web development.
          <a href="http://themeforest.net/user/Flatfull/portfolio?ref=flatfull" target="_blank" class="btn btn-lg btn-dark b-white bg-empty m-sm">Download it</a>
          <a href="index.html" target="_blank" class="btn btn-lg btn-warning b-white bg-empty m-sm">Live Preview</a>
        </div>
      </div>
      <i class="fa fa-caret-down fa-4x text-primary m-b-n-lg block"></i>
    </div>
    <div class="bg-dark dker wrapper">
      <div class="container text-center m-t-lg">
        <div class="row m-t-xl m-b-xl">
          <div class="col-sm-4" data-ride="animated" data-animation="fadeInLeft" data-delay="300">
            <i class="fa fa-map-marker fa-3x icon-muted"></i>
            <h5 class="text-uc m-b m-t-lg">Find Us</h5>
            <p class="text-sm">23 soe Midlokls <br></br>
              120002 Loki — UNITED KINGDOM
             </p>
          </div>
          <div class="col-sm-4" data-ride="animated" data-animation="fadeInUp" data-delay="600">
            <i class="fa fa-envelope-o fa-3x icon-muted"></i>
            <h5 class="text-uc m-b m-t-lg">Mail Us</h5>
            <p class="text-sm"><a href="mailto:hey@example.com">info@example.com</a></p>
          </div>
          <div class="col-sm-4" data-ride="animated" data-animation="fadeInRight" data-delay="900">
            <i class="fa fa-globe fa-3x icon-muted"></i>
            <h5 class="text-uc m-b m-t-lg">Join Us</h5>
            <p class="text-sm">Send your resume to <br></br><a href="mailto:hey@example.com">recruit@example.com</a></p>
          </div>
        </div>
        <div class="m-t-xl m-b-xl">
          <p>
            <a href="#" class="btn btn-icon btn-rounded btn-facebook bg-empty m-sm"><i class="fa fa-facebook"></i></a>
            <a href="#" class="btn btn-icon btn-rounded btn-twitter bg-empty m-sm"><i class="fa fa-twitter"></i></a>
            <a href="#" class="btn btn-icon btn-rounded btn-gplus bg-empty m-sm"><i class="fa fa-google-plus"></i></a>
          </p>
          <p>
            <a href="#content" data-jump="true" class="btn btn-icon btn-rounded btn-dark b-dark bg-empty m-sm text-muted"><i class="fa fa-angle-up"></i></a>
          </p>
        </div>
      </div>
    </div>
  </footer>
    // <footer className="footer">
    //     <p>&copy; {fullYear} Derivative Calculator</p>
    // </footer>
  )
}

export default Footer;