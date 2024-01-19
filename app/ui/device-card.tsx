import Image from "next/image";
import { Device } from "../lib/data-utils";
import Toggle from "./toggle";

export default function DeviceCard({
  typeIconSrc,
  alt,
  device,
}: {
  typeIconSrc: string,
  alt: string,
  device: Device
}) {

  const isScheduled = () => {
    return device.on_time.length > 0 || device.off_time.length > 0
  }

  const ScheduleDisplay = () => {
    if (isScheduled()) {
      return (
        <div className="flex justify-between items-center">
          <div className="font-light">
            {
              device.on_time.length > 0 ? 
                <p><span className="text-sch_orange-600 font-medium mr-4">On</span>{device.on_time}</p> : ''
            }
            {
              device.off_time.length > 0 ?
              <p><span className="text-sch_orange-600 font-medium mr-4">Off</span>{device.off_time}</p> : ''
            }
          </div>
          <Image 
            src="/icons/edit.svg"
            width={30}
            height={30}
            alt="edit button"
          />
        </div>
      )
    }
    return (<div></div>)
  }

  return (
    <article className="bg-white aspect-[10/11] rounded-xl drop-shadow-lg">
      <div className="flex flex-col bg-sch_orange-300 h-28 rounded-tl-xl rounded-tr-xl p-2">
          <Image
            src={ typeIconSrc }
            width={50}
            height={50}
            alt={ alt }
            className="self-start"
          />
          <h2 className="self-center font-medium text-sch_orange-600">{ device.name }</h2>
      </div>
      <div className="p-8 pt-12 flex flex-col gap-8">
        
        <Toggle isScheduled={isScheduled()} deviceId={device.id}/>
        <ScheduleDisplay />
      </div>
    </article>
  )
}