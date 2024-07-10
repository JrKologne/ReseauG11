"use client";
/*import {
  BellIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import iconGoogle from "@/public/img/icon-google.png";
import iconDropbox from "@/public/img/icon-dropbox.png";
import iconSlack from "@/public/img/icon-slack.png";
import iconMailChimp from "@/public/img/icon-mailchimp.png";
import iconJira from "@/public/img/icon-jira.png";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Accordion from "@/components/Accordion";
import CheckboxCustom from "@/components/Checkbox";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import { Tab } from "@headlessui/react";
import CustomSwitch from "@/components/Switch";
import { candlestick } from "@/public/data/candlestick";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Page = () => {
  const [active, setActive] = useState("profile");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("/img/team-1.jpg");

  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImageSrc(reader.result.toString());
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <div className="bg-[var(--bg-1)] px-3 lg:px-6 relative before:bg-[#E0D9FD] before:w-full before:h-[70px] before:absolute before:top-0 before:left-0 pb-6">
   
    </div>
  );
};

export default Page;*/
import Link from 'next/link';

const Page = () => {
  return (
    <div className="bg-[var(--bg-1)] px-3 lg:px-6 relative pb-6">
      <div className="flex flex-col items-center mt-4 space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <Link href="/conducteur-avec-vehicule">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition w-full max-w-md">
              Planning du conducteur avec véhicule
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Link href="/conducteur-sans-vehicule">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition w-full max-w-md">
              Planning du conducteur sans véhicule
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;