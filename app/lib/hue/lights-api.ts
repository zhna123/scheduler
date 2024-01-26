import { createSubmittable as createSubmittableLightState, LightState } from "./models/light-state";

const put = {
  method: "PUT",
  json: true,
};

const bridgeUri = process.env.BRIDGE_URI

export class LightsApi {
  async findLight(id: string, lightArray: any[]) {
    return lightArray.find((light) => {
      return light.id === id;
    });
  }

  
  async putState(id: string, lightState: Partial<LightState>): Promise<void> {
    const uri = `${bridgeUri}/lights/${id}/state`;
    const submittableLightState = createSubmittableLightState(lightState);
    const parameters = {
      ...put,
      body: JSON.stringify(submittableLightState),
    };
    console.log(`putting light state${JSON.stringify({ uri, parameters }, null, 2)}`);
    const response = await (await fetch(uri, parameters)).json();
    console.log(`put light state response${JSON.stringify(response, null, 2)}`);
  }
}