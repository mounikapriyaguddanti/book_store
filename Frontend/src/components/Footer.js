
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faBook, faBookReader, faBookOpen, faPen, faComments } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const navItems = [
    { name: 'Home', icon: faBook, href: 'home' },
    { name: 'About', icon: faBookReader, href: 'about' },
    { name: 'New Arrivals', icon: faBookOpen, href: 'new-arrivals' },
    { name: 'Featured Authors', icon: faPen, href: 'featured-authors' },
    { name: 'Feedback', icon: faComments, href: 'feedback' },
    { name: 'Contact', icon: faEnvelope, href: 'contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: faFacebook, href: '#facebook', color: '#1877F2' },
    { name: 'Twitter', icon: faTwitter, href: '#twitter', color: '#1DA1F2' },
    { name: 'Instagram', icon: faInstagram, href: '#instagram', color: '#E4405F' },
    { name: 'YouTube', icon: faYoutube, href: '#youtube', color: '#FF0000' },
    { name: 'WhatsApp', icon: faWhatsapp, href: '#whatsapp', color: '#25D366' }
  ];

  return (
    <footer className="bg-navy py-10 pl-10 pr-4 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:pr-6">
            <div className="flex items-center mb-4">
              <img
                src="http://www.toxel.com/wp-content/uploads/2015/07/bookhive03.jpg"
                alt="Logo"
                className="h-14 mr-3"
              />
              <span className="text-white font-bold text-xl">Book Hive</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
            Immerse yourself in a world of literature and imagination. Explore our vast collection of books, from timeless classics to the latest bestsellers.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
              {navItems.map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <FontAwesomeIcon icon={item.icon} className="mr-2 text-sm opacity-75" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact & Connect</h3>
            <div className="mb-4">
              <div className="flex items-center text-gray-300 mb-2">
                <FontAwesomeIcon icon={faPhone} className="mr-3 opacity-75" />
                <span>+91-9632587412</span>
              </div>
              <div className="flex items-center text-gray-300 mb-2">
                <FontAwesomeIcon icon={faWhatsapp} className="mr-3 opacity-75" />
                <span>+91-7412589632 (WhatsApp)</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 opacity-75" />
                <span>info@bookhive.com</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Follow Our Journey</h4>
              <ul className="flex space-x-3">
                {socialLinks.map(({ name, icon, href, color }) => (
                  <li key={name}>
                    <a 
                      href={href} 
                      className="block w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:shadow-lg"
                      style={{ backgroundColor: color }}
                      aria-label={name}
                    >
                      <FontAwesomeIcon icon={icon} className="text-white" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-white text-xs">
          <p>
            &copy; {new Date().getFullYear()} Book Hive. All rights reserved. | 
            <a href="#privacy" className="hover:text-gray-300 ml-1 mr-1 transition-colors">Privacy Policy</a> | 
            <a href="#terms" className="hover:text-gray-300 ml-1 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;