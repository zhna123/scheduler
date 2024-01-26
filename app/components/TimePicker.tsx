
export const TimePicker = ({id}: {id: string}) => {
  return (
    <div className="p-4 w-35 bg-sch_orange-300 rounded-md">
      <div className="flex">
        <select id={`${id}_hours`} name={`${id}_hours`} className="bg-transparent text-xl appearance-none">
          <option value="">--</option>
          {
            Array.from({length: 12}, (_, i) => i+1).map(v => (
              <option key={v} value={v}>{v}</option>
            ))
          }
        </select>
        <span className="text-xl mr-3 ml-1">:</span>
        <select id={`${id}_minutes`} name={`${id}_minutes`} className="bg-transparent text-xl appearance-none outline-none mr-3">
          <option value="">--</option>
          {
            Array.from({length: 12}, (_, i) => i * 5).map(v => (
              <option key={v} value={v}>{v.toString().padStart(2, '0')}</option>
            ))
          }
        </select>
        <select id={`${id}_ampm`} name={`${id}_ampm`} className="bg-transparent text-xl appearance-none outline-none mr-3">
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
      </div>
    </div>
  )
}