import Image from "next/image";
import Link from "next/link";
import { findDeviceFromId } from "../lib/data-utils";
import { ReactNode } from "react";
import OnForm from "./create-on-form";
import OffForm from "./create-off-form";
import CancelOnForm from "./cancel-on-form";
import CancelOffForm from "./cancel-off-form";


export default async function Modal({loc, deviceId, unschedule, type}: {loc: string, deviceId: string, unschedule: string, type: string}) {
  const device = await findDeviceFromId(deviceId)

  const ModalLayout = ({children}: { children: ReactNode}) => {
    return (
      <>
        <div className="fixed w-full h-full top-0 left-0 bg-sch_gray-600 opacity-45"></div>
        <div className="absolute top-20 left-20 md:top-20 md:left-1/2 md:-translate-x-1/2 bg-white 
                        h-[550px] w-[400px] md:w-[550px] rounded-lg
                        drop-shadow-xl flex flex-col items-center">
        
          <Link href={
            {
              pathname: `/home/${loc}`,
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
          { children }
        </div>
      </>
    )
  }

  const ScheduleOnForm = () => {
    return (
      <ModalLayout>
        <OnForm device={device!} location={loc}/>
      </ModalLayout>
    )
  }

  const ScheduleOffForm = () => {
    return (
      <ModalLayout>
        <OffForm device={device!} location={loc}/>
      </ModalLayout>
    )
  }

  const UnscheduleOnForm = () => {
    return (
      <ModalLayout>
        <CancelOnForm device={device!} location={loc} />
      </ModalLayout>
    )
  }

  const UnscheduleOffForm = () => {
    return (
      <ModalLayout>
        <CancelOffForm device={device!} location={loc} />
      </ModalLayout>
    )
  }

  return (
    <>
    {
      unschedule === 'true' ? (type === 'on' ? <UnscheduleOnForm /> : <UnscheduleOffForm />)
        : (type === 'on' ? <ScheduleOnForm /> : <ScheduleOffForm />)
    }
    </>
  )
}