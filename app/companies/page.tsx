"use client";
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/contractUtils";

function Companies() {
  const [companies, setCompanies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);

      const contract = await getContract();
      const companyList = await contract.getCompanyList();
      console.log("Registered companies:", companyList);

      setCompanies(companyList);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError("Failed to fetch companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 p-6">
      <h1 className="text-4xl font-bold text-cyan-300 mb-8 text-center">
        Registered Companies
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : companies.length === 0 ? (
        <p className="text-center text-gray-400">
          No companies registered yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {companies.map((company, index) => (
            <li
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
            >
              <p className="text-lg font-semibold text-cyan-300">
                Company Address: {company}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Companies;
