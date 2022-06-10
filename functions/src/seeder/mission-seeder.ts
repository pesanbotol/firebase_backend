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
    reward: 'BALI EXPLORER',
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
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Garuda Wisnu Kencana in Bali ',
    center: [-8.813733553299409, 115.16660567743128],
    enable: true,
    id: "gwk_bali_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'GWK BALI MASTER EXPLORER',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(-8.81307091854516, 115.16638573629206),
      new firestore.GeoPoint(-8.81350030600143, 115.16603168470209),
      new firestore.GeoPoint(-8.814152337851322, 115.16579028589075),       
      new firestore.GeoPoint(-8.814857379126018, 115.16588684541529),        
      new firestore.GeoPoint(-8.8150588192431, 115.16684707624262),
      new firestore.GeoPoint(-8.814369681545603, 115.16741034013575),
      new firestore.GeoPoint(-8.813282961795803, 115.16735133153742),
      new firestore.GeoPoint(-8.81307091854516, 115.16638573629206),
    ]
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Penglipuran tourism village in Bali ',
    center: [-8.422014775063426, 115.35892766915914],
    enable: true,
    id: "penglipuran_bali_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'PENGLIPURAN BALI MASTER EXPLORER',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(-8.42019992426299, 115.35869163476583),
      new firestore.GeoPoint(-8.421537183572653, 115.35818737947103),
      new firestore.GeoPoint(-8.423309575695425, 115.35790842973348),       
      new firestore.GeoPoint(-8.423978200554853, 115.35825175248739),        
      new firestore.GeoPoint(-8.423617355536143, 115.35943192445394),
      new firestore.GeoPoint(-8.420964073005708, 115.36036533319113),
      new firestore.GeoPoint(-8.419998273648744, 115.35983962022421),
      new firestore.GeoPoint(-8.42019992426299, 115.35869163476583),
    ]
  },
  
  {
    kind: 'geofence+picture',
    description: 'Visit Monumen Nasional in Jakarta ',
    center: [-6.174100335545593, 106.82668082205244],
    enable: true,
    id: "monas_jakarta_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'JAKARTA MASTER EXPLORER',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(-6.173204717191782, 106.8273723855026),
      new firestore.GeoPoint(-6.173258050306254, 106.82523734712674),
      new firestore.GeoPoint(-6.1751140393448765, 106.8249583973892),       
      new firestore.GeoPoint(-6.177183352787497, 106.82517297411039),        
      new firestore.GeoPoint(-6.177620680881825, 106.82706124925687),
      new firestore.GeoPoint(-6.177322017832142, 106.82915337228849),
      new firestore.GeoPoint(-6.1734180496174815, 106.82926066064908),
      new firestore.GeoPoint(-6.173204717191782, 106.8273723855026),
    ]
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Candi Penataran in Jawa Timur',
    center: [-8.016196319640905, 112.20932958876772],
    enable: true,
    id: "penataran_jatim_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'PENATARAN JAWA TIMUR MASTER EXPLORER',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(-8.015372910676408, 112.208750138287),
      new firestore.GeoPoint(-8.01571022325903, 112.20923830032771),
      new firestore.GeoPoint(-8.016020975548292, 112.20969964027827),       
      new firestore.GeoPoint(-8.016382191586237, 112.210010776524),        
      new firestore.GeoPoint(-8.01671950333209, 112.20984984398311),
      new firestore.GeoPoint(-8.016376879588, 112.20882792234843),
      new firestore.GeoPoint(-8.016121903591186, 112.20848996401256),
      new firestore.GeoPoint(-8.015372910676408, 112.208750138287),
    ]
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Candi Borobudur in Jawa tengah',
    center: [-7.607552101002292, 110.20385064161289],
    enable: true,
    id: "borobudur_jateng_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'BOROBUDUR JAWA TENGAH MASTER EXPLORER',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(-7.607174579568467, 110.2036355691879),
      new firestore.GeoPoint(-7.607642493408989, 110.20315277156521),
      new firestore.GeoPoint(-7.608402852311242, 110.20319568690945),
      new firestore.GeoPoint(-7.608687321903745, 110.2036194759338),
      new firestore.GeoPoint(-7.608717895727224, 110.20444827851941),
      new firestore.GeoPoint(-7.607994093103873, 110.20465883192708),
      new firestore.GeoPoint(-7.607238718356625, 110.20446370122124),
      new firestore.GeoPoint(-7.607174579568467, 110.2036355691879),
    ]
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Candi Prambanan in Jawa tengah',
    center: [-7.7519939916892335, 110.49133360614147],
    enable: true,
    id: "prambanan_jateng_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'PRAMBANAN JAWA TENGAH MASTER EXPLORER',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(-7.750910179108891, 110.49048891214767),
      new firestore.GeoPoint(-7.752015782394612, 110.49043526796737),
      new firestore.GeoPoint(-7.753270213374908, 110.49052109865585),
      new firestore.GeoPoint(-7.753493459174373, 110.49169054178634),
      new firestore.GeoPoint(-7.753100121257713, 110.49250593332687),
      new firestore.GeoPoint(-7.750952702365885, 110.49243083147445),
      new firestore.GeoPoint(-7.750771978493993, 110.49143304972091),
      new firestore.GeoPoint(-7.750910179108891, 110.49048891214767),
    ]
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Gedung Sate in Bandung, Jawa Barat',
    center: [-6.901868756243435, 107.6185790699266],
    enable: true,
    id: "bandung_jabar_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'BANDUNG MASTER EXPLORER',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(-6.901332467466188, 107.61870384526046),
      new firestore.GeoPoint(-6.901433652912874, 107.61703551125319),
      new firestore.GeoPoint(-6.903089895834044, 107.61701405358107),
      new firestore.GeoPoint(-6.903617123071861, 107.61875212502272),
      new firestore.GeoPoint(-6.903095221364623, 107.62055456948073),
      new firestore.GeoPoint(-6.902381599731386, 107.62057602715285),
      new firestore.GeoPoint(-6.901454955109429, 107.61996448349745),
      new firestore.GeoPoint(-6.901332467466188, 107.61870384526046),
    ]
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Kebun Raya Bogor in Bogor, Jawa Barat',
    center: [-6.600203478405904, 106.79780099660768],
    enable: true,
    id: "bogor_jabar_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'PRAMBANAN MASTER EXPLORER',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(-6.593241307413715, 106.79708693965787),
      new firestore.GeoPoint(-6.595586035233852, 106.79412578090543),
      new firestore.GeoPoint(-6.59925231467771, 106.79438327297086),
      new firestore.GeoPoint(-6.604325377516356, 106.79652904018278),
      new firestore.GeoPoint(-6.601767537204718, 106.80562709316129),
      new firestore.GeoPoint(-6.5969076042073445, 106.80464004024381),
      new firestore.GeoPoint(-6.592559202692463, 106.80172179683561),
      new firestore.GeoPoint(-6.593241307413715, 106.79708693965787),
    ]
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Khatulistiwa Park in Kalimantan',
    center: [0.000992961970242778, 109.32211336424594],
    enable: true,
    id: "khatulistiwa_kalimantan_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'KHATULISTIWA PARK KALIMANTAN MASTER EXPLORER',
    // _class_id: isinya adalah id dari class hasil deteksi model landmark
    geofence: [
      new firestore.GeoPoint(0.0012126066245441497, 109.32222459406314),
      new firestore.GeoPoint(0.0011965133704522363, 109.3219831952518),
      new firestore.GeoPoint(0.0010905661143927276, 109.32175788969455),
      new firestore.GeoPoint(0.000778088764202432, 109.3218920001453),
      new firestore.GeoPoint(0.000672141508117479, 109.32223129958568),
      new firestore.GeoPoint(0.0009577967681757893, 109.32239491433559),
      new firestore.GeoPoint(0.0011160471000308358, 109.3223439523643),
      new firestore.GeoPoint(0.0012126066245441497, 109.32222459406314),
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