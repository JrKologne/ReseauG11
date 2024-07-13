"use client";
import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import Car from '@/public/img/th.png';
import Money from '@/public/img/bullet.png';
import { Vehicle } from '@/public/types/Vehicule';

const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];
const fuelTypes = ["Essence", "Diesel", "Électrique"];
const vehicleTypes = ["Car", "Truck", "SUV"];
const comfortTypes = ["Climatisé", "Siège en cuir", "VIP"];
const gearboxTypes = ["Manuelle", "Automatique", "4x4"];

const Page = () => {
  const [hasVehicles, setHasVehicles] = useState(false);
  const [numberOfVehicles, setNumberOfVehicles] = useState(1);
  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>([]);
  const [pickupTimesLocations, setPickupTimesLocations] = useState<{ time: string, location: string }[]>([{ time: '', location: '' }]);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [tariff, setTariff] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const newVehiclesData = Array.from({ length: numberOfVehicles }, (_, index) => ({
      id: index + 1,
      brand: `Brand ${String.fromCharCode(65 + index)}`,
      registration: '',
      images: [],
      type: 'Car',
      model: '',
      fuelType: 'Essence',
      mileage: 0,
      tankVolume: 0,
      consumptionPerKm: 0,
      comfortType: [],
      experience: '',
      cv: '',
      registrationNumber: '',
      baggageCapacity: '',
      pickupLocations: [],
      size: '',
      gearboxType: [],
      manufacturer: '',
      availableSeats: 0,
    }));
    setVehiclesData(newVehiclesData);
  }, [numberOfVehicles]);

  const handleInputChange = (id: number, field: keyof Vehicle, value: any) => {
    const updatedVehicles = vehiclesData.map(vehicle =>
      vehicle.id === id ? { ...vehicle, [field]: value } : vehicle
    );
    setVehiclesData(updatedVehicles);
    setIsEditing(true);
  };

  const handleCheckboxChange = (id: number, field: keyof Vehicle, value: string, checked: boolean) => {
    const updatedVehicles = vehiclesData.map(vehicle => {
      if (vehicle.id === id) {
        const updatedField = checked
          ? [...(vehicle[field] as string[]), value]
          : (vehicle[field] as string[]).filter(item => item !== value);
        return { ...vehicle, [field]: updatedField };
      }
      return vehicle;
    });
    setVehiclesData(updatedVehicles);
  };

  const handleImageUpload = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const updatedVehicles = vehiclesData.map(vehicle =>
        vehicle.id === id ? { ...vehicle, images: Array.from(files) } : vehicle
      );
      setVehiclesData(updatedVehicles);
      setIsEditing(true);
    }
  };

  const saveChanges = () => {
    console.log('Véhicules sauvegardés :', vehiclesData);
    setIsEditing(false);
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

  const handlePickupChange = (index: number, field: 'time' | 'location', value: string) => {
    const updatedPickupTimesLocations = [...pickupTimesLocations];
    updatedPickupTimesLocations[index][field] = value;
    setPickupTimesLocations(updatedPickupTimesLocations);
  };

  const addPickupTimeLocation = () => {
    setPickupTimesLocations([...pickupTimesLocations, { time: '', location: '' }]);
  };

  return (
    <div className="px-3 lg:px-6 bg-[var(--bg-1)] pt-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasVehicles"
            checked={hasVehicles}
            onChange={(e) => setHasVehicles(e.target.checked)}
            className="mr-2 h-5 w-5 text-blue-600"
          />
          <label htmlFor="hasVehicles" className="text-lg font-semibold">
            Enregistrement et gestion des véhicules
          </label>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Image src={Car} alt="logo" className="w-6 h-6 mr-1 text-gray-500" />
            <input
              type="number"
              value={numberOfVehicles}
              onChange={(e) => setNumberOfVehicles(parseInt(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              min="0"
              max="10"
            />
          </div>
          <div className="flex items-center">
            <Image src={Money} alt="logo" className="w-6 h-6 mr-1 text-gray-500" />
            <input
              type="text"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
              placeholder="Tarif par heure en FCFA"
              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {isEditing && (
            <button
              onClick={saveChanges}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sauvegarder les modifications
            </button>
          )}
        </div>
      </div>

      {hasVehicles && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Gestion des véhicules</h2>
          <div className="p-4 rounded-lg bg-white">
            {vehiclesData.map(vehicle => (
              <div key={vehicle.id} className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold">
                    {isEditing ? (
                      <input
                        type="text"
                        value={vehicle.brand}
                        onChange={(e) => handleInputChange(vehicle.id, 'brand', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full"
                      />
                    ) : (
                      vehicle.brand
                    )}
                  </div>
                  <div className="flex">
                    {isEditing ? (
                      <button className="mr-2 bg-blue-500 text-white px-4 py-1 rounded" onClick={handleSave}>
                        Enregistrer
                      </button>
                    ) : (
                      <button className="mr-2 bg-gray-300 text-gray-700 px-4 py-1 rounded" onClick={handleEdit}>
                        Modifier
                      </button>
                    )}
                    {isEditing && (
                      <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded" onClick={handleCancel}>
                        Annuler
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[
                    { label: 'Numéro d\'immatriculation', field: 'registrationNumber' },
                    { label: 'Capacité de bagage', field: 'baggageCapacity' },
                    { label: 'Gabarit', field: 'size' },
                    { label: 'Type de boite de vitesse', field: 'gearboxType' },
                    { label: 'Immatriculation', field: 'registration' },
                    { label: 'Fabricant', field: 'manufacturer' },
                    { label: 'Marque', field: 'brand' },
                    { label: 'Type de véhicule', field: 'type' },
                    { label: 'Modèle', field: 'model' },
                    { label: 'Type de carburant', field: 'fuelType' },
                    { label: 'Kilométrage à la mise en service', field: 'mileage' },
                    { label: 'Volume du réservoir', field: 'tankVolume' },
                    { label: 'Consommation au kilomètre', field: 'consumptionPerKm' },
                    { label: 'Type de confort', field: 'comfortType' },
                    { label: 'Nombre de places disponibles', field: 'availableSeats' },
                  ].map(({ label, field }) => (
                    <div key={field} className="flex flex-col">
                      <label className="text-lg font-semibold">{label}:</label>
                      {isEditing ? (
                        <>
                          {field === "brand" ? (
                            <select
                              value={(vehicle as any)[field]}
                              onChange={(e) => handleInputChange(vehicle.id, field as keyof Vehicle, e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full"
                            >
                              {brands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                              ))}
                            </select>
                          ) : field === "fuelType" ? (
                            <select
                              value={(vehicle as any)[field]}
                              onChange={(e) => handleInputChange(vehicle.id, field as keyof Vehicle, e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full"
                            >
                              {fuelTypes.map(fuelType => (
                                <option key={fuelType} value={fuelType}>{fuelType}</option>
                              ))}
                            </select>
                          ) : field === "type" ? (
                            <select
                              value={(vehicle as any)[field]}
                              onChange={(e) => handleInputChange(vehicle.id, field as keyof Vehicle, e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full"
                            >
                              {vehicleTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          ) : field === "comfortType" ? (
                            comfortTypes.map(comfortType => (
                              <label key={comfortType} className="inline-flex items-center mt-2">
                                <input
                                  type="checkbox"
                                  checked={(vehicle.comfortType as string[]).includes(comfortType)}
                                  onChange={(e) => handleCheckboxChange(vehicle.id, field, comfortType, e.target.checked)}
                                  className="form-checkbox h-4 w-4"
                                />
                                <span className="ml-2">{comfortType}</span>
                              </label>
                            ))
                          ) : field === "gearboxType" ? (
                            gearboxTypes.map(gearboxType => (
                              <label key={gearboxType} className="inline-flex items-center mt-2">
                                <input
                                  type="checkbox"
                                  checked={(vehicle.gearboxType as string[]).includes(gearboxType)}
                                  onChange={(e) => handleCheckboxChange(vehicle.id, field, gearboxType, e.target.checked)}
                                  className="form-checkbox h-4 w-4"
                                />
                                <span className="ml-2">{gearboxType}</span>
                              </label>
                            ))
                          ) : (
                            <input
                              type="text"
                              value={(vehicle as any)[field]}
                              onChange={(e) => handleInputChange(vehicle.id, field as keyof Vehicle, e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full"
                            />
                          )}
                        </>
                      ) : (
                        <span className="ml-2">{(vehicle as any)[field]}</span>
                      )}
                    </div>
                  ))}//
                </div>
                <div className="mt-4">
                  <label className="text-lg font-semibold">Images du véhicule:</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(vehicle.id, e)}
                    className="ml-2"
                    multiple
                  />
                  {vehicle.images.length > 0 && (
                    <div className="mt-2 flex flex-wrap">
                      {vehicle.images.map((image, index) => (
                        <Image
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`Image du véhicule ${vehicle.brand}`}
                          width={100}
                          height={100}
                          className="mr-2 mb-2"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Spécification de l&apos;heure et du lieu de ramassage</h2>
        <div className="p-4 rounded-lg bg-white">
          {pickupTimesLocations.map((pickup, index) => (
            <div key={index} className="flex justify-between items-center mt-4">
              <div>
                <label htmlFor={`pickupTime-${index}`} className="text-lg font-semibold">Heure de ramassage:</label>
                <input
                  type="text"
                  id={`pickupTime-${index}`}
                  value={pickup.time}
                  onChange={(e) => handlePickupChange(index, 'time', e.target.value)}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor={`pickupLocation-${index}`} className="text-lg font-semibold">Lieu de ramassage:</label>
                <input
                  type="text"
                  id={`pickupLocation-${index}`}
                  value={pickup.location}
                  onChange={(e) => handlePickupChange(index, 'location', e.target.value)}
                  className="ml-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          ))}
          <button onClick={addPickupTimeLocation} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Ajouter une heure et un lieu</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
