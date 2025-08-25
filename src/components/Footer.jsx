import React from 'react';
import { FaFacebookF, FaYoutube, FaInstagram, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { MdSend } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-white w-full pt-10 md:px-20 text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-10">
        {/* LEFT SIDE - Subscribe and Navigation */}
        <div>
          {/* Subscribe */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Subscribe</h2>
            <div className="flex w-full bg-[#f3eee6] rounded-full overflow-hidden shadow max-w-xl">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full px-5 py-3 bg-transparent outline-none text-sm"
              />
              <button className="bg-[#e14c38] text-white px-5 text-xl">
                <MdSend />
              </button>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Navigate</h3>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 text-[16px]">
              {[
                'Home', 'About Us', 'Courses', 'Pricing Plan', 'FAQ',
                'Blog', 'Newsletter', 'Register', 'Sign In', 'Contact Us',
                 'Events', 'Shop', 'My Cart', 'Compare', 'Wishlist'
              ].map((item, idx) => (
                <p key={idx} className="flex items-center gap-2 hover:text-orange-500 transition">
                  <FaArrowUpRightFromSquare className="text-orange-600 text-xs" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Brand, Contact, Store, Social */}
        <div className="flex flex-col gap-6 ml-10">
          {/* Brand - Logo and Name */}
          {/* Logo */}
          <div className="flex items-center space-x-1 ">
            <div className="bg-[#e44d30] rounded-[17px] text-white font-bold text-[40px] w-14 h-14 flex items-center justify-center mt-5">
              E
            </div>
            <div>
              <p className="text-3xl font-bold text-black mt-5 pl-0">ElearnSphere</p>
              <p className="text-[14px] text-gray-500 uppercase tracking-wider">An E-learning platform</p>
            </div>
          </div>

          {/* Contact Info in Row */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm mt-5">
            <div>
              <p className="text-gray-500 ml-2">Toll Free Customer Care</p>
              <h4 className="text-lg font-bold text-black ml-2">+977 9742821135</h4>
            </div>
            <div className='ml-20 mb-5'>
              <p className="text-gray-500">Need Live Support?</p>
              <h4 className="text-lg font-bold text-black ">elearnsphere@gmail.com</h4>
            </div>
          </div>

          {/* Store Buttons */}
          <div>
            <p className="mb-1 ml-2 text-gray-500">Take your learning with you</p>
            <div className="flex gap-5 ml-2 ">
              <img src="/images/google-play.png" alt="Google Play" className="h-22" />
              <img src="/images/app-store.png" alt="App Store" className="h-22" />
            </div>
          </div>

          {/* Social Icons */}
          <div>
            <p className="mb-2 ml-2 text-gray-500">Follow us on social media</p>
            <div className="flex gap-4 ml-2">
              <FaFacebookF className="p-2 text-orange-600 rounded-full border-2 border-orange-600 h-10 w-10 cursor-pointer hover:bg-orange-100 transition" />
              <FaYoutube className="p-2 text-orange-600 rounded-full border-2 border-orange-600 h-10 w-10 cursor-pointer hover:bg-orange-100 transition" />
              <FaInstagram className="p-2 text-orange-600 rounded-full border-2 border-orange-600 h-10 w-10 cursor-pointer hover:bg-orange-100 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className=" w-full mt-12 border-t pb-6 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">
        <p>© 2025 ElearnSphere. All Rights Reserved</p>
        <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
          <a href="#">Help</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms Of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
