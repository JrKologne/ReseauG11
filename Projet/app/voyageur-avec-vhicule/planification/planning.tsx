import { useState, useMemo, useContext, useEffect, KeyboardEvent, FormEvent } from 'react';
import dayjs from 'dayjs';
import { GlobalContext } from '../context/GlobalContext';
import { getMonth } from '../utils/util';
import { Event } from '../interfaces/types';
import Image from 'next/image';
import { formError } from '../interfaces/types';


const CalendarPage: React.FC = () => {

  const { MonthID, setMonthID } = useContext(GlobalContext);
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);


  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const [departure, setDeparture] = useState<string>('')
  const [arrival, setArrival] = useState<string>('')
  const [nbPlace, setNbPlace] = useState<number | null>(null)
  const [categorie, setCategorie] = useState<string | null>('')
  const [marque, setMarque] = useState<string | null>('')


  const [showForm, setShowForm] = useState<boolean>(false);

  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const { eventsMonth, setEventsMonth } = useContext(GlobalContext);
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

  const sortedEvents = useMemo(() => {
    return eventsMonth.sort((a, b) => dayjs(a.startDateTime).diff(dayjs(b.startDateTime)));
  }, []);

  const groupedEvents = useMemo(() => {
    const result: { [year: number]: { [month: number]: Event[] } } = {};

    sortedEvents.forEach((event) => {
      const eventYear = dayjs(event.startDateTime).year();
      const eventMonth = dayjs(event.startDateTime).month();

      if (!result[eventYear]) {
        result[eventYear] = {};
      }

      if (!result[eventYear][eventMonth]) {
        result[eventYear][eventMonth] = [];
      }

      result[eventYear][eventMonth].push(event);
    });

    return result;
  }, [sortedEvents]);


  //gestion du changement des mois et indice de mois
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);


  useEffect(() => {
    setCurrentMonthIndex(monthIndex)
  }, [monthIndex])



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
    if (title && startDate && startTime && endDate && endTime && departure && arrival && nbPlace && categorie && marque) {

      const startDateTime = `${startDate}T${startTime}`;
      const endDateTime = `${endDate}T${endTime}`;

      const startDate1 = dayjs(startDateTime);
      const endDate1 = dayjs(endDateTime);
      const currentDate = dayjs().startOf('day')
      const start = dayjs(startDate).startOf('day')


      if (selectedEvent) {

        if(startDate1.isBefore(endDate1)){
          if(currentDate.isBefore(start) || currentDate.isSame(start)){
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
      setCategorie("");
      setMarque("")
          }else{
            setErrors((prevErrors) => ({
              ...prevErrors,
              startDate: "La date de debut doit etre après la date d'aujourd'hui ou etre la meme date",
            }));
            setShowAlert(true);
          }
        }else{
          setErrors((prevErrors) => ({
            ...prevErrors,
            endDate: "La date de fin doit être après la date de début",
          }));
          setShowAlert(true);
        }
        
      } else {
        if(startDate1.isBefore(endDate1)){
          if(currentDate.isBefore(start) || currentDate.isSame(start)){
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
      setCategorie("");
      setMarque("")
          }else{
            setErrors((prevErrors) => ({
              ...prevErrors,
              startDate: "La date de debut doit etre après la date d'aujourd'hui ou etre la meme date",
            }));
            setShowAlert(true);
          }
        }else{
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
    setCategorie("");
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
    setNbPlace(null)
    setCategorie("");
    setMarque("")
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




  return (
    <div className="flex-1 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl text-center text-blue-600 font-bold mb-6">◈-PLAN-◈</h1>

        <div className="space-y-8">
          {Object.keys(groupedEvents)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((year) => (
              <div key={year}>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {parseInt(year) === selectedYear ? (
                    <button
                      onClick={() => setSelectedYear(parseInt(year))}
                      className="text-blue-500 hover:text-blue-600 hover:underline"
                    >
                      {year}
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedYear(parseInt(year))}
                      className="text-gray-600 hover:text-blue-500 hover:underline"
                    >
                      {year}
                    </button>
                  )}
                </h2>

                {Object.keys(groupedEvents[parseInt(year)]).map((month) => (
                  <div key={month} className="space-y-4">
                    <h3 className="text-xl m-7 text-green-600 font-bold text-gray-700">
                      ➳◅  {dayjs(`${year}-${parseInt(month) + 1}-01`).format('MMMM')}  ➳◅
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                      {groupedEvents[parseInt(year)][parseInt(month)].map((event) => (
                        <div
                          key={event.id}
                          className="bg-blue-600 border cursor-pointer shadow-md rounded-lg p-4 hover:bg-green-600 transition-colors duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event);
                          }}
                        >
                          <h4 className="text-2xl text-center  font-bold mb-2 text-white">{event.title}</h4>
                          <div className="flex flex-col items-center justify-between mb-4">
                            <span className="text-lg text-white">
                              Debut : {dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')}
                            </span>
                            <span className="text-lg text-white">
                              Fin : {dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}
                            </span>
                            <span className="text-lg text-white">
                              Lieu de depart : {event.departure}
                            </span>
                            <span className="text-lg text-white">
                              Lieu d'arrivée : {event.arrival}
                            </span>
                            <span className="text-lg text-white">
                              Nombre de place : {event.nbPlace}
                            </span>
                            <span className="text-lg text-white">
                              Categorie : {event.categorie} 
                            </span>
                            <span className="text-lg text-white">
                              Marque : {event.marque} 
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
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
    </div>
  );
};

export default CalendarPage;