import { MongoClient, Db } from 'mongodb';
import { MONGO_URL, DB_NAME } from '@dnd/env';

export const dndDB = new Promise<{
  db: Db;
  closeDb: Function;
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
        closeDb() {
          return client.close();
        },
      });
    }
  });
});
