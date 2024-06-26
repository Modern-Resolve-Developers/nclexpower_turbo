import getConfig from 'next/config';

const {
  publicRuntimeConfig: { processEnv },
} = getConfig();

export const config = {
  get value() {
    return {
      NODE_ENV: process.env.NODE_ENV,
      API_URL: processEnv.NEXT_PRIVATE_API_URL!,
      LOCAL_API_URL: processEnv.NEXT_PRIVATE_LOCAL_API_URL,
      XAPIKEY: processEnv.NEXT_PRIVATE_XAPI_KEY!,
    };
  },
};
