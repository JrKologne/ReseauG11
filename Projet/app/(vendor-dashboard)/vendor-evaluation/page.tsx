


/*"use client";
import {
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

export default Page;

*/
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HandThumbUpIcon, HandThumbDownIcon, HeartIcon } from "@heroicons/react/24/solid";

interface Comment {
  name: string;
  role: string;
  icon: JSX.Element;
  date: string;
  comment: string;
}

const CommentsSection = () => {
  const URL = "http://localhost:8086";
  const [disponible, setDisponible] = useState(true);

  useEffect(() => {
    const driverId = "IDENTIFIANT_PASSE_EN_GET";
    axios.get(`${URL}/isDisponible?driverId=${driverId}`)
      .then(response => {
        const dispo = response.data.disponible === "true";
        setDisponible(dispo);
      })
      .catch(error => console.error(error));
  }, []);

  const agencyComments: Comment[] = [
    {
      name: "Josée",
      role: "Directrice d'Agence",
      icon: <HandThumbUpIcon className="w-5 h-5 text-blue-500" />,
      date: "23.10.2024 à 18h15",
      comment: "Christian est un chauffeur exceptionnel. Il est très professionnel et remet toujours les véhicules dans leur état de départ.",
    },
    {
      name: "Marc",
      role: "Agent de Location",
      icon: <HandThumbDownIcon className="w-5 h-5 text-gray-900" />,
      date: "12.10.2024 à 14h00",
      comment: "Christian n'a pas su entretenir le véhicule et a causé beaucoup de dégats.",
    },
  ];

  const passengerComments: Comment[] = [
    {
      name: "Cedrick",
      role: "Ingénieur logiciel",
      icon: <HandThumbDownIcon className="w-5 h-5 text-gray-900" />,
      date: "23.10.2024 à 18h15",
      comment: "Il était en retard",
    },
    {
      name: "Foueguim",
      role: "Webmaster",
      icon: <HeartIcon className="w-5 h-5 text-red-500" />,
      date: "23.10.2024 à 18h15",
      comment: "Christian était un excellent chauffeur. Il était amical, serviable et a rendu le trajet très agréable. Je le recommande à tous ceux qui recherchent un chauffeur fiable.",
    },
  ];

  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="bg-white rounded-2xl p-6 mb-6 lg:mb-0 lg:mr-3 shadow-md flex-1">
          <h3 className="text-xl font-bold mb-4">Commentaires des Agences de Location</h3>
          {agencyComments.map((comment, index) => (
            <div key={index} className="p-4 border-b last:border-b-0">
              <div className="flex items-center mb-2">
                <h4 className="text-lg font-semibold">{comment.name} | {comment.role}</h4>
                <span className="ml-2">{comment.icon}</span>
              </div>
              <p className="text-gray-700">{comment.comment}</p>
              <div className="text-right text-gray-500 text-sm mt-2">{comment.date}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md flex-1">
          <h3 className="text-xl font-bold mb-4">Commentaires des Passagers</h3>
          {passengerComments.map((comment, index) => (
            <div key={index} className="p-4 border-b last:border-b-0">
              <div className="flex items-center mb-2">
                <h4 className="text-lg font-semibold">{comment.name} | {comment.role}</h4>
                <span className="ml-2">{comment.icon}</span>
              </div>
              <p className="text-gray-700">{comment.comment}</p>
              <div className="text-right text-gray-500 text-sm mt-2">{comment.date}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
          Voir tous les commentaires
        </button>
      </div>
    </div>
  );
}

export default CommentsSection;
