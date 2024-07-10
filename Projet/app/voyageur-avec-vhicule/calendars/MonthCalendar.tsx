
import React, { useState, useEffect, useContext, KeyboardEvent, FormEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Image from 'next/image';
import { GlobalContext } from '../context/GlobalContext';
import { Event } from '../interfaces/types';
import { getMonth } from '../utils/util';
import { formError } from '../interfaces/types';



dayjs.extend(localizedFormat);

const MonthlyCalendar: React.FC = () => {

  const { eventsMonth, setEventsMonth } = useContext(GlobalContext);
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const { MonthID, setMonthID } = useContext(GlobalContext);

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [departure, setDeparture] = useState<string>('')
  const [arrival, setArrival] = useState<string>('')
  const [nbPlace, setNbPlace] = useState<number | null>(null)
  const [categorie, setCategorie] = useState<string | null>('')
  const [marque, setMarque] = useState<string | null>('')

  const [errors, setErrors] = useState<formError>({
    endDate: '',
    startDate: ''
  })
  const [showAlert, setShowAlert] = useState(false);


  const handleClose = () => {
    setShowAlert(false);
    setErrors({
      endDate: '',
      startDate: ''
    })
  };


  //gestion du changement des mois et indice de mois
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);


  useEffect(() => {
    setCurrentMonthIndex(monthIndex)
  }, [monthIndex])

  function handlePrevMonth() {
    setCurrentMonthIndex(currentMonthIndex - 1)
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIndex(currentMonthIndex + 1)
    setMonthIndex(monthIndex + 1);
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      handleFormSubmit(e);
    }
  };

  //gestion de la sélection des évènements
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setStartDate(dayjs(event.startDateTime).format('YYYY-MM-DD'));
    setStartTime(dayjs(event.startDateTime).format('HH:mm'));
    setEndDate(dayjs(event.endDateTime).format('YYYY-MM-DD'));
    setEndTime(dayjs(event.endDateTime).format('HH:mm'));
    setDeparture(event.departure)
    setArrival(event.arrival)
    setNbPlace(event.nbPlace)
    setCategorie(event.categorie)
    setMarque(event.marque)
    setShowForm(true);
  };

  //gestion de la soumission du formulaire
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && startDate && startTime && endDate && endTime && arrival && departure && nbPlace && categorie && marque) {

      const startDateTime = `${startDate}T${startTime}`;
      const endDateTime = `${endDate}T${endTime}`;

      const startDate1 = dayjs(startDateTime);
      const endDate1 = dayjs(endDateTime);
      const currentDate = dayjs().startOf('day')
      const start = dayjs(startDate).startOf('day')


      if (selectedEvent) {

        if (startDate1.isBefore(endDate1)) {
          if (currentDate.isBefore(start) || currentDate.isSame(start)) {
            setEventsMonth(eventsMonth.map(ev => ev.id === selectedEvent.id ? { ...ev, title, startDateTime, endDateTime, departure, arrival, nbPlace, categorie, marque } : ev));
            setSelectedEvent(null)

            //mise à jour après soumission
            setShowForm(false);
            setSelectedEvent(null)

            setTitle('');
            setStartDate('');
            setStartTime('');
            setEndDate('');
            setEndTime('');
            setDeparture('')
            setArrival('')
            setNbPlace(null)
            setCategorie("")
            setMarque("")
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              startDate: "La date de debut doit etre après la date d'aujourd'hui ou etre la meme date",
            }));
            setShowAlert(true);
          }
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            endDate: "La date de fin doit être après la date de début",
          }));
          setShowAlert(true);
        }

      } else {
        if (startDate1.isBefore(endDate1)) {
          if (currentDate.isBefore(start) || currentDate.isSame(start)) {
            const val: number = MonthID
            setMonthID(val + 1);
            setEventsMonth([...eventsMonth, { id: MonthID, title, startDateTime, endDateTime, departure, arrival, nbPlace, categorie, marque }]);

            //mise à jour après soumission
            setShowForm(false);
            setSelectedEvent(null)

            setTitle('');
            setStartDate('');
            setStartTime('');
            setEndDate('');
            setEndTime('');
            setDeparture('')
            setArrival('')
            setNbPlace(null)
            setCategorie("")
            setMarque("")
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              startDate: "La date de debut doit etre après la date d'aujourd'hui ou etre la meme date",
            }));
            setShowAlert(true);
          }
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            endDate: "La date de fin doit être après la date de début",
          }));
          setShowAlert(true);
        }


      }

    }
  };

  //gestion de l'annulation d'une modification, d'un ajout ou d'une suppression d'un évènement
  const handleCancel = () => {
    setShowForm(false);
    setSelectedEvent(null);
    setTitle('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setDeparture('')
    setArrival('')
    setNbPlace(null)
    setCategorie("")
    setMarque("")
  }

  //gestion de la suppression d'un évènement
  const handleDelete = (id: number) => {
    setEventsMonth(eventsMonth.filter(ev => ev.id !== id));
    setShowForm(false);
    setSelectedEvent(null)
    setTitle('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setDeparture('')
    setArrival('')
    setCategorie("")
    setMarque("")
    setNbPlace(null)

  };
  // definition des couleurs des évènements
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  //recuperation de jour les jours associés à un évènement donné 
  const getEventDaysBetween = (event: Event): string[] => {

    const start: Dayjs = dayjs(event.startDateTime);
    const end: Dayjs = dayjs(event.endDateTime);
    const days: string[] = [];

    let currentDay: Dayjs = start.clone();
    while (currentDay.isBefore(end, 'day') || currentDay.isSame(end, 'day')) {
      days.push(currentDay.format('YYYY-MM-DD'));
      currentDay = currentDay.add(1, 'day');
    }

    return days;
  };

  //recuperation des évènements associés à un jour donné
  const getEventsForDate = (date: string) => {
    return eventsMonth.flatMap((event, index) => {
      const eventDays = getEventDaysBetween(event);
      if (eventDays.includes(date)) {
        return [
          {
            ...event,
            colorClass: colors[index % colors.length],
          },
        ];
      }
      return [];
    });
  };

  return (
    <div className='flex-1' >
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <button onClick={handlePrevMonth} className="px-4 py-2 bg-blue-500 text-white rounded">
            <span className="cursor-pointer text-blue-600 mx-2">
              <Image
                src="/images/chevron-g.svg"
                alt="chevron"
                width={25}
                height={25}
                priority
              />
            </span>
          </button>
          <h2 className="text-xl font-bold">{dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            "MMMM YYYY"
          )}</h2>
          <button onClick={handleNextMonth} className="px-4 py-2 bg-blue-500 text-white rounded">
            <span className="cursor-pointer text-blue-600 mx-2">
              <Image
                src="/images/chevron-d.svg"
                alt="chevron"
                width={25}
                height={25}
                priority
              />
            </span>
          </button>
        </div>
        <div className='flex-1 grid grid-cols-7 grid-rows-5'>

          {currentMonth[0].map((day: any, i: any) => (
            <span key={i} className="text-sm py-1 text-center">
              {day.format('dd').charAt(0)}
            </span>

          ))}

          {currentMonth.map((row: any, i: any) => (
            <React.Fragment key={i}>
              {row.map((day: any, index: any) => (

                <div
                  className={`border p-2 h-24}`}
                >
                  <h3
                    className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full transition-colors duration-300 ${day.isSame(dayjs(), 'day')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    {day.format("D")}
                  </h3>

                  <ul>
                    {getEventsForDate(day.format('YYYY-MM-DD')).map((event, index) => (
                      <li
                        key={index}
                        className={` p-1 rounded mb-1 cursor-pointer group ${event.colorClass}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                      >

                        <button
                          className="flex items-center w-full  hover:bg-blue-300 group-hover:bg-blue-300"
                        >
                          <span className="mr-2.5 transition-flex duration-300 flex-0 group-hover:flex-1">
                            {event.title}
                          </span>
                          <span>▶</span>
                        </button>

                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        ><span className="cursor-pointer text-blue-600 mx-2">
            <Image
              src="/images/add.svg"
              alt="chevron"
              width={25}
              height={25}
              priority
            />
          </span>
        </button>
        {showForm && (
          <form onSubmit={handleFormSubmit} onKeyPress={handleKeyPress}>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-blue-100 p-8 rounded shadow-lg w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6">{selectedEvent ? 'Modifier' : 'Ajouter'} un évènement</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="text-gray-700">Titre</span>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Lieu de départ</span>
                    <input
                      type="text"
                      required
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Date de début</span>
                    <input
                      required
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Lieu d'arrivée</span>
                    <input
                      type="text"
                      required
                      value={arrival}
                      onChange={(e) => setArrival(e.target.value)}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Heure de début</span>
                    <input
                      required
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Catégorie :</span>
                    <input
                      type="text"
                      required
                      value={categorie ?? ""}
                      onChange={(e) => setCategorie(e.target.value)}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Date de fin</span>
                    <input
                      required
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Nombre de places</span>
                    <input
                      type="number"
                      required
                      value={nbPlace ?? ""}
                      onChange={(e) => setNbPlace(parseInt(e.target.value))}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Heure de fin</span>
                    <input
                      required
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>    
                  <label className="block">
                    <span className="text-gray-700">Marque :</span>
                    <input
                      type="text"
                      required
                      value={marque ?? ""}
                      onChange={(e) => setMarque(e.target.value)}
                      className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type='submit'
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                  >
                    {selectedEvent ? 'Modifier' : 'Valider'}
                  </button>
                  {selectedEvent && (
                    <button
                      onClick={() => handleDelete(selectedEvent.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
                    >
                      Supprimer
                    </button>
                  )}
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </form>

        )}
      </div>
      <div>
        {showAlert && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{errors.endDate}</h3>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{errors.startDate}</h3>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={handleClose}
                  >
                    fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MonthlyCalendar;
