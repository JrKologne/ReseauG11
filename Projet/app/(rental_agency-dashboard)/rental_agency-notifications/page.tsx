/*"use client";
import {
  BellIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  UserCircleIcon,
  CheckIcon,
  XMarkIcon, // Remplace XIcon par XMarkIcon
  MagnifyingGlassIcon, // Remplace SearchIcon par MagnifyingGlassIcon
  } from "@heroicons/react/24/outline";
import iconGoogle from "@/public/img/icon-google.png";
import iconDropbox from "@/public/img/icon-dropbox.png";
import iconSlack from "@/public/img/icon-slack.png";
import iconMailChimp from "@/public/img/icon-mailchimp.png";
import iconCar from  "@/public/img/th.png";
import iconJira from "@/public/img/icon-jira.png";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Accordion from "@/components/Accordion";
import CheckboxCustom from "@/components/Checkbox";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import CustomSwitch from "@/components/Switch";
import { candlestick } from "@/public/data/candlestick";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Notification {
  id: string;
  icon?: string;
  message: string;
  date: string;
}

interface Request {
  id: string;
  passengerName: string;
  message: string;
  date: string;
}

const Page = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Notification[] = await response.json();
        setNotifications(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Request[] = await response.json();
        setRequests(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = (id: string) => {
    // Handle accept request logic here
    console.log(`Accepted request with id: ${id}`);
  };

  const handleRejectRequest = (id: string) => {
    // Handle reject request logic here
    console.log(`Rejected request with id: ${id}`);
  };

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  if (error) {
    return <p>Error fetching notifications: {error}</p>;
  }

  return (
    <div className="bg-[var(--bg-1)] px-3 lg:px-6 relative before:bg-[#E0D9FD] before:w-full before:h-[70px] before:absolute before:top-0 before:left-0 pb-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">Dashboard Chauffeur</h1>
      </div>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex justify-between mb-4">
          <Link href="/vehicule-rentals">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <Image src={iconCar} alt="logo" className="w-5 h-5 mr-2" />
              Voir les annonces de location de véhicule
            </button>
          </Link>
          <Link href="/passenger-requests">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <UserCircleIcon className="w-5 h-5 mr-2" />
              Voir les annonces des passagers
            </button>
          </Link>
          <Link href="/create-announcement">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <PencilIcon className="w-5 h-5 mr-2" />
              Faire une annonce
            </button>
          </Link>
          <Link href="/create-vehicle-request">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              Faire une annonce de recherche de véhicule
            </button>
          </Link>
        </div>
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <ul className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <li key={notification.id} className="py-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={notification.icon || iconGoogle}
                  alt="Notification Icon"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {new Date(notification.date).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Demandes des Passagers</h2>
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {request.passengerName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {request.message}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {new Date(request.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition flex items-center"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    <CheckIcon className="w-5 h-5 mr-1" />
                    Accepter
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition flex items-center"
                    onClick={() => handleRejectRequest(request.id)}
                  >
                    <XMarkIcon className="w-5 h-5 mr-1" />
                    Refuser
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
*/
"use client";
import {
  BellIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  UserCircleIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { StaticImageData } from 'next/image';
import iconGoogle from "@/public/img/icon-google.png";
import iconDropbox from "@/public/img/icon-dropbox.png";
import iconSlack from "@/public/img/icon-slack.png";
import iconMailChimp from "@/public/img/icon-mailchimp.png";
import iconCar from "@/public/img/th.png";
import iconJira from "@/public/img/icon-jira.png";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Accordion from "@/components/Accordion";
import CheckboxCustom from "@/components/Checkbox";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import CustomSwitch from "@/components/Switch";
import { candlestick } from "@/public/data/candlestick";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Notification {
  id: string;
  icon?: StaticImageData | string; // Modification du type ici
  message: string;
  date: string;
}

interface Request {
  id: string;
  passengerName: string;
  message: string;
  date: string;
}

const Page = () => {
  const notifications: Notification[] = [
    {
      id: "1",
      icon: iconGoogle,
      message: "Nouvelle annonce de location de véhicule disponible.",
      date: "2024-06-25T12:34:56Z",
    },
    {
      id: "2",
      icon: iconSlack,
      message: "Nouveau message de la part de l'agence X.",
      date: "2024-06-25T13:14:56Z",
    },
  ];

  const requests: Request[] = [
    {
      id: "1",
      passengerName: "John Doe",
      message: "Demande de transport pour le 1er juillet.",
      date: "2024-06-24T08:30:00Z",
    },
    {
      id: "2",
      passengerName: "Jane Smith",
      message: "Demande de transport pour le 2 juillet.",
      date: "2024-06-24T09:15:00Z",
    },
  ];

  const handleAcceptRequest = (id: string) => {
    // Handle accept request logic here
    console.log(`Accepted request with id: ${id}`);
  };

  const handleRejectRequest = (id: string) => {
    // Handle reject request logic here
    console.log(`Rejected request with id: ${id}`);
  };

  return (
    <div className="bg-[var(--bg-1)] px-3 lg:px-6 relative before:bg-[#E0D9FD] before:w-full before:h-[70px] before:absolute before:top-0 before:left-0 pb-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">Dashboard Chauffeur</h1>
      </div>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex justify-between mb-4">
        <Link href="/create-vehicle-request">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              Faire une annonce de recherche de véhicule
            </button>
          </Link>
          <Link href="/create-announcement">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <PencilIcon className="w-5 h-5 mr-2" />
              Faire une annonce
            </button>
          </Link>
          <Link href="/vehicule-rentals">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center">
              <Image src={iconCar} alt="logo" className="w-5 h-5 mr-2" />
              Voir les annonces de location de véhicule
            </button>
          </Link>
          
          
        </div>
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <ul className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <li key={notification.id} className="py-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={notification.icon as StaticImageData}
                  alt="Notification Icon"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {new Date(notification.date).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Demandes des Passagers</h2>
        <ul className="divide-y divide-gray-200">
          {requests.map((request) => (
            <li key={request.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {request.passengerName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {request.message}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {new Date(request.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition flex items-center"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    <CheckIcon className="w-5 h-5 mr-1" />
                    Accepter
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition flex items-center"
                    onClick={() => handleRejectRequest(request.id)}
                  >
                    <XMarkIcon className="w-5 h-5 mr-1" />
                    Refuser
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
