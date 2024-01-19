import Image from "next/image";
import Link from "next/link";
import Form from "./create-form";
import { findDeviceFromId } from "../lib/data-utils";


export default async function Modal({loc, deviceId}: {loc: string, deviceId: string}) {
  const device = await findDeviceFromId(deviceId)
  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 bg-sch_gray-600 opacity-45"></div>
      <div className="absolute top-20 left-20 md:top-20 md:left-1/2 md:-translate-x-1/2 bg-white 
                      h-[550px] w-[400px] md:w-[550px] rounded-lg
                      drop-shadow-xl flex flex-col items-center">
      
        <Link href={
          {
            pathname: `/home/${loc}`
          }
        } 
          className="self-end p-2"
        >
          <Image
            src="/icons/close.svg"
            width={50}
            height={50}
            alt="close button"
          />
        </Link>
        <Form device={device!} location={loc}/>
      </div>
    </>
  )
}