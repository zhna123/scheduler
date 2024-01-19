import { findDeviceFromId, getAllLocations } from "@/app/lib/data-utils"
import DeviceCard from "@/app/ui/device-card";
import Modal from "@/app/ui/modal";
import Image from "next/image";
import Link from "next/link";

export default async function Page(
  { 
    params,
    searchParams
  }: 
  { 
    params: { 
      slug: string 
    },
    searchParams?: {
      modal?: string,
      deviceId?: string
    }
  }
) {

  const modal = searchParams?.modal || ''
  const deviceId = searchParams?.deviceId || ''

  const locations = await getAllLocations();
  const location = locations.find(loc => loc.id === params.slug);
  const devices = location?.devices;
  const lightIds = devices?.light;
  const plugIds = devices?.plug;

  const LightCards = () => {
    if (lightIds?.length !== 0) {
      return (
       lightIds?.map(async id => {
          const light = await findDeviceFromId(id);
          return <DeviceCard key={id} typeIconSrc="/icons/lightbulb.svg" alt="light icon" device={light!}/>
       })
      )
    }
  }

  const PlugCards = () => {
    if (plugIds?.length !== 0) {
      return (
       plugIds?.map(async id => {
          const plug = await findDeviceFromId(id);
          return <DeviceCard key={id} typeIconSrc="/icons/outlet.svg" alt="plug icon" device={plug!}/>
       })
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col pt-8 relative">
      <header className="text-sch_gray-800 px-24 h-32 flex items-center">
        <Link href="/">
          <Image
            src="/icons/back.svg"
            width={50}
            height={50}
            alt="back button"
          />
        </Link>
        <h1 className="font-bold mx-auto">{location?.name}</h1>
      </header>
      <main className="bg-sch_gray-300 text-sch_gray-800 min-h-screen w-screen grid md:grid-cols-2 gap-16 px-24 py-10"> 
        <LightCards />
        <PlugCards />
      </main>
      {modal && <Modal loc={params.slug} deviceId={deviceId} />}
    </div>
  )
}