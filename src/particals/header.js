import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { getCookie, deleteCookie, setCookie } from "../utils/cookie";
import { getMemberInfo } from "../utils/ApiConfig";
import Swal from "sweetalert2";
import { SERVER_URL } from "../utils/SRC";
import logo from "../assets/img/logo-white.png";

const navigation = [{ name: "MY TEAMS", href: "/team", current: false }];

const logOut = () => {
  Swal.fire({
    title: "🖐",
    text: "로그아웃이 완료되었어요. 다음에 또 만나요!",
    confirmButtonText: "👌",
    confirmButtonColor: "#171717",
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header({ props, update, setUpdate, memberName, setMemberName }) {
  const [memberImg, setMemberImg] = useState(null);
  // const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (getCookie("token")) getMemberInfo({ setMemberName, setMemberImg });
  }, []);

  useEffect(() => {
    if (update) {
      getMemberInfo({ setMemberName, setMemberImg });
    }
    setUpdate(false);
  });

  return (
    <Disclosure as="nav" className="bg-black sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="font-test mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="font-extrabold text-2xl text-white font-bltest flex-shrink-0 flex items-center">
                  <button
                    onClick={() => {
                      props.history.push("/");
                    }}
                    class=" font-extrabold text-2xl font-bltest "
                  >
                    <img src={logo} width={"115px"} />
                  </button>
                </div>

                {getCookie("token") ? (
                  <div className="font-test hidden sm:block sm:ml-6 sm:mt-2">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            props.history.push("/team");
                          }}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              {getCookie("token") ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ml-auto">
                  <Menu as="div" className="z-40 ml-3 relative">
                    <div>
                      <Menu.Button className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>

                        <svg
                          class="h-8 w-8 text-white"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          {" "}
                          <path stroke="none" d="M0 0h24v24H0z" />{" "}
                          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                          <circle cx="16" cy="8" r="3" />
                        </svg>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute z-100 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              알림 1
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              알림 2
                            </span>
                          )}
                        </Menu.Item>
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item> */}
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              알림 3
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/* Profile dropdown */}
                  <Menu as="div" className="z-40 ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          // src={SERVER_URL + "/api/v1/files/images/" + memberImg}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {memberName
                                ? "반가워요😊 " + "\n" + memberName + " 님"
                                : "반가워요😊 null 님"}
                            </span>
                          )}
                        </Menu.Item>
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => {
                                props.history.push("/mypage");
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              마이페이지
                            </a>
                          )}
                        </Menu.Item> */}
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item> */}
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={() => {
                                deleteCookie("token", {
                                  path: "/",
                                });
                                console.log(getCookie("token"));
                                setUpdate(true);
                                props.history.push("/");
                              }}
                            >
                              로그아웃
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="font-test absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ml-auto">
                  <button
                    class="text-white"
                    onClick={() => {
                      props.history.push("/login");
                    }}
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
