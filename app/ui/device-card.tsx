import Image from "next/image";
import { Device } from "../lib/data-utils";
import Toggle from "./toggle";
import { ReactNode } from "react";
import { convert24HourTo12Hour } from "../lib/time-util";
import { EditButton } from "./edit-btn";

export default function DeviceCard({
  typeIconSrc,
  alt,
  device,
}: {
  typeIconSrc: string,
  alt: string,
  device: Device
}) {

  const isOnScheduled = () => {
    return device.on_time.length > 0
  }

  const isOffScheduled = () => {
    return device.off_time.length > 0
  }

  const ScheduleLayout = ({children, deviceId, type}: {children: ReactNode, deviceId: string, type: string}) => {
    return (
      <div className="flex gap-6 items-center">
        <div className="font-light">
          { children }
        </div>
        <EditButton deviceId={deviceId} type={type} />
      </div>
    )
  }

  const onTime = device.on_time.split(':')
  const onTime12 = convert24HourTo12Hour(onTime[0], onTime[1])
  const offTime = device.off_time.split(':')
  const offTime12 = convert24HourTo12Hour(offTime[0], offTime[1])

  const OnSchedule = ({deviceId, type}: {deviceId: string, type: string}) => {
    return (
      <ScheduleLayout deviceId={deviceId} type={type}>
        <p>{onTime12}</p> 
      </ScheduleLayout>
    )
  }

  const OffSchedule = ({deviceId, type}: {deviceId: string, type: string}) => {
    return (
      <ScheduleLayout deviceId={deviceId} type={type}>
        <p>{offTime12}</p> 
      </ScheduleLayout>
    )
  }

  const Invisible = () => {
    return (
      <div className="invisible">
        <p>{'placeholder'}</p>
      </div>
    )
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
      <div className="p-6 pt-12 flex flex-col gap-2">
        <Toggle isScheduled={isOnScheduled()} deviceId={device.id} type='on'/>
        { isOnScheduled() ? <OnSchedule deviceId={device.id} type='on'/> : <Invisible />}
      </div>
      <div className="p-6 flex flex-col gap-2">
        <Toggle isScheduled={isOffScheduled()} deviceId={device.id} type='off'/>
        { isOffScheduled() ? <OffSchedule deviceId={device.id} type='off'/> : <Invisible />}
      </div>
    </article>
  )
}