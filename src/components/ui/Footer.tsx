import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around gap-8">

        {/* About Us */}
        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="bg-blue-700 hover:bg-blue-600 rounded-full p-3 flex items-center justify-center">
              <Facebook className="text-white w-5 h-5" />
            </a>
            <a href="#" className="bg-blue-700 hover:bg-blue-600 rounded-full p-3 flex items-center justify-center">
              <Twitter className="text-white w-5 h-5" />
            </a>
            <a href="#" className="bg-blue-700 hover:bg-blue-600 rounded-full p-3 flex items-center justify-center">
              <Instagram className="text-white w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}