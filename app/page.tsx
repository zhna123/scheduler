import { getAllLocations } from "./lib/data-utils";
import LocationCard from "./ui/location-card";
import Link from "next/link";

export default async function Home() {
  const allLocations = await getAllLocations();
  return (
    <div className="flex min-h-screen flex-col pt-8">
      <header className="text-sch_gray-800 px-24 h-32 flex flex-col">
          <h1 className="font-bold text-center">Home Schedule</h1>
          <nav className="mt-auto">
            <ul className="flex gap-8 font-medium text-lg">
              <li>
                <span>My Home</span>
                <div className="h-1 bg-sch_orange-600"></div>
              </li>
              <li>Settings</li>
            </ul>
          </nav>
      </header>
      <main className="bg-sch_gray-300 text-sch_gray-800 min-h-screen w-screen grid lg:grid-cols-3 sm:grid-cols-2 gap-6 px-24 py-8">
        {
          allLocations.map((location, index) => {
            const numberOfLights = location.devices.light.length;
            const nubmerOfPlugs = location.devices.plug.length;
            return (
              <Link key={location.id} href={`home/${location.id}`}>
                <LocationCard 
                        key={location.id} 
                        iconSrc={location.icon} 
                        alt={location.alt} 
                        name={location.name} 
                        lights={numberOfLights} 
                        plugs={nubmerOfPlugs}
                    />
              </Link>
            )     
          })
        }
      </main>
    </div>
  )
}
