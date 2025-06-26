import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-950 text-white">
      <div className=" px-4 sm:px-3 lg:px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/pictures/logo.png" alt="AgriDynamic" width={370}height={300}/>
            </div>
            <p className="text-green-100 lg:text-2xl mb-4">
              Empowering underprivileged communities through innovative, sustainable agricultural solutions since 2008.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 lg:text-5xl">Quick Links</h3>
            <ul className="space-y-2 hover:text-green-200 lg:text-2xl">
              <li>
                <Link to="/" className="text-green-100 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-green-100 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-green-100 hover:text-white transition-colors duration-200">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-green-100 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Our Focus */}
          <div>
            <h3 className="text-lg font-semibold mb-4 lg:text-5xl">Our Focus</h3>
            <ul className="space-y-2 lg:text-2xl">
              <li className="text-green-100">Training Programs</li>
              <li className="text-green-100">Inclusive Value Chains</li>
              <li className="text-green-100">Access to Agri-Finance</li>
              <li className="text-green-100">Research & Innovation</li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 lg:text-5xl">Contact Us</h3>
            <ul className="space-y-3 lg:text-2xl">
              <li className="flex items-start ">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-green-300" />
                <span className="text-green-100">North West Region Cameroon BP 02 Ndop</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-green-100">+237 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-300" />
                <span className="text-green-100">info@agridynamic.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-600 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {new Date().getFullYear()} AgriDynamic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
