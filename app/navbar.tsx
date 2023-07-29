"use client";

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

const inter = Inter({ subsets: ["latin"] });

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user }: { user: any }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-w-fit max-w-full mx-auto py-10 px-4">
        <header>
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] scale-300 h-32 invert"
              src="/image.svg"
              alt="Next.js Logo"
              width={1920}
              height={1080}
              priority
            />
          </div>
          <div className="flex items-center justify-between">
            <ModeToggle />
            <nav className="ml-auto text-base font-medium space-x-2">
              <Link
                className="hover:bg-gradient-conic from-sky-600 via-purple-950 to-sky-600"
                href="/"
              >
                Home
              </Link>
              <Link
                className="hover:bg-gradient-conic from-sky-600 via-blue-950 to-sky-600"
                href="/about"
              >
                About
              </Link>
              <Link
                className="hover:bg-gradient-conic from-sky-600 via-blue-950 to-sky-600"
                href="/stories"
              >
                Stories
              </Link>
            </nav>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={user?.image || "https://avatar.vercel.sh/leerob"}
                      height={32}
                      width={32}
                      alt={`${user?.name || "placeholder"} avatar`}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {user ? (
                      <Menu.Items>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex w-full px-4 py-2 text-sm text-gray-700"
                              )}
                              href="/profile"
                            >
                              profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex w-full px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex w-full px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={() => signIn("github")}
                          >
                            Sign in
                          </button>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}
