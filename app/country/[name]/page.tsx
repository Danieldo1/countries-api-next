import Link from "next/link"
import Image from "next/image"
import { Country } from "@/app/page"
import CountryCard from "@/app/components/country-card/CountryCard"
import {ArrowLeftCircleIcon} from '@heroicons/react/24/outline'

async function getCountryByName(name:string): Promise<Country> {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    const country = await res.json()
    return country[0]
}
async function getCountryBordersByName(name:string) {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countries: Country[] = await response.json()

    const country = countries.find(
        (country: Country) => country.name.common === name
    )!
    return country.borders?.map((border) => {
        const borderCountry = countries.find(
            (country) => country.cca3 === border)! 
        return {
            name: borderCountry.name.common,
            flag: borderCountry.flags.svg,
            flagAlt: borderCountry.flags.alt
        }
    })
}

export default async function Country({params: {name}}: {params: {name: string}}) {
    const country = await getCountryByName(name)
    const borderCountry = await getCountryBordersByName(decodeURI(name))
    const formatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
    })
    const fomattedPopulation = new Intl.NumberFormat()

    return(
        <section className="flex flex-col container">
            <h1 className="text-5xl font-bold text-center text-gray-800 mt-16">{country.name.common}</h1>
            <Link href='/'>
                <div className="flex items-center mb-2 pl-2">
                <ArrowLeftCircleIcon className="h-7 w-7 text-indigo-700" />
                <p className="ml-0.5 font-medium text-indigo-700">Back</p>
                </div>
            </Link>

            <article className=" flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl my-5 shadow-xl">
                <section>
                    {country.capital && (
                    <h2 className="text-xl text-gray-800 mt-3"><b>🏠 Capital:</b>{" "}{country.capital}</h2>)}
                    {country.region && (
                    <h2 className="text-xl text-gray-800 mt-3"><b>🎯 Region:</b>{" "}{country.region} {country.subregion && `-${country.subregion}`} </h2>
                    )}
                    {country.population && (
                    <h2 className="text-xl text-gray-800 mt-3"><b>👪🏽 Population:</b>{" "}{formatter.format(country.population)}</h2>
                    )}
                    {country.languages && (
                    <h2 className="text-xl text-gray-800 mt-3"><b>🗣️ Language:</b>{" "}{Object.values(country.languages).map((language)=> (
                        <span key={language} className="inline-block px-2 bg-indigo-700 mr-2 text-white text-lg rounded-full" >
                            {language}
                        </span>
                    )) }
                    </h2>
                    )}
                    {country.area && (
                        <h2 className="text-xl text-gray-800 mt-3"><b>🗺️ Area:</b>{" "}{fomattedPopulation.format(parseInt(country.area))} km2</h2>
                    )}
                </section>
                    <div>
                    {country.latlng && (
                        <div>
                    <h2 className="text-xl text-gray-800 mt-3"><b>📍 Maps:</b>{" "} </h2>
                    < iframe src={`//maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=${parseInt(country.area) > 100000 ? 4 : 6}&output=embed`} className="m-2 rounded-xl"></iframe>
                    </div>
                    )}
                    </div>
            <div className="relative h-48 my-2 md:h-auto w-96  md:order-last order-first rounded-xl">
                <Image src={country.flags.svg} alt={country.name.common} fill className="rounded-xl"/>
            </div>
            </article>

            <section>
                <h3 className="mt-12 text-2xl font-semibold text-gray-800">
                    Neighboring countries:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full container gap-2">
                {borderCountry?.map((border) =>(
                    <CountryCard key={border.name} {...border} />
                ))}
        </div>
            </section>

        </section>
    )
}