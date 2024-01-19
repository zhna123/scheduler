'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Toggle({isScheduled, deviceId}: {isScheduled: boolean, deviceId: string}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  function handleChange() {
    const params = new URLSearchParams(searchParams);
    params.set('modal', 'true')
    params.set('deviceId', deviceId)
    replace(`${pathname}?${params.toString()}`);
  }
  
  return (
    <label className="flex justify-between items-center">
      { isScheduled ? "Scheduled" : "Not Scheduled" }
      <input 
        className="appearance-none peer"
        type="checkbox"
        checked={isScheduled}
        onChange={(e) => {
          handleChange()
        }}
      />
      <span className="w-14 h-8 flex items-center shrink-0 p-1 bg-sch_orange-300 rounded-full
                      peer-checked:bg-sch_orange-600 duration-300 ease-in-out
                      after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-sm
                      peer-checked:after:translate-x-6"></span>
    </label>
  )
}
