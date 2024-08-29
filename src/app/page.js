"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Fetch vehicle types
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then(response => response.json())
      .then(data => setVehicleTypes(data.Results))
      .catch(error => console.error('Error fetching vehicle types:', error));

    // Populate year options from 2015 to current year
    const currentYear = new Date().getFullYear();
    const yearRange = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);
    setYears(yearRange);
  }, []);

  const isNextEnabled = selectedVehicleType && selectedYear;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-indigo-500 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Filter Vehicles</h1>
        <div className="mb-4">
          <label className="block mb-2">Select Vehicle Type:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedVehicleType}
            onChange={(e) => setSelectedVehicleType(e.target.value)}
          >
            <option value="">-- Select a Vehicle Type --</option>
            {vehicleTypes.map((type) => (
              <option key={type.MakeId} value={type.MakeId}>{type.MakeName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Select Model Year:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">-- Select a Model Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <Link href={`/result/${selectedVehicleType}/${selectedYear}`}>
          <button
            className={`w-full p-2 text-white rounded-md ${isNextEnabled ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'}`}
            disabled={!isNextEnabled}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
