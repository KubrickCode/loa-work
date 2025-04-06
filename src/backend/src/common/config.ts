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
    discord: {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      goldExchangeRateWebhookURL:
        process.env.DISCORD_GOLD_EXCHANGE_RATE_WEBHOOK_URL,
    },
    kakao: {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    },
  };

  if (config.env === 'production') {
    assert(
      config.google.clientID,
      'GOOGLE_CLIENT_ID environment variable is missing',
    );

    assert(
      config.google.clientSecret,
      'GOOGLE_CLIENT_SECRET environment variable is missing',
    );

    assert(
      config.discord.clientID,
      'DISCORD_CLIENT_ID environment variable is missing',
    );

    assert(
      config.discord.clientSecret,
      'DISCORD_CLIENT_SECRET environment variable is missing',
    );

    assert(
      config.discord.goldExchangeRateWebhookURL,
      'DISCORD_GOLD_EXCHANGE_RATE_WEBHOOK_URL environment variable is missing',
    );

    assert(
      config.kakao.clientID,
      'KAKAO_CLIENT_ID environment variable is missing',
    );

    assert(
      config.kakao.clientSecret,
      'KAKAO_CLIENT_SECRET environment variable is missing',
    );
  }

  return config;
};
