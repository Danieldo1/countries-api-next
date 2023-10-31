import Link from "next/link"
import Image from "next/image"
import { Country } from "@/app/page"
import CountryCard from "@/app/components/country-card/CountryCard"

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
    return(
        <section className="flex flex-col container">
            <h1 className="text-5xl font-bold text-center text-gray-800 mt-16">{country.name.common}</h1>
            <Link href='/'>
                <Image src='/arrow.svg' alt='arrow' width={24} height={24} />
                <h1>Back</h1>
            </Link>

            <article className=" flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl">
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
                </section>
            <div className="relative h-48 my-2 md:h-auto w-96 shadow-md md:order-last order-first">
                <Image src={country.flags.svg} alt={country.name.common} fill/>
            </div>
            </article>

            <section>
                <h3 className="mt-12 text-2xl font-semibold text-gray-800">
                    Neighboring countries
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