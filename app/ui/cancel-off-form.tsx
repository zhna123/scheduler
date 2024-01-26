import { cancelOffSchedule } from "@/app/lib/actions";
import { Device } from "../lib/data-utils";

export default function CancelOffForm({device, location}: {device: Device, location: string}) {
  return (
    <form action={cancelOffSchedule} className="text-sch_gray-800 w-[350px] flex flex-col h-full">
      <h2 className="mb-10">Are you sure to cancel the current <span className="text-sch_orange-600">{'turn off'}</span> schedule for device:</h2>
      <h1 className="text-sch_orange-600 self-center font-medium">{device.name}</h1>
      <input type="hidden" id="deviceId" name="deviceId" value={device.id} />
      <input type="hidden" id="deviceType" name="deviceType" value={device.type} />
      <input type="hidden" id="location" name="location" value={location} />
      <div className="flex items-center justify-around mb-20 mt-auto text-lg font-medium">
        <button type="submit" className="bg-sch_orange-600 px-10 py-2 rounded-md text-sch_orange-300 drop-shadow-sm">Cancel Schedule</button>
      </div>
    </form>
  )
}