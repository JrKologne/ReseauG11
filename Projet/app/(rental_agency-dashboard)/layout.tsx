"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/img/logo.png";
import Driver from "@/public/img/driver.png";
import Salary from "@/public/img/salary.png";
import Chat from "@/public/img/chat.png";
import Business from "@/public/img/business.png";
import Planning from "@/public/img/planning.png";
import NotificationImage from "@/public/img/notificationImage.png";
import Activities from "@/public/img/activities.png";
import Notations from "@/public/img/notations.png";
import Setting from "@/public/img/setting.png";
import Logout from "@/public/img/logout.png";
import Dashboard from "@/public/img/dashboard.png";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  BuildingStorefrontIcon,
  CheckIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  StarIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

import { SearchIcon } from "@/public/data/icons";
import LangDropdown from "@/components/LangDropdown";
import NotificationDropdown from "@/components/NotificationDropdown";
import ProfileDropdown from "@/components/ProfileDropdown";
import { MouseEvent, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  const path = usePathname();
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setNavOpen(!navOpen);
  };
  return (
    <>
      <section className="bg-white">
        <nav
          className={`${
            navOpen ? "ml-0" : "ml-[-312px]"
          } lg:ml-0 w-[270px] sm:w-[312px] transiton-all duration-300 ease-out z-20 fixed bg-white flex flex-col border-r p-3 md:p-10 min-h-screen shadow-lg lg:shadow-none overflow-y-auto max-h-screen`}>
          <div className="grow">
            <Link
              href="/"
              className="inline-flex items-center pb-4 lg:pb-9 border-b border-dashed">
              <Image src={Logo} alt="logo" />
            </Link>
            <span className="text-xs">Rental Agency Main Page</span>
            <ul className="py-5">
              <li>
                <Link
                  href="/rental_agency-notifications"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/rental_agency-notifications" && "bg-custom text-white"
                  }`}>
                  <Image src={NotificationImage} alt="logo" className="w-7 h-7"/>
                  Notifications
                </Link>
              </li>
              <li>
              <Link
                  href="/rental_agency-evaluation"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/rental_agency-evaluation" && "bg-custom text-white"
                  }`}>
                  <Image src={Notations} alt="logo" className="w-7 h-7"/>
                  Evaluation
                </Link>
              </li>
              <li>
                <Link
                  href="/rental_agency-bookings"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/rental_agency-bookings" && "bg-custom text-white"
                  }`}>
                  <Image src={Dashboard} alt="logo" className="w-9 h-9"/>
                  Statistiques
                </Link>
              </li>
              <li>
                <Link
                  href="/rental_agency-facture"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/rental_agency-facture" && "bg-custom text-white"
                  }`}>
                  <Image src={Activities} alt="logo" className="w-7 h-7"/>
                  Facture
                </Link>
              </li>
              <li>
                <Link
                  href="/rental_agency-activities"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/rental_agency-activities" && "bg-custom text-white"
                  }`}>
                  <Image src={Planning} alt="logo" className="w-7 h-7"/>
                  Planning
                </Link>
              </li>
              <li>
              <Link
                  href="/rental_agency-listings"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/rental_agency-listings" && "bg-purple-500 text-white"
                  }`}>
                  <Image src={Driver} alt="logo" className="w-7 h-7"/>
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  href="/rental_agency-earnings"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/rental_agency-earnings" && "bg-custom text-white"
                  }`}>
                  <Image src={Chat} alt="logo" className="w-7 h-7"/>
                  Chat
                </Link>
              </li>
              <li>
                <Link
                  href="/rental_agency-business"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/rental_agency-business" && "bg-custom text-white"
                  }`}>
                  <Image src={Business} alt="logo" className="w-7 h-7"/>
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/rental_agency-settings"
                  className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                    path == "/rental_agency-settings" && "bg-custom text-white"
                  }`}>
                  <Image src={Setting} alt="logo" className="w-7 h-7"/>
                  PLus
                </Link>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-md px-6 py-3 `}>
                <Image src={Logout} alt="logo" className="w-7 h-7"/>
                Log out
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className={`lg:ml-[312px] relative ${
            navOpen &&
            "after:bg-black after:bg-opacity-70 after:absolute after:inset-0 after:z-10 after:duration-300 overflow-y-hidden"
          }`}
          onClick={() => setNavOpen(false)}>
          <header className="px-4 md:px-8 py-3 lg:py-6 flex gap-2 justify-between self-start">
            <button
              onClick={handleOpen}
              className="lg:hidden order-2 select-none">
              <Bars3Icon className="w-8 h-8" />
            </button>
            <form className="rounded-3xl hidden md:flex bg-[var(--bg-1)] xl:w-[332px] px-3 lg:px-4 py-2 justify-between border items-center">
              <input
                type="text"
                className="focus:outline-none bg-[var(--bg-1)]"
                placeholder="Search"
              />
              <SearchIcon />
            </form>
            <div className="flex gap-2 items-center order-1 lg:order-2">
              <LangDropdown />
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          </header>
          <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[#E0D9FD]">
            <div className="flex gap-2 items-center">
              <div className="p-1 border border-[var(--primary)] rounded-full bg-white  grid place-content-center relative mx-auto">
                <Image
                  width={48}
                  height={48}
                  src="/img/team-1.jpg"
                  alt="image"
                  className="rounded-full"
                />
                <div className="w-4 h-4 grid place-content-center rounded-full border-2 white text-white bg-primary absolute bottom-2 right-0">
                  <CheckIcon className="w-3 h-3" />
                </div>
              </div>
              <div className="text-white">
                <h6 className="font-medium text-lg">Floyd Miles</h6>
                <Link href="mailto:info@example.com">info@example.com</Link>
              </div>
            </div>
          </div>
          <section>{children}</section>
        </div>
      </section>
    </>
  );
}