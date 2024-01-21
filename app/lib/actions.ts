'use server'

import axios from 'axios';
import schedule from 'node-schedule';
import { findDeviceFromId, updateDeviceSchedule } from './data-utils';

export async function setSchedule(formData: FormData) {

  const { deviceType, deviceId, deviceName, onHour, onMinute, offHour, offMinute } = {    
    deviceType: formData.get('deviceType')!.toString(),
    deviceId: formData.get('deviceId')!.toString(),
    deviceName: formData.get('deviceName')!.toString(),

    onHour: formData.get('onTimePicker_hours'),
    onMinute: formData.get('onTimePicker_minutes'),

    offHour: formData.get('offTimePicker_hours'),
    offMinute: formData.get('offTimePicker_minutes')
  }

  const onTime = `${onHour}:${onMinute}`;
  const offTime = `${offHour}:${offMinute}`

  await updateDeviceSchedule(deviceId, deviceType, deviceName, onTime, offTime)
  
  // // gets these from device type and device id
  // const getUrl = `http://192.168.2.203:1981/plugs`; // constant
  // const plugId = '192.168.2.223';  // constant

  // const putUrl = `${getUrl}/${plugId}/state`;

  // // replace action
  // const putOptions = { body: { on: true }, json: true };

  // const getOptions = { json: true };

  // // use node-schedule
  // const rule = new schedule.RecurrenceRule();
  // // from raw data
  // rule.hour = 0
  // rule.minute = 0
  // const job = schedule.scheduleJob(rule, function(){
  //   script(putUrl, putOptions)
  // })
  // job.on('success', (result) => {
  //   console.log('all done.', result)
  // })
  // job.on('error', (err) => {
  //   console.log('failed task.', err)
  // })

}

async function script(putUrl: string, putOptions: any) {
  return await axios.put(putUrl, putOptions);
}