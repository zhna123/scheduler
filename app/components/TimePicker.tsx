import { convertHourTo12 } from "../lib/time-util"

export const TimePicker = ({id, time}: {id: string, time: string}) => {
  let hour = ''
  let minute = '99'
  let ampm = ''
  if (time !== '') {
    const [hour12, ampm12] = convertHourTo12(Number(time.split(':')[0]))
    hour = hour12.toString()
    ampm = ampm12.toString()
    minute = time.split(':')[1]
  }
  return (
    <div className="p-4 w-35 bg-sch_orange-300 rounded-md">
      <div className="flex">
        <select id={`${id}_hours`} name={`${id}_hours`} className="bg-transparent text-xl appearance-none">
          <option value="">--</option>
          {
            Array.from({length: 12}, (_, i) => i+1).map(v => {
              const isSelected = v === Number(hour)
              return <option key={v} value={v} selected={isSelected}>{v}</option>
            })
          }
        </select>
        <span className="text-xl mr-3 ml-1">:</span>
        <select id={`${id}_minutes`} name={`${id}_minutes`} className="bg-transparent text-xl appearance-none outline-none mr-3">
          <option value="">--</option>
          {
            Array.from({length: 12}, (_, i) => i * 5).map(v => {
              const isSelected = v === Number(minute)
              return <option key={v} value={v} selected={isSelected}>{v.toString().padStart(2, '0')}</option>
            })
          }
        </select>
        <select id={`${id}_ampm`} name={`${id}_ampm`} className="bg-transparent text-xl appearance-none outline-none mr-3">
          <option value="am" selected={ampm === '' || ampm === 'AM'}>AM</option>
          <option value="pm" selected={ampm === 'PM'}>PM</option>
        </select>
      </div>
    </div>
  )
}