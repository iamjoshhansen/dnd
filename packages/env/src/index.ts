import { cleanEnv, str } from 'envalid';
import { resolve } from 'path';

const dotEnvPath = resolve(__dirname, `../../../../.env`);

const env = cleanEnv(
  process.env,
  {
    MONGO_URL: str(),
    DB_NAME: str(),
    COLLECTION_SPELLS: str(),
    COLLECTION_RAW_SPELLS: str(),
    COLLECTION_PLAYERS: str(),
    COLLECTION_CHARACTERS: str(),
    COLLECTION_CAMPAIGNS: str(),
  },
  {
    dotEnvPath,
  }
);

export const {
  MONGO_URL,
  DB_NAME,
  COLLECTION_SPELLS,
  COLLECTION_RAW_SPELLS,
  COLLECTION_PLAYERS,
  COLLECTION_CHARACTERS,
  COLLECTION_CAMPAIGNS,
} = env;
