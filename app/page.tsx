import Image from "next/image"

type Country = {
  name:{
    common: string
  }
  flags:{
    png: string;
    alt: string;
  }
}

async function getData(): Promise<Country[]>  {
  const res = await fetch('https://restcountries.com/v3.1/all')
  return res.json()
}

export default async function Home() {
  const countries = await getData()
  return (
    <section className='grid grid-cols-5 w-full container gap-2 mt-16'>
        {countries.map((country) => (
          <article className=" min-w-full p-2 bg-white border-2 rounded-2xl hover:border-blue-500 "
          key={country.name.common}
          >
            <div className="w-full p-2 overflow-hidden">
              <Image src={country.flags.png} alt={country.name.common} width={100} height={100} className="rounded-xl object-cover" />
            </div>

            <h1 className="font-bold text-xl text-center mt-1">{country.name.common}</h1>
          </article>
        ))}
    </section>
  )
}
