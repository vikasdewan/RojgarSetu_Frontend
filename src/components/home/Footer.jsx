// src/components/Footer.jsx
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div>
          <h3 className="font-bold mb-2">Rojgar Setu</h3>
          <p className="text-sm text-gray-400">Connecting skilled workers with opportunities.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Workers</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#" className="hover:text-white">Find Workers</a></li>
            <li><a href="#" className="hover:text-white">Post Jobs</a></li>
            <li><a href="#" className="hover:text-white">Rent Equipment</a></li>
            <li><a href="#" className="hover:text-white">Join as Worker</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Connect With Us</h4>
          <div className="flex space-x-4 text-gray-400">
            <Facebook className="hover:text-white cursor-pointer" />
            <Twitter className="hover:text-white cursor-pointer" />
            <Linkedin className="hover:text-white cursor-pointer" />
            <Instagram className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
