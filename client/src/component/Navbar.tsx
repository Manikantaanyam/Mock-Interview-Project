import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getItem } from "@/session";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const name = getItem("token");
    const realName = JSON.parse(name);
    setName(realName.name);
  }, []);

  return (
    <div>
      <nav className="bg-white flex justify-between shadow-md py-4 px-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 40 40"
            >
              <path
                fill="#F06225"
                d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"
              ></path>
              <path
                fill="#F06225"
                d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              ></path>
            </svg>
            <Link to="/">
              <a>Mock Mentor</a>
            </Link>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/home/dashboard">
              <a className="text-gray-600 hover:text-black">Home</a>
            </Link>
            <Link to="/about">
              <a className="text-gray-600 hover:text-black">About</a>
            </Link>
            <Link to="/services">
              <a className="text-gray-600 hover:text-black">Services</a>
            </Link>
            <Link to="/contact">
              <a className="text-gray-600 hover:text-black">Contact</a>
            </Link>
          </div>

          <Button className="rounded-full font-semibold h-10 w-10">
            {name[0].toUpperCase()}
          </Button>

          {/* Dropdown on small screens */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
                  Menu
                </Button>
              </DropdownMenuTrigger>
              {isOpen && (
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link to="/about">About</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/services">Services</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/contact">Contact</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
