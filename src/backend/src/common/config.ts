import { strict as assert } from 'node:assert';

export default () => {
  const config = {
    env: (process.env.NODE_ENV || 'development') as
      | 'development'
      | 'production',
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  };

  assert(
    config.google.clientID,
    'GOOGLE_CLIENT_ID environment variable is missing',
  );

  assert(
    config.google.clientSecret,
    'GOOGLE_CLIENT_SECRET environment variable is missing',
  );

  return config;
};
