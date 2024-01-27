'use server'

import schedule from 'node-schedule';
import { updateDeviceSchedule } from './data-utils';
import { LightsApi } from './hue/lights-api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { scheduledJobs } from './scheduled-jobs';
import { convertHourTo24 } from './time-util';

const FormSchema = z.object({
  deviceType: z.string(),
  deviceId: z.string(),
  onHour12: z.coerce.number(),
  onMinute: z.coerce.number(),
  onAmPm: z.string(),
  offHour12: z.coerce.number(),
  offMinute: z.coerce.number(),
  offAmPm: z.string(),
  location: z.string()
})

const OnSchedule = FormSchema.omit({offHour12: true, offMinute: true, offAmPm: true})
const OffSchedule = FormSchema.omit({onHour12: true, onMinute: true, onAmPm: true})
const CancelSchedule = FormSchema.omit({onHour12: true, onMinute: true, onAmPm: true, offHour12: true, offMinute: true, offAmPm: true})


export async function setOnSchedule(formData: FormData) {

  const { deviceType, deviceId, onHour12, onMinute, onAmPm, location } = OnSchedule.parse({    
    deviceType: formData.get('deviceType'),
    deviceId: formData.get('deviceId'),

    onHour12: formData.get('onTimePicker_hours'),
    onMinute: formData.get('onTimePicker_minutes'),
    onAmPm: formData.get('onTimePicker_ampm'),

    location: formData.get('location')
  })

  const onHour = convertHourTo24(onHour12, onAmPm)
  
  const jobName = `${deviceType}_${deviceId}_on`
  if (scheduledJobs[jobName]) {
    scheduledJobs[jobName].cancel()
  }
  // use node-schedule
  const rule = new schedule.RecurrenceRule();
  rule.hour = onHour
  rule.minute = onMinute
  // on schedule
  const lights = new LightsApi();
  const job = schedule.scheduleJob(jobName, rule, async function(){
    try {
      await lights.putState(deviceId, { on: true });
    } catch (error) {
      console.log('error turning on device:' + deviceId)
    }
  })  
  job.on('success', (result) => {
    console.log('on event triggered successfully.', result)
  })
  job.on('error', (err) => {
    console.log('failed to trigger on event.', err)
  })
  scheduledJobs[jobName] = job;

  // update json data file
  const onTime = `${onHour}:${onMinute.toString().padStart(2, '0')}`;
  await updateDeviceSchedule(deviceId, {on_time: onTime})

  console.log("data file updated.")

  revalidatePath(`/home/${location}`)
  redirect(`/home/${location}`)
}

export async function setOffSchedule(formData: FormData) {

  const { deviceType, deviceId, offHour12, offMinute, offAmPm, location } = OffSchedule.parse({    
    deviceType: formData.get('deviceType'),
    deviceId: formData.get('deviceId'),

    offHour12: formData.get('offTimePicker_hours'),
    offMinute: formData.get('offTimePicker_minutes'),
    offAmPm: formData.get('offTimePicker_ampm'),

    location: formData.get('location')
  })

  const offHour = convertHourTo24(offHour12, offAmPm)

  // use node-schedule
  // off schedule
  const rule = new schedule.RecurrenceRule();
  rule.hour = offHour
  rule.minute = offMinute

  const jobName = `${deviceType}_${deviceId}_off`
  if (scheduledJobs[jobName]) {
    scheduledJobs[jobName].cancel()
  }

  const lights = new LightsApi();
  const job = schedule.scheduleJob(jobName, rule, async function(){
    try {
      await lights.putState(deviceId, { on: false });
    } catch (error) {
      console.log('error turning off device:' + deviceId)
    }
  })
  job.on('success', (result) => {
    console.log('event triggered successfully.', result)
  })
  job.on('error', (err) => {
    console.log('failed to trigger event.', err)
  })
  scheduledJobs[jobName] = job;

  const offTime = `${offHour}:${offMinute.toString().padStart(2, '0')}`
  await updateDeviceSchedule(deviceId, {off_time: offTime})

  console.log("data file updated.")

  revalidatePath(`/home/${location}`)
  redirect(`/home/${location}`)
}


export async function cancelOnSchedule(formData: FormData) {

  const { deviceType, deviceId, location } = CancelSchedule.parse({    
    deviceType: formData.get('deviceType'),
    deviceId: formData.get('deviceId'),
    location: formData.get('location')
  })

  const jobName = `${deviceType}_${deviceId}_on`

  const scheduledJob = scheduledJobs[jobName];
  if (scheduledJob) {
    scheduledJob.cancel()
  } else {
    console.log('job not found')
    return
  }

  await updateDeviceSchedule(deviceId, {on_time: ''})
  console.log("data file updated.")

  revalidatePath(`/home/${location}`)
  redirect(`/home/${location}`)
}

export async function cancelOffSchedule(formData: FormData) {

  const { deviceType, deviceId, location } = CancelSchedule.parse({    
    deviceType: formData.get('deviceType'),
    deviceId: formData.get('deviceId'),
    location: formData.get('location')
  })

  const jobName = `${deviceType}_${deviceId}_off`

  const scheduledJob = scheduledJobs[jobName];
  if (scheduledJob) {
    scheduledJob.cancel()
  } else {
    console.log('job not found')
    return 
  }

  await updateDeviceSchedule(deviceId, {off_time: ''})
  console.log("data file updated.")

  revalidatePath(`/home/${location}`)
  redirect(`/home/${location}`)
}

export async function editOnSchedule(formData: FormData) {
  await setOnSchedule(formData)
}

export async function editOffSchedule(formData: FormData) {
  await setOffSchedule(formData)
}


