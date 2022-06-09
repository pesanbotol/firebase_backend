import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {firestore} from 'firebase-admin';
// Create polyline using http://apps.headwallphotonics.com/

const _hardcodedMission = [
  {
    kind: 'geofence+picture',
    description: 'Go to Bali',
    center: [8.4095, 115.1889],
    enable: true,
    id: "goto_bali_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'BALI VISITOR',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(-8.088588547843363, 114.4158912662579),
      new firestore.GeoPoint(-7.939001771655168, 114.9487281803204),
      new firestore.GeoPoint(-8.026040769900154, 115.49529800453915),
      new firestore.GeoPoint(-8.384877443156084, 115.8825660709454),
      new firestore.GeoPoint(-8.933360858768053, 115.6903053287579),
      new firestore.GeoPoint(-8.908940657041887, 115.0256324771954),
      new firestore.GeoPoint(-8.268019355378232, 114.4158912662579),
      new firestore.GeoPoint(-8.088588547843363, 114.4158912662579),
    ]
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
    const {id, ...rest} = it

    // const {value, error} = MissionSchema.validate(rest, {stripUnknown: true})
    // if (error) {
    //   functions.logger.warn("Seeding mission error", error)
    // } else {
      await db.collection('missions').doc(it.id).set(rest);
    // }
  }))

  functions.logger.info('Selesai seeding mission');
});