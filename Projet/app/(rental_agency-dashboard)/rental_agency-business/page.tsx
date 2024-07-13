"use client";
import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import Car from '@/public/img/th.png';
import { Vehicle } from '@/public/types/Vehicule';

const Page = () => {
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [tariff, setTariff] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const newVehiclesData: Vehicle[] = [{
      id: 1,
      brand: 'Brand A',
      registration: '',
      image: null,
      type: 'Car',
      model: '',
      fuelType: 'Essence',
      mileage: 0,
      tankVolume: 0,
      consumptionPerKm: 0,
      comfortType: '',
      experience: '',
      cv: '',
      registrationNumber: '',
      baggageCapacity: '',
      size: '',
      gearboxType: 'Manuelle',
      manufacturer: '',
      availableSeats: 0,
    }];
    setVehiclesData(newVehiclesData);
  }, []);

  const handleInputChange = (id: number, field: keyof Vehicle, value: any) => {
    const updatedVehicles = vehiclesData.map(vehicle =>
      vehicle.id === id ? { ...vehicle, [field]: value } : vehicle
    );
    setVehiclesData(updatedVehicles);
    setIsEditing(true);
  };

  const saveChanges = () => {
    // Logic to save the vehicle data
    console.log('Vehicles saved:', vehiclesData);
    setIsEditing(false);
  };

  const handleImageUpload = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedVehicles = vehiclesData.map(vehicle =>
        vehicle.id === id ? { ...vehicle, image: file } : vehicle
      );
      setVehiclesData(updatedVehicles);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const addVehicle = () => {
    const newVehicleId = vehiclesData.length + 1;
    const newVehicle: Vehicle = {
      id: newVehicleId,
      brand: `Brand ${String.fromCharCode(65 + newVehicleId)}`,
      registration: '',
      image: null,
      type: 'Car',
      model: '',
      fuelType: 'Essence',
      mileage: 0,
      tankVolume: 0,
      consumptionPerKm: 0,
      comfortType: '',
      experience: '',
      cv: '',
      registrationNumber: '',
      baggageCapacity: '',
      size: '',
      gearboxType: 'Manuelle',
      manufacturer: '',
      availableSeats: 0,
    };
    setVehiclesData([...vehiclesData, newVehicle]);
  };

  return (
    <div className="px-3 lg:px-6 bg-[var(--bg-1)] pt-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Enregistrement et gestion des véhicules</h2>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <Image src={Car} alt="logo" className="w-6 h-6 mr-1 text-gray-500" />
            <input
              type="text"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
              placeholder="Tarif par heure en FCFA"
              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {isEditing && (
            <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={saveChanges}>
              Sauvegarder les modifications
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Gestion des véhicules</h2>
        <div className="p-4 rounded-lg bg-white">
          {vehiclesData.map(vehicle => (
            <div key={vehicle.id} className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                  {vehicle.brand} - {vehicle.type}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-20 h-20 relative">
                  {vehicle.image ? (
                    <img src={URL.createObjectURL(vehicle.image)} alt="vehicle" className="w-full h-full object-cover rounded-md" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                      <Image src={Car} alt="car" className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-0 right-0 p-1 bg-white rounded-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(vehicle.id, e)}
                      className="hidden"
                    />
                    <button className="w-6 h-6 flex items-center justify-center" title="Modifier l'image">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-edit"
                      >
                        <path d="M17 3h4v4L7.5 21l-4-4L17 3zM3 17l11-11M23 3h-6M23 3v6M3 21L21 3" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-gray-500">Modèle:</div>
                  <div>{vehicle.model}</div>
                </div>
                <div className="ml-4">
                  <div className="text-gray-500">Carburant:</div>
                  <div>{vehicle.fuelType}</div>
                </div>
                <div className="ml-4">
                  <div className="text-gray-500">Kilométrage:</div>
                  <div>{vehicle.mileage}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-gray-500">Sièges disponibles:</div>
                <div className="flex items-center mt-2">
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      const newAvailableSeats = vehicle.availableSeats - 1;
                      const rest = newAvailableSeats >= 0 ? newAvailableSeats : 0;
                      handleInputChange(vehicle.id, 'availableSeats', rest);
                    }}
                  >
                    - Supprimer une place
                  </button>
                  <span className="mx-2">{vehicle.availableSeats}</span>
                  <button
                    className="text-blue-500"
                    onClick={() => handleInputChange(vehicle.id, 'availableSeats', vehicle.availableSeats + 1)}
                  >
                    + Ajouter une place
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addVehicle}>
              Ajouter un véhicule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
