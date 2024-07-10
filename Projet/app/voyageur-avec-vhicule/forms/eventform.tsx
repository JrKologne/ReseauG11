import { FC, useState, useEffect, useContext, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { GlobalContext } from '../context/GlobalContext';
import { Event } from '../interfaces/types';

interface EventFormProps {
    eventToEdit: Event | null;
    clearEdit: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    title: string;
    start: Dayjs | null;
    end: Dayjs | null;
    departure: string | null;
    arrival: string | null;
    nbPlace: number | null;
    categorie: string | null;
    marque: string | null;
    setTitle: (title: string) => void;
    setStart: (start: Dayjs | null) => void;
    setEnd: (end: Dayjs | null) => void;
    setDeparture: (departure: string) => void;
    setArrival: (arrival: string) => void;
    setNbPlace: (nbPlace: number) => void;
    setCategorie: (categorie: string | null) => void;
    setMarque: (marque: string | null) => void;

}

const EventForm: FC<EventFormProps> = ({ setCategorie, setMarque, categorie, marque, setNbPlace, setArrival, setDeparture, setStart, setEnd, setTitle, handleSubmit, eventToEdit, clearEdit, title, start, end, departure, arrival, nbPlace }) => {

    const { eventsMonth, setEventsMonth } = useContext(GlobalContext);





    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <div className='bg-blue-100 p-10'>
                <div>
                    <h1 className='text-center mb-5 text-4xl'>{eventToEdit ? 'Modifier' : 'Ajouter'}</h1>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />


                    <label className="block text-sm font-medium text-gray-700">Heure de Début</label>
                    <input
                        type="time"
                        value={start?.format('HH:mm')}
                        onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':');
                            const newStart = dayjs()
                                .hour(parseInt(hours))
                                .minute(parseInt(minutes));
                            setStart(newStart);
                            if (end && newStart.isAfter(end)) {
                                setEnd(newStart);
                            }
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />


                    <label className="block text-sm font-medium text-gray-700"> Heure De Fin</label>
                    <input
                        type="time"
                        value={end?.format('HH:mm')}
                        onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':');
                            const newEnd = dayjs()
                                .hour(parseInt(hours))
                                .minute(parseInt(minutes));
                            setEnd(newEnd);
                            if (start && newEnd.isBefore(start)) {
                                setStart(newEnd);
                            }
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />




                    <label className="block">
                        <span className="text-gray-700">Lieu de départ</span>
                        <input
                            type="text"
                            required
                            value={departure ?? ""}
                            onChange={(e) => setDeparture(e.target.value)}
                            className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Lieu d'arrivée</span>
                        <input
                            type="text"
                            required
                            value={arrival ?? ""}
                            onChange={(e) => setArrival(e.target.value)}
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
                        <span className="text-gray-700">Catégorie : </span>
                        <input
                            type="text"
                            required
                            value={categorie ?? ""}
                            onChange={(e) => setCategorie((e.target.value))}
                            className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Marque : </span>
                        <input
                            type="text"
                            required
                            value={marque ?? ""}
                            onChange={(e) => setMarque((e.target.value))}
                            className="mt-1 text-xl text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </label>
                </div>
                <div className="flex space-x-4 mt-5">
                    <button
                        type='submit'
                        className="bg-blue-500 text-white px-4 py-2 rounded">
                        {eventToEdit ? 'Modifier' : 'Ajouter'}

                    </button>

                    {(
                        <button
                            type="button"
                            onClick={clearEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Annuler
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default EventForm;