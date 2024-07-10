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
  AdjustmentsHorizontalIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  HeartIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { useState , MouseEvent, MouseEventHandler} from "react";
import { SearchIcon } from "@/public/data/icons";
import LangDropdown from "@/components/LangDropdown";
import NotificationDropdown from "@/components/NotificationDropdown";
import ProfileDropdown from "@/components/ProfileDropdown";

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
          <span className="text-xs">Customer Main Page</span>
          <ul className="py-5">
            <li>
              <Link
                href="/customer-dashboard/personal-info"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/personal-info" && "bg-custom text-white"
                }`}>
                <UserCircleIcon className="w-7 h-7 " />
             Personal Info
              </Link>
            </li>
            <li>
            <Link
                href="/customer-dashboard/user-security"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/user-security" && "bg-custom text-white"
                }`}>
                <ShieldCheckIcon className="w-6 h-6 "/>
                Sécurité
              </Link>
            </li>
            <li>
              <Link
                href="/customer-dashboard/user-notification"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/user-notification" && "bg-custom text-white"
                }`}>
                 <BellIcon className="w-9 h-9"/>
                Notifications
              </Link>
            </li>
            <li>
              <Link
                href="/customer-dashboard/user-preference"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/user-preference" && "bg-custom text-white"
                }`}>
                 <Cog6ToothIcon className="w-7 h-7"/>
                Préférences
              </Link>
            </li>
            <li>
              <Link
                href="/customer-dashboard/user-chat"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/user-chat" && "bg-custom text-white"
                }`}>
                <ChatBubbleLeftRightIcon  className="w-7 h-7"/>
                Chat
              </Link>
            </li>
            <li>
            <Link
                href="/customer-dashboard/user-booking"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/user-booking" && "bg-purple-500 text-white"
                }`}>
                <ClipboardDocumentListIcon  className="w-7 h-7"/>
              Statistiques
              </Link>
            </li>
            {/* <li>
              <Link
                href="/customer-dashboard/user-whishlist"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/user-whishlist" && "bg-custom text-white"
                }`}>
                <HeartIcon className="w-7 h-7"/>
                My Wishlist
              </Link>
            </li> */}
            <li>
              <Link
                href="/customer-dashboard/user-payement"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/user-payement" && "bg-custom text-white"
                }`}>
                <CreditCardIcon className="w-7 h-7"/>
                Payement
              </Link>
            </li>
            <li>
              <Link
                href="/customer-dashboard/user-address"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/user-address" && "bg-custom text-white"
                }`}>
                <MapPinIcon className="w-7 h-7"/>
                Address
              </Link>
            </li>
            {/* <li>
              <Link
                href="/customer-dashboard/user-team"
                className={`flex items-center gap-2 rounded-md px-6 py-3 duration-300 ${
                  path == "/customer-dashboard/user-team" && "bg-custom text-white"
                }`}>
                <UserGroupIcon className="w-7 h-7"/>
                Team
              </Link>
            </li> */}
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