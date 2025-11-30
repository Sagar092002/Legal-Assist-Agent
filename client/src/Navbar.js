// // Navbar.js
// import { useParams, useNavigate, Navigate } from "react-router-dom";
// import React, { useState,useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Navbar as MaterialNavbar,
//   MobileNav,
//   Typography,
//   Button,
//   IconButton,
// } from "@material-tailwind/react";

// function Navbar() {
//   const [openNav, setOpenNav] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setOpenNav(false)
//     );
//   }, []);

//     function handleLogin(){
//       navigate("/login");
//     }

//     const navList = (
//     <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      
    
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <a href="/about" className="flex items-center">
//           About
//         </a>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <a href="/service" className="flex items-center">
//           Services
//         </a>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <a href="/faq" className="flex items-center">
//           FAQ's
//         </a>
//       </Typography>
//       </ul>
//   );

//   return (
    
//     <MaterialNavbar className="fixed z-40 top-[-40px] w-full h-16 max-w-full rounded-none py-1 px-4 lg:px-8 lg:py-2 mt-10">
//      <div className="flex items-center justify-between text-blue-gray-900">
//           {/* <Typography
//             as="a"
//             href="/"
//             className="mr-4 cursor-pointer py-1.5 font-bold text-2xl  font-serif "
//           >
//             DocBuddy
//           </Typography> */}
//           <Link to="/" className="mr-4 cursor-pointer py-1.5 font-bold text-2xl  font-serif">
//             <img src='https://res.cloudinary.com/dyxnmjtrg/image/upload/v1695064580/copy-img_gd3jcp.png' style={{width:'200px',height:'50px',marginLeft:'-30px'}}/>
//           </Link>
//           <div className="flex items-center gap-4">
//             <div className="mr-4 hidden lg:block">
             
//               {navList}</div>
//             <Button
//             onClick={handleLogin}
//               variant="gradient"
//               size="sm"
//               className="hidden lg:inline-block"
//             >
//               <span>Login</span>
//             </Button>
//             <IconButton
//               variant="text"
//               className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//               ripple={false}
//               onClick={() => setOpenNav(!openNav)}
//             >
//               {openNav ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </IconButton>
//           </div>
//         </div>
//         <MobileNav open={openNav} style={{
//   backgroundColor: 'rgba(255, 255, 255, 0.95)', // Decreased opacity to 0.25
//   boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.25)',
//   backdropFilter: 'blur(15px)'}}>
//           {navList}
//           <Button variant="gradient" size="sm" fullWidth className="mb-2">
//             <span>Buy Now</span>
//           </Button>
//         </MobileNav>
//     </MaterialNavbar>
//   );
// }

// export default Navbar;













// Sagar

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  function handleLogin() {
    navigate("/login");
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#EDE9FE] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* ------------------ LOGO AREA ------------------ */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dyxnmjtrg/image/upload/v1695064580/copy-img_gd3jcp.png"
            alt="logo"
            className="w-32 sm:w-40 object-contain"
          />
        </Link>

        {/* ------------------ DESKTOP MENU ------------------ */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/about"
            className="text-gray-700 hover:text-black font-medium transition"
          >
            About
          </Link>

          <Link
            to="/service"
            className="text-gray-700 hover:text-black font-medium transition"
          >
            Services
          </Link>

          <Link
            to="/faq"
            className="text-gray-700 hover:text-black font-medium transition"
          >
            FAQs
          </Link>

          <button
            onClick={handleLogin}
            className="bg-[#1E2A5F] text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </div>

        {/* ------------------ MOBILE MENU BUTTON ------------------ */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ------------------ MOBILE MENU ------------------ */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="block text-gray-800 font-medium"
          >
            About
          </Link>

          <Link
            to="/service"
            onClick={() => setOpen(false)}
            className="block text-gray-800 font-medium"
          >
            Services
          </Link>

          <Link
            to="/faq"
            onClick={() => setOpen(false)}
            className="block text-gray-800 font-medium"
          >
            FAQs
          </Link>

          <button
            onClick={() => {
              setOpen(false);
              handleLogin();
            }}
            className="w-full bg-[#1E2A5F] text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
