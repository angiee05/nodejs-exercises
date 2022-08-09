const missingSettings = "Warning: No value set for this environment variable";

const config = {
  PORT: process.env.PORT || missingSettings,
};

export default config;
