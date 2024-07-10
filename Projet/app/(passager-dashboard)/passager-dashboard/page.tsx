"use client";
import {
  ArrowRightIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "../../../public/data/adminrecentlisting";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import HeadlessList from "@/components/ListBox";
import CounterElement from "@/components/CounterElement";

const Page = () => {
  const firstDonutData = {
    options: {
      labels: ["Bangangte", "Yaounde", "Douala", "Garoua", "Bamenda"],
    },
    series: [5000, 4000, 3000, 2000, 1000], // Exemple de données de fréquentation
  };

  // Données pour le deuxième diagramme circulaire
  const secondDonutData = {
    options: {
      labels: ["Voiture", "monospace", "moto", "Bus"],
    },
    series: [5000, 3000, 2000, 1000], // Exemple de données sur le type de véhicule
  };

  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Dashboard Passager</h2>
      </div>
      {/* statisticts */}
      <section className="grid z-[1] grid-cols-12 gap-4 lg:gap-6 px-3 lg:px-6 bg-[var(--bg-2)] relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[100px] after:top-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        <div className="col-span-12 xxl:col-span-6">
          <div className=" rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
            <h3 className="h3 mb-4 lg:mb-6">Les plus visités</h3>

            <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4  items-center justify-space-around">
              <Chart
                options={{
                  chart: {
                    type: "donut",
                    toolbar: {
                      show: false,
                    },
                  },
                  colors: [
                    "#2D3A96",
                    "#3B22A2",
                    "#E0D9FD",
                    "#FE9261",
                    "#12ECFA",
                  ],
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    curve: "smooth",
                  },
                  labels: firstDonutData.options.labels,
                }}
                series={firstDonutData.series}
                type="donut"
              />
              <Chart
                options={{
                  chart: {
                    type: "donut",
                    toolbar: {
                      show: false,
                    },
                  },
                  colors: ["#2D3A97", "#3B22A6", "#E0D9FD", "#FE9460"],
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    curve: "smooth",
                  },
                  labels: secondDonutData.options.labels,
                }}
                series={secondDonutData.series}
                type="donut"
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
          <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
            <h3 className="h3">Statistiques</h3>
            <div className="flex items-center flex-wrap gap-3">
              <span>Triez par:</span>
              <div className="p-3 border rounded-full ml-2">
                <select className="focus:outline-none">
                  <option value="1">7 derniers mois</option>
                  <option value="2">7 dernières semaines</option>
                  <option value="3">7 derniers jours</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBFBF2] items-center">
              <i className="las self-center la-chart-area rounded-full bg-[var(--secondary-500)] text-white text-3xl p-4"></i>
              <div>
                <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                  <CounterElement end={256} />
                  Km
                </h2>
                <p>Kilomètres parcourus</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED] items-center">
              <i className="las self-center la-chart-bar rounded-full bg-[#9C742B] text-white text-3xl p-4"></i>
              <div>
                <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                  <CounterElement end={684} decimals={0} />
                </h2>
                <p>Nombres de voyages</p>
              </div>
            </div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-12 gap-4 lg:gap-6 px-4 lg:px-6 pt-4 lg:pt-6">
        <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-3 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
          <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-primary border-[14px]">
            <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
              <CounterElement end={86} decimals={0} />
              pf
            </h2>
          </div>
          <span className="text-2xl font-semibold mt-4">
            Points de fidélité
          </span>
          <span className="text-sm"></span>
        </div>
        <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-3 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
          <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[#37D279] border-[14px]">
            <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
              <CounterElement end={21} decimals={0} />
            </h2>
          </div>
          <span className="text-2xl font-semibold mt-4">
            Véhicules empruntés
          </span>
          <span className="text-sm">Depuis le début</span>
        </div>
        <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-3 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
          <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[var(--tertiary)] border-[14px]">
            <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
              <CounterElement end={15} />
            </h2>
          </div>
          <span className="text-2xl font-semibold mt-4">
            Destinations visitées
          </span>
          <span className="text-sm">Depuis le début</span>
        </div>
        <div className="col-span-12 sm:col-span-6 border xl:col-span-4 xxl:col-span-3 flex flex-col justify-center items-center p-4 md:p-6 lg:p-8 rounded-2xl bg-white">
          <div className="w-[200px] h-[200px] flex justify-center items-center rounded-full border-[#8A8DF5] border-[14px]">
            <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
              <CounterElement end={9.97} />k
            </h2>
          </div>
          <span className="text-2xl font-semibold mt-4">Dépensés</span>
          <span className="text-sm">Depuis le début</span>
        </div>
      </div>

      {/* Recent bookings */}
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
                  <th className="py-3 lg:py-4 px-2 xl:px-4">Nom voyage</th>
                  <th className="py-3 lg:py-4 px-2">Lieu départ</th>
                  <th className="py-3 lg:py-4 px-2">Conducteurs</th>
                  <th className="py-3 lg:py-4 px-2">Date</th>
                  <th className="py-3 lg:py-4 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Avis</th>
                </tr>
              </thead>
              <tbody>
                {adminRecentListings.map(
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
                      <td className="py-3 lg:py-4 px-2">{date}</td>

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
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
