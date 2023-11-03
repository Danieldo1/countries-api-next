'use client'
import React, { useState, useEffect } from "react";
import CountryCard from "./components/country-card/CountryCard";

export type Country = {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages: {
    [key: string]: string;
  };
  borders?: string[];
  cca3: string;
  area: string;
  latlng: string[];
};

async function getData(): Promise<Country[]> {
  const res = await fetch("https://restcountries.com/v3.1/all");
  return res.json();
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setCountries(data);
    };

    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(searchQuery)
  const handleSearch = (e: React.FormEvent) => {
    
    e.preventDefault();
    setSearchClicked(true);
    
    if (filteredCountries.length < 0) {
      setSearchClicked(false);
      console.log("Filtered Countries:", );
    }

   
  };

  return (
    <>
    
   
      <section className="border border-gray-300 p-2 rounded-lg w-full md:w-6/12 mt-10">
        <form onSubmit={handleSearch} className="">
          <input
            type="text"
            placeholder="Search country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
          <button type="submit" className="  items-center w-full my-5 border border-gray-500 hover:bg-gray-400 bg-gray-500 text-white p-2 rounded-lg">Search a Country</button>
        </form>
        {searchClicked &&
          filteredCountries.map((country) => (
            // Render each country in the search results
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.svg}
              flagAlt={country.flags.alt}
              
            />
          ))}
      </section>
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  w-full container gap-2 mt-16 ">
      {countries.map((country) => (
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          flag={country.flags.svg}
          flagAlt={country.flags.alt}
        />
      ))}
    </section>
    </>
  );
};

export default Home;