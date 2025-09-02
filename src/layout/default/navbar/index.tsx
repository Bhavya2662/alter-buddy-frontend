import React, { FC, Fragment, useEffect } from "react";

import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { ICategoryProps } from "../../../interface";
import { FaChevronDown } from "react-icons/fa";
import {
  useAuthenticationSlice,
  useServicesSlice,
} from "../../../redux/features";
import { AlterBuddyLogo } from "../../../assets/logo";
import Aos from "aos";
import { useLazyProfileUserQuery } from "../../../redux/rtk-api";
import { toast } from "react-toastify";

interface MainNavBarProps {
  mobile: boolean;
  handleMenu: () => void;
  authenticated: boolean;
  logout: () => void;
  navLoading?: boolean;
  category: ICategoryProps[];
}

export const MainNavBar: FC<MainNavBarProps> = ({
  handleMenu,
  mobile,
  authenticated,
  logout,
  navLoading,
}) => {
  const { authentication } = useAuthenticationSlice();
  const [GetProfile, { data: profile }] = useLazyProfileUserQuery();

  useEffect(() => {
    Aos.init({});
    if (authentication) {
      (async () => {
        await GetProfile();
      })();
    }
  }, [authentication, GetProfile]);

  const { pageContent } = useServicesSlice();
  const navigate = useNavigate();
  return (
    <div
      data-aos="fade-in"
      className={clsx(
        "fixed w-full top-0 z-20 bg-opacity-60 backdrop-blur-lg bg-white"
      )}
    >
      {/* <p className="font-mono uppercase absolute bg-white border">Development Mode activated</p> */}
      <nav>
        <div className="px-4 sm:px-6 py-4 lg:px-8">
          <div className="flex items-center  h-16 w-full">
            <div className="flex items-center w-full justify-between gap-10">
              <div className="">
                <Link to="/" className="flex flex-col items-center">
                  <AlterBuddyLogo />
                  <p className="capitalize">Find Your life's Brighter Side</p>
                </Link>
              </div>

              <div className="xl:flex-1 hidden md:hidden w-full xl:flex xl:justify-end">
                <ul className="flex items-center justify-end gap-5 w-full">
                  <li
                    className="bg-primary-500 px-5 py-2 rounded-md text-white cursor-pointer"
                    onClick={() => {
                      navigate("/services/rant");
                    }}
                  >
                    Rant
                  </li>
                  <li className="xl:text-md text-sm hover:text-primary-500">
                    <Link to="/about">About Us</Link>
                  </li>
                  <li className="xl:text-md text-sm hover:text-primary-500">
                    <Link to="/group-sessions">Group Sessions</Link>
                  </li>

                  <li>
                    <div className="group relative">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <Menu.Button
                          onMouseEnter={({ target }) => {
                            if (target) {
                              (target as any)?.click();
                            }
                          }}
                          className="flex items-center gap-1 xl:text-md text-sm capitalize xl:text-md hover:text-primary-500"
                        >
                          Our Services
                          <FaChevronDown />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute w-[350px] mt-5 border origin-top-left bg-white shadow-lg rounded-md divide-x p-3 divide-gray-500 flex gap-10">
                            <div className="">
                              <label
                                htmlFor="service"
                                className="uppercase font-semibold text-sm text-primary-500"
                              >
                                get help for:
                              </label>
                              <div className="flex flex-1 flex-col gap-3 mt-5">
                                {pageContent?.map(({ pageTitle, path }) => (
                                  <div className="flex gap-3" key={path}>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to={`/services/${path}`}
                                          className={`${
                                            active
                                              ? "text-primary-500"
                                              : "text-gray-500"
                                          } group flex w-full font-bold items-center capitalize`}
                                        >
                                          {pageTitle.toLowerCase()}
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </li>
                  <li className="xl:text-md text-sm hover:text-primary-500">
                    <Link to="/buddytube">BuddyTube</Link>
                  </li>
                  <li className="xl:text-md text-sm hover:text-primary-500">
                    <Link to="/contact-us">Contact Us</Link>
                  </li>

                  {!authenticated ? (
                    <div
                      onClick={() => navigate("/sign-in")}
                      className="text-primary-500 capitalize cursor-pointer font-sans2"
                    >
                      Login
                    </div>
                  ) : (
                    <>
                      <li className="xl:text-md text-sm">
                        <Link to="/user/my-profile">My Profile</Link>
                      </li>
                      <li
                        className="flex items-center gap-3 cursor-pointer text-red-500 xl:text-md text-sm"
                        onClick={logout}
                      >
                        <AiOutlineLogout size={25} />
                        {navLoading ? "please wait..." : "logout"}
                      </li>
                    </>
                  )}
                  <li className="xl:text-md text-sm hover:text-primary-500">
                    <Link to="/our-team">Our Team</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-5 md:block xl:hidden lg:hidden items-center">
              <button
                onClick={handleMenu}
                type="button"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!mobile ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={mobile}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="xl:hidden lg:hidden" id="mobile-menu">
              <ul className="flex items-center flex-col justify-end w-full mb-10 gap-6">
                <li
                  className="bg-primary-500 px-5 py-2 rounded-md text-white cursor-pointer"
                  onClick={() => {
                    navigate("/services/rant");
                  }}
                >
                  Rant
                </li>
                <li className="xl:text-md text-sm hover:text-primary-500">
                  <Link to="/about">About Us</Link>
                </li>

                <li>
                  <div className="group relative">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button
                        onMouseEnter={({ target }) => {
                          if (target) {
                            (target as any)?.click();
                          }
                        }}
                        className="flex items-center gap-1 xl:text-md text-sm capitalize xl:text-md hover:text-primary-500"
                      >
                        Our Services
                        <FaChevronDown />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute w-[350px] mt-5 border origin-top-left bg-white shadow-lg rounded-md divide-x p-3 divide-gray-500 flex gap-10">
                          <div className="">
                            <label
                              htmlFor="service"
                              className="uppercase font-semibold text-sm text-primary-500"
                            >
                              get help for:
                            </label>
                            <div className="flex flex-1 flex-col gap-3 mt-5">
                              {pageContent?.map(({ pageTitle, path }) => (
                                <div className="flex gap-3" key={path}>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        to={`/services/${path}`}
                                        className={`${
                                          active
                                            ? "text-primary-500"
                                            : "text-gray-500"
                                        } group flex w-full font-bold items-center capitalize`}
                                      >
                                        {pageTitle.toLowerCase()}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
                {/* <li className="xl:text-md text-sm hover:text-primary-500">
                    <Link to="/buddytube">BuddyTube</Link>
                  </li> */}
                <li className="xl:text-md text-sm hover:text-primary-500">
                  <Link to="/contact-us">Contact Us</Link>
                </li>

                {!authenticated ? (
                  <div
                    onClick={() => navigate("/sign-in")}
                    className="text-primary-500 capitalize cursor-pointer font-sans2"
                  >
                    Login
                  </div>
                ) : (
                  <>
                    <li className="xl:text-md text-sm">
                      <Link to="/user/my-profile">My Profile</Link>
                    </li>
                    <li
                      className="flex items-center gap-3 cursor-pointer text-red-500 xl:text-md text-sm"
                      onClick={logout}
                    >
                      <AiOutlineLogout size={25} />
                      {navLoading ? "please wait..." : "logout"}
                    </li>
                  </>
                )}
                <li className="xl:text-md text-sm hover:text-primary-500">
                  <Link to="/our-team">Our Team</Link>
                </li>
              </ul>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};
