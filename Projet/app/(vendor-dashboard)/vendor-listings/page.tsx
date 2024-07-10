"use client";

import {
  ArrowRightIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, ChangeEvent, useRef } from "react";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProfilePage = () => {
  const [basicInfo, setBasicInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    maritalStatus: "Single",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    dob: "01/01/1990",
    license: "AB123456",
  });

  const [keywords, setKeywords] = useState("Reliable, Punctual, Professional");
  const [paymentMode, setPaymentMode] = useState({
    creditCard: false,
    paypal: false,
    cash: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("/img/team-1.jpg");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [activeSection, setActiveSection] = useState("basicInfo");
  const [experiences, setExperiences] = useState<string[]>([""]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const { value, type } = e.target;
  
    if (field === "keywords") {
      setKeywords(value);
    } else if (field.startsWith("paymentMode")) {
      if (type === "checkbox" && e.target instanceof HTMLInputElement) {
        setPaymentMode({ ...paymentMode, [field.split(".")[1]]: e.target.checked });
      }
    } else {
      setBasicInfo({ ...basicInfo, [field]: value });
    }
  };
  

  const handleExperienceChange = (index: number, value: string) => {
    const newExperiences = [...experiences];
    newExperiences[index] = value;
    setExperiences(newExperiences);
  };

  const addExperienceField = () => {
    setExperiences([...experiences, ""]);
  };

  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (event.target.id === "imageUpload") {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setImageSrc(reader.result.toString());
          }
        };
        reader.readAsDataURL(file);
      } else if (event.target.id === "cvUpload") {
        setCvFile(file);
      }
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
    // Save the data to the server or local storage here
  };

  const renderSection = () => {
    switch (activeSection) {
      case "basicInfo":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex space-x-6">
                <div className="flex-1">
                  <label className="block text-gray-700">First Name:</label>
                  <input
                    type="text"
                    value={basicInfo.firstName}
                    onChange={(e) => handleInputChange(e, 'firstName')}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Last Name:</label>
                  <input
                    type="text"
                    value={basicInfo.lastName}
                    onChange={(e) => handleInputChange(e, 'lastName')}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div className="flex space-x-6">
                <div className="flex-1">
                  <label className="block text-gray-700">Gender:</label>
                  <select
                    value={basicInfo.gender}
                    onChange={(e) => handleInputChange(e, 'gender')}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Marital Status:</label>
                  <select
                    value={basicInfo.maritalStatus}
                    onChange={(e) => handleInputChange(e, 'maritalStatus')}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-6">
                <div className="flex-1">
                  <label className="block text-gray-700">Address:</label>
                  <input
                    type="text"
                    value={basicInfo.address}
                    onChange={(e) => handleInputChange(e, 'address')}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Phone:</label>
                  <input
                    type="text"
                    value={basicInfo.phone}
                    onChange={(e) => handleInputChange(e, 'phone')}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
              </div>
              <div className="flex space-x-6">
                <div className="flex-1">
                  <label className="block text-gray-700">Date of Birth:</label>
                  <input
                    type="text"
                    value={basicInfo.dob}
                    onChange={(e) => handleInputChange(e, 'dob')}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">License:</label>
                  <input
                    type="text"
                    value={basicInfo.license}
                    onChange={(e) => handleInputChange(e, 'license')}
                    className="border rounded px-2 py-1 w-full"
                    disabled={!editMode}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "keywords":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                value={keywords}
                onChange={(e) => handleInputChange(e, 'keywords')}
                className="border rounded px-2 py-1 w-full"
                disabled={!editMode}
              />
            </div>
          </div>
        );
      case "paymentMode":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={paymentMode.creditCard}
                  onChange={(e) => handleInputChange(e, 'paymentMode.creditCard')}
                  className="mr-2"
                  disabled={!editMode}
                />
                <label className="text-gray-700">Credit Card</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={paymentMode.paypal}
                  onChange={(e) => handleInputChange(e, 'paymentMode.paypal')}
                  className="mr-2"
                  disabled={!editMode}
                />
                <label className="text-gray-700">PayPal</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={paymentMode.cash}
                  onChange={(e) => handleInputChange(e, 'paymentMode.cash')}
                  className="mr-2"
                  disabled={!editMode}
                />
                <label className="text-gray-700">Cash</label>
              </div>
            </div>
          </div>
        );
      case "cvExperience":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <input
                type="file"
                id="cvUpload"
                className="hidden"
                ref={inputFileRef}
                accept=".pdf ,.doc,.docx"
                onChange={handleFileChange}
              />
              <button
                onClick={() => inputFileRef.current && inputFileRef.current.click()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Upload CV
              </button>
              {cvFile && (
                <div>
                  <p>{cvFile.name}</p>
                  <Link href={URL.createObjectURL(cvFile)} target="_blank" legacyBehavior>
                    <a className="text-blue-500 underline">View CV</a>
                  </Link>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recent Experiences</h3>
              {experiences.map((experience, index) => (
                <input
                  key={index}
                  type="text"
                  value={experience}
                  onChange={(e) => handleExperienceChange(index, e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                  disabled={!editMode}
                />
              ))}
              <button
                onClick={addExperienceField}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Add Experience
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-3 lg:px-6 bg-[var(--bg-1)] pt-6">
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Image
              src={imageSrc}
              alt="Driver Profile"
              className="w-20 h-20 rounded-full object-cover"
              width={80}
              height={80}
              onClick={handleImageClick}
            />
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              ref={inputFileRef}
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
            />
            <span className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer" onClick={handleImageClick}>
              <PencilIcon className="h-5 w-5 text-gray-600" />
            </span>
          </div>
          <div>
            <h2 className="text-xl font-medium">John Doe</h2>
            <p className="text-gray-600">johndoe@example.com</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveSection("basicInfo")}
              className={`px-4 py-2 rounded-md ${activeSection === "basicInfo" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveSection("keywords")}
              className={`px-4 py-2 rounded-md ${activeSection === "keywords" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Keywords
            </button>
            <button
              onClick={() => setActiveSection("paymentMode")}
              className={`px-4 py-2 rounded-md ${activeSection === "paymentMode" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Payment Mode
            </button>
            <button
              onClick={() => setActiveSection("cvExperience")}
              className={`px-4 py-2 rounded-md ${activeSection === "cvExperience" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              CV and Experience
            </button>
          </div>
          {renderSection()}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
            {editMode && (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            )}
          </div>
          <Link href="https://presentation-conducteur.vercel.app/agent-details-review">
            <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Show More (CV and Experiences)
              <ArrowRightIcon className="inline h-5 w-5 ml-2" />
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage
