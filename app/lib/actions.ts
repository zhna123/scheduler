'use server'

import axios from 'axios';
import schedule from 'node-schedule';

export async function schedule_test(formData: FormData) {
  // extract data from formData

  // TODO validation

  const rawFormData = {
    eventId: formData.get('eventId'),
    action: formData.get('action'),
    deviceType: formData.get('deviceType'),
    deviceId: formData.get('deviceId'),
    hour: formData.get('hour'),
    minute: formData.get('minute')
  }

  // TODO process data
  
  // gets these from device type and device id
  const getUrl = `http://192.168.2.203:1981/plugs`; // constant
  const plugId = '192.168.2.223';  // constant

  const putUrl = `${getUrl}/${plugId}/state`;

  // replace action
  const putOptions = { body: { on: true }, json: true };

  const getOptions = { json: true };

  // use node-schedule
  const rule = new schedule.RecurrenceRule();
  // from raw data
  rule.hour = 0
  rule.minute = 0
  const job = schedule.scheduleJob(rule, function(){
    script(putUrl, putOptions)
  })
  job.on('success', (result) => {
    console.log('all done.', result)
  })
  job.on('error', (err) => {
    console.log('failed task.', err)
  })

}

async function script(putUrl: string, putOptions: any) {
  return await axios.put(putUrl, putOptions);
}