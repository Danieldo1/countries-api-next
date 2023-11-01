import Image from "next/image"
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
  area:string;
  latlng: string[];
};

async function getData(): Promise<Country[]>  {
  const res = await fetch('https://restcountries.com/v3.1/all')
  return res.json()
}

export default async function Home() {
  const countries = await getData()
  return (
    <section  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  w-full container gap-2 mt-16 ">
        {countries.map((country) => (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            flagAlt={country.flags.alt}
          />
        ))}
    </section>
  )
}
