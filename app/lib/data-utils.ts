import { promises as fs } from 'fs';

export type Location = {
  id: string,
  icon: string,
  alt: string,
  name: string,
  devices: { light: string[], plug: string[] },
}

export type Device = {
  id: string,
  type: string,
  name: string,
  on_time: string,
  off_time: string
}

export async function getAllLocations() {

  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);
  const locations = data.locations;
  return locations as Location[];
}

export async function findDeviceFromId(id: string) {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);
  const devices = data.devices as Device[];
  return devices.find(d => d.id === id)
}

export async function updateDeviceSchedule(deviceId: string, dataToUpdate: {[key: string]: string}) {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);
  const device = data.devices.find(d => d.id === deviceId) as Device
  const restDevices = data.devices.filter(d => d.id !== deviceId) as Device[]
  data.devices = [...restDevices, {...device, ...dataToUpdate}]
  await fs.writeFile(process.cwd() + '/app/data.json', JSON.stringify(data, null, 2));
  
}