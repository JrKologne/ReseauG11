"use client";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRightIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ShieldExclamationIcon
} from "@heroicons/react/24/outline";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "../../../public/data/adminrecentlisting";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import HeadlessList from "@/components/ListBox";

import dynamic from "next/dynamic";

import CounterElement from "@/components/CounterElement";
import { useEffect, useState } from "react";

const Page = () => {
  interface Listing {
    id: number;
    name: string;
    location: string;
    agent: string;
    date: string;
    status: string;
    review: string;
  }

  let [sortList, setSortList] = useState<Listing[]>([]);

  const [ans, setAns] = useState(true);
  
  useEffect(() => {
    setSortList(adminRecentListings);
  },[])

  const sortByDate = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const sortByName = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => a.name.localeCompare(b.name));
  };

  const sortByLocation = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => a.location.localeCompare(b.location));
  };

  const sortByAgent = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => a.agent.localeCompare(b.agent));
  };

  const sortByStatus = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => a.status.localeCompare(b.status));
  };

  const sortByReview = (listings: Listing[]): Listing[] => {
    return listings.sort((a, b) => parseFloat(a.review) - parseFloat(b.review));
  };

  const handleClickDate = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByDate(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickName = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByName(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 200);
    console.log(sortList)
  };

  const handleClickLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByLocation(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickAgent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByAgent(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByStatus(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  const handleClickReview = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAns(false);
    setSortList(sortByReview(adminRecentListings));
    setTimeout(() => {
      setAns(true);
    }, 100);
  };

  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Dashboard Adiministrator</h2>
      </div>
      {/* statisticts */}
      <section className="grid z-[1] grid-cols-12 gap-4 lg:gap-6 px-3 lg:px-6 bg-[var(--bg-2)] relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[100px] after:top-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        <div className="col-span-12 xxl:col-span-6">
          <div className=" rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
            <h3 className="h3 mb-4 lg:mb-6">
              Nombre et Gain des Voyages par Date
            </h3>
            <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
              <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
                <h3 className="h3"></h3>
                <div className="flex items-center flex-wrap gap-3">
                  <span>Sélectionner la date:</span>
                  <div className="p-3 border rounded-full ml-2">
                    <select className="focus:outline-none">
                      <option value="1">Last 7 Months</option>
                      <option value="2">Last 7 Weeks</option>
                      <option value="3">Last 7 Days</option>
                      <option value="3">Last 7 Hours</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 lg:gap-6">
                <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBFBF2] items-center">
                  <i className="las self-center la-chart-area rounded-full bg-[var(--secondary-500)] text-white text-3xl p-4"></i>
                  <div>
                    <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                      $
                      <CounterElement end={256} />k
                    </h2>
                    <p>Revenus</p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED] items-center">
                  <i className="las self-center la-chart-bar rounded-full bg-[#9c742B] text-white text-3xl p-4"></i>
                  <div>
                    <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                      <CounterElement end={6.4} decimals={1} />
                    </h2>
                    <p>nombre de voyages</p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
                  <i className="las self-center la-file-alt rounded-full bg-primary text-white text-3xl p-4"></i>
                  <div>
                    <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                      <CounterElement end={7.6} decimals={1} />
                    </h2>
                    <p>Type de véhicule</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
          <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
            <h3 className="h3">Nombre d Utilsateurs Par Profil</h3>
            <div className="grid grid-cols-12 gap-4 lg:gap-6 px-4 lg:px-6 pt-4 lg:pt-6">
              <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-4 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
                <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-primary border-[14px]">
                  <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                    <CounterElement end={8.6} decimals={1} />k
                  </h2>
                </div>
                <span className="text-2xl font-semibold mt-4">passager</span>
                <span className="text-sm"></span>
              </div>
              <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-4 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
                <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[#37D279] border-[14px]">
                  <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                    <CounterElement end={66.5} decimals={1} />k
                  </h2>
                </div>
                <span className="text-2xl font-semibold mt-4">Conducteur</span>
                <span className="text-sm"></span>
              </div>
              <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-4 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
                <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[var(--tertiary)] border-[14px]">
                  <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                    <CounterElement end={95} />k
                  </h2>
                </div>
                <span className="text-2xl font-semibold mt-4">
                  Propriétaire
                </span>
                <span className="text-sm"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 m-5 md:p-6 lg:p-8 bg-white border">
        <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
          <h3 className="h3">Taux de conversion des Utilisateurs</h3>
        </div>
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED] items-center">
            <i className="las self-center la-chart-bar rounded-full bg-[#9c742B] text-white text-3xl p-4"></i>
            <div>
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={66.5} decimals={1} />k
              </h2>

              <p>Visiteurs</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
            <i className="las self-center la-file-alt rounded-full bg-primary text-white text-3xl p-4"></i>
            <div>
              <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                <CounterElement end={8.6} decimals={1} />
              </h2>

              <p>Liste de visiteurs inscrits</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 m-5 md:p-6 lg:p-8 bg-white border">
        <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
          <h3 className="h3">Taux de satisfaction des utilisateurs</h3>
        </div>
        <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
          <i className="lar self-center la-star rounded-full bg-primary text-white text-3xl p-4"></i>
          <div>
            <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
              <CounterElement end={95} />
            </h2>

            <p>Appréciation des clients</p>
          </div>
        </div>
      </div>

      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 mt-4 lg:mt-6">
        <div className="p-3 sm:p-4 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white">
          <div className="flex flex-wrap gap-2 justify-between mb-7">
            <h3 className="h3">Récents voyages</h3>
            <Link
              href="/"
              className="text-primary font-semibold flex items-center gap-2"
            >
              tout visiter <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2 xl:px-4">
                    Itinéraire
                    <button onClick={handleClickName}>
                      <BarsArrowDownIcon
                        className="ml-2 mr-2 w-7 h-5"
                      />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Lieu départ
                    <button onClick={handleClickLocation}>
                      <BarsArrowDownIcon
                              className="ml-2 mr-2 w-7 h-5"
                      />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Conducteurs
                    <button onClick={handleClickAgent}>
                      <BarsArrowDownIcon
                              className="ml-2 mr-2 w-7 h-5"
                      />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Date
                    <button onClick={handleClickDate}>
                      <BarsArrowDownIcon
                          className="ml-2 mr-2 w-7 h-5"
                      />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Status
                    <button onClick={handleClickStatus}>
                      <BarsArrowDownIcon
                          className="ml-2 mr-2 w-7 h-5"
                      />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">
                    Avis
                    <button onClick={handleClickReview}>
                      <BarsArrowDownIcon
                          className="ml-2 mr-2 w-7 h-5"
                      />
                    </button>
                  </th>
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {ans &&
                  sortList.map(
                    ({ id, agent, date, location, name, review, status }) => (
                      <tr
                        key={id}
                        className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300"
                      >
                        <td className="py-3 lg:py-4 px-2 xl:px-4">{name}</td>
                        <td className="py-3 lg:py-4 px-2 text-primary">
                          {location}
                        </td>
                        <td className="py-3 lg:py-4 px-2">{agent}</td>
                        <td className="py-3 lg:py-4 px-2">
                          <button onClick={() => handleClickDate}>
                            {date}
                          </button>
                        </td>

                        <td className={`py-3 lg:py-4 px-2`}>
                          <div className={`w-32`}>
                            <HeadlessList initialValue={status} />
                          </div>
                        </td>
                        <td className="py-3 lg:py-4 px-2">
                          <span className="flex gap-1 items-center">
                            <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                            {review}
                          </span>
                        </td>
                        <td className="py-3 lg:py-4 px-2">
                          <button className="text-primary px-2">
                            <PencilSquareIcon className="w-5 h-5" />
                          </button>
                          <button className="text-yellow-500 px-2">
                            <ShieldExclamationIcon className="w-5 h-5" />
                          </button>
                          <button className="text-red-500 px-2">
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
