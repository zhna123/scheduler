'use client';

import { schedule_test } from "@/app/lib/actions";
import { Device } from "../lib/data-utils";
import Link from "next/link";

export default function Form({device, location}: {device: Device, location: string}) {

  const TimePicker = () => {
    return (
      <div className="p-4 w-35 bg-sch_orange-300 rounded-md">
        <div className="flex">
          <select name="hours" className="bg-transparent text-xl appearance-none outline-none">
            {
              Array.from({length: 24}, (_, i) => i).map(v => (
                <option key={v} value={v}>{v}</option>
              ))
            }
          </select>
          <span className="text-xl mr-3">:</span>
          <select name="minutes" className="bg-transparent text-xl appearance-none outline-none mr-3">
            {
              Array.from({length: 12}, (_, i) => i * 5).map(v => (
                <option key={v} value={v}>{v.toString().padStart(2, '0')}</option>
              ))
            }
          </select>
        </div>
      </div>
    )
  }

  return (
    <form action={schedule_test} className="text-sch_gray-800 w-[350px] flex flex-col h-full">
      <h2 className="font-medium mt-4 mb-16 text-center">{device.name}</h2>
      <label className="flex items-center justify-between mb-10">
        Turn On
        <TimePicker />
      </label>
      <label className="flex items-center justify-between">
        Turn Off
        <TimePicker />
      </label>
      <div className="flex items-center justify-around mb-20 mt-auto text-lg font-medium">
        <Link href={{
          pathname: `/home/${location}`
        }}
          className="text-sch_orange-600"
        >
          Cancel
        </Link>
        <button type="submit" className="bg-sch_orange-600 px-10 py-2 rounded-md text-sch_orange-300 drop-shadow-sm">Set</button>
      </div>
    </form>
  )
}
