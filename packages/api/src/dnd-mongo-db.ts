import {
  MongoClient,
  Db,
  // ObjectId,
} from 'mongodb';
const mongoUrl = 'mongodb://localhost:27017/';
const dbName = 'dnd';

export const db = new Promise<{
  db: Db;
  close: Function;
}>((resolve, reject) => {
  MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, async function (
    err,
    client
  ) {
    if (err) {
      reject(err);
    } else {
      const db = client.db(dbName);
      resolve({
        db,
        close: client.close,
      });
    }

    // const characterSheetCollection = db.collection('characters')

    // const players = db.collection<{ _id: ObjectId; name: string }>('players');
    // const characters = db.collection<{
    //   _id: ObjectId;
    //   characterName: string;
    //   player: string;
    // }>('characters');

    // const josh = await players.findOne({
    //   name: 'Josh',
    // });

    // if (!josh) {
    //   throw new Error(`'Can't find Josh`);
    // }

    // const joshCharacters = await (
    //   await characters.find({
    //     player: new ObjectId(josh._id).toString(),
    //   })
    // ).toArray();

    // console.log(
    //   `${josh.name} has ${joshCharacters.length} character${
    //     joshCharacters.length === 1 ? '' : 's'
    //   }`
    // );

    // joshCharacters.forEach((character) => {
    //   console.log(`- ${character.characterName}`);
    // });

    // await client.close();
  });
});
