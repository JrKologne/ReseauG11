"use client";
import {
  ArrowRightIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Pagination from "../../../components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "../../../public/data/adminrecentlisting";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import HeadlessList from "../../../components/ListBox";
import CounterElement from "../../../components/CounterElement";

const Page = () => {
  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Dashboard conducteur avec véhicule</h2>
      </div>
      <section className="grid z-[1] grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 px-6 bg-[var(--dark)] relative after:absolute xxl:after:bg-white after:w-full after:h-[50%] after:bottom-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#EBFBF2]">
          <i className="las self-center la-chart-bar rounded-full bg-[#9C742B] text-white text-3xl p-4"></i>{" "}
          <div>
            <h2 className="h2">
              $ <CounterElement end={26} />k
            </h2>
            <p>Nombre de voyages éffectués</p>
            <div className="flex items-center gap-3">
              <span>Trier par:</span>
              <div className="flex items-center p-2 border rounded-full ml-2">
                <select className="focus:outline-none">
                  <option value="1">Last 7 Month</option>
                  <option value="2">Last 7 Week</option>
                  <option value="3">Last 7 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#85f7ae]">
          <i className="lar self-center la-star rounded-full bg-primary text-white text-3xl p-4"></i>
          <div>
            <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
              <CounterElement end={7.6} decimals={1} />k
            </h2>
            <p>Avis du client</p>
            <div className="flex items-center gap-3">
              <span>Trier par:</span>
              <div className="flex items-center p-2 border rounded-full ml-2">
                <select className="focus:outline-none">
                  <option value="1">Last 7 Month</option>
                  <option value="2">Last 7 Week</option>
                  <option value="3">Last 7 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#b0b5f7]">
          <i className="las self-center la-file-alt rounded-full bg-primary text-white text-3xl p-4"></i>
          <div>
            <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
              <CounterElement end={66.5} decimals={1} />
              km
            </h2>
            <p>Nombre de kilomètres parcourus</p>
            <div className="flex items-center gap-3">
              <span>Trier par:</span>
              <div className="flex items-center p-2 border rounded-full ml-2">
                <select className="focus:outline-none">
                  <option value="1">Last 7 Month</option>
                  <option value="2">Last 7 Week</option>
                  <option value="3">Last 7 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 mt-4 lg:mt-6">
        <div className="p-3 sm:p-4 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white">
          <div className="flex flex-wrap gap-2 justify-between mb-7">
            <h3 className="h3">Historique des Voyages</h3>
            <Link
              href="/"
              className="text-primary font-semibold flex items-center gap-2"
            >
              Tout afficher <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2 xl:px-4">Nom du voyage</th>
                  <th className="py-3 lg:py-4 px-2">Itinéraire</th>
                  <th className="py-3 lg:py-4 px-2">Heure de départ</th>
                  <th className="py-3 lg:py-4 px-2">Date</th>
                  <th className="py-3 lg:py-4 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Review</th>
                </tr>
              </thead>
              <tbody>
                {adminRecentListings.map(
                  ({
                    id,
                    // heureDepart,
                    date,
                    // itineraire,
                    name,
                    review,
                    status,
                  }) => (
                    <tr
                      key={id}
                      className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300"
                    >
                      <td className="py-3 lg:py-4 px-2 xl:px-4">{name}</td>
                      <td className="py-3 lg:py-4 px-2 text-primary">
                        itineraire
                      </td>
                      <td className="py-3 lg:py-4 px-2">heureDepart</td>
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
    </div>
  );
};

export default Page;
