import { MongoClient, Db } from 'mongodb';
import { MONGO_URL, DB_NAME } from '@dnd/env';

export const db = new Promise<{
  db: Db;
  close: Function;
}>((resolve, reject) => {
  MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, async function (
    err,
    client
  ) {
    if (err) {
      reject(err);
    } else {
      const db = client.db(DB_NAME);
      resolve({
        db,
        close: client.close,
      });
    }
  });
});
