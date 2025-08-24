export const EndpointType = {
  DEV: "http://localhost:5000/",
  PROD: ""
}

export function GetBaseURL() {
  return EndpointType.DEV;
  // return EndpointType.prod;
}

export const Endpoints = {
  Organization: {
    Register: "organization/register",
  },
}