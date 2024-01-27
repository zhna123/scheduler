import Link from "next/link";
import { TimePicker } from "../components/TimePicker";
import { Device } from "../lib/data-utils";
import { editOnSchedule } from "../lib/actions";

export default function EditOnForm({device, location}: {device: Device, location: string}) {
  return (
    <form action={editOnSchedule} className="text-sch_gray-800 w-[350px] flex flex-col h-full">
      <h2 className="font-medium mt-4 mb-16 text-center">{device.name}</h2>
      
      <input type="hidden" id="deviceId" name="deviceId" value={device.id} />
      <input type="hidden" id="deviceType" name="deviceType" value={device.type} />
      <input type="hidden" id="location" name="location" value={location} />

      <label className="flex items-center justify-between mb-10">
        Turn On
        <TimePicker id="onTimePicker" time={device.on_time} />
      </label>
      
      <div className="flex items-center justify-around mb-20 mt-auto text-lg font-medium">
        <Link href={{
          pathname: `/home/${location}`
        }}
          className="text-sch_orange-600"
        >
          Cancel
        </Link>
        <button type="submit" className="bg-sch_orange-600 px-10 py-2 rounded-md text-sch_orange-300 drop-shadow-sm">Edit</button>
      </div>
    </form>
  )
}