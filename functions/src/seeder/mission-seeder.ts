import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {MissionCreateSchema} from '../interfaces/Mission';

const _hardcodedMission: Array<MissionCreateSchema> = [
  {
    kind: 'geofence',
    description: 'Go to Bali',
    center: [8.4095, 115.1889],
    enable: true,
    id: "goto_bali_mission",
    _class_id: -1,
    createdAt: admin.firestore.Timestamp.now(),
    reward: ['BALI VISITOR']
  }
]

/**
 * Seed mission in firestore
 */
export const seedMissions = functions.https.onCall(async (data, ctx) => {
  const db = admin.firestore()

  functions.logger.info('Mulai seeding mission');

  await Promise.all(_hardcodedMission.map(async (it) => {
    functions.logger.info(`Seeding mission with id ${it.id}`);
    await db.collection('missions').doc(it.id).set({});
  }))

  functions.logger.info('Selesai seeding mission');
});