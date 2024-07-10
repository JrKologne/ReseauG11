"use client";
import {
  ArrowRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { recentBookings } from "@/public/data/recentbookings";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import CounterElement from "@/components/CounterElement";

const Page = () => {
  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Dashboard Conducteur sans véhicule</h2>
      </div>
      {/* statisticts */}
      <div className="grid z-[1] grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 px-6 bg-[var(--dark)] relative after:absolute xxl:after:bg-white after:w-full after:h-[50%] after:bottom-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#EBFBF2]">
          <i className="las self-center la-chart-area rounded-full bg-[var(--secondary-500)] text-white text-3xl p-4"></i>
          <div>
            <h2 className="h2">
              $ <CounterElement end={26} />k
            </h2>
            <p>Gain par Vehicule</p>
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
        <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED]">
          <i className="las self-center la-chart-bar rounded-full bg-[#9C742B] text-white text-3xl p-4"></i>
          <div>
            <h2 className="h2">
              <CounterElement end={6.4} decimals={1} />k
            </h2>
            <p>Voyages publiés</p>
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
        <div className="col-span-1 sm:col-span-1 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD]">
          <i className="lar self-center la-star rounded-full bg-primary text-white text-3xl p-4"></i>
          <div className="p-4">
            <h2 className="h2">
              {" "}
              <CounterElement end={7.6} decimals={1} />k
            </h2>
            <p>Avis Clients</p>
          </div>
        </div>
      </div>
      {/* Recent bookings */}
      <section className="bg-white px-3 lg:px-6 mt-4 lg:mt-6 pb-5">
        <div className=" p-3 sm:p-4 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl">
          <div className="flex justify-between mb-7">
            <h3 className="h3">Historique de publications</h3>
            <Link
              href="/"
              className="text-primary font-semibold flex items-center gap-2"
            >
              Tout voir <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[#F5F5FE] border-b border-dashed">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Itinéraire</th>
                  <th className="py-3 px-2">Passagers</th>
                  <th className="py-3 px-2">Coût</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Durée</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Avis</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(
                  ({ id, amount, date, item, paid, status, time, review }) => (
                    <tr key={id} className="border-b border-dashed">
                      <td className="py-3 px-2">{id}</td>
                      <td className="py-3 px-2 text-primary">{item}</td>
                      <td className="py-3 px-2">{amount}</td>
                      <td className="py-3 px-2">{paid}</td>
                      <td className="py-3 px-2">{date}</td>
                      <td className="py-3 px-2">{time}</td>
                      <td className={`py-3 px-2`}>
                        <span
                          className={`py-2 px-3 rounded-xl ${
                            status == "Rejected" &&
                            "text-[var(--secondary-500)] bg-[#EBFBF2]"
                          } ${
                            status == "Successfull" &&
                            "text-primary bg-[#EBEBFD]"
                          } ${
                            status == "Pending" && "text-[#9C742B] bg-[#FFF9ED]"
                          }`}
                        >
                          {status}
                        </span>
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
