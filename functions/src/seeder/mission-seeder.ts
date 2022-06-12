import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {firestore} from 'firebase-admin';
// Create polyline using http://apps.headwallphotonics.com/

const _hardcodedMission = [
  {
    kind: 'geofence',
    description: 'Go to Bali',
    center: [-8.4095, 115.1889],
    enable: true,
    id: "goto_bali_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'BALI EXPLORER',
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
    kind: 'geofence',
    description: 'Visit Garuda Wisnu Kencana in Bali ',
    center: [-8.813733553299409, 115.16660567743128],
    enable: true,
    id: "gwk_bali_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'GWK BALI MASTER EXPLORER',
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
    kind: 'geofence',
    description: 'Visit Penglipuran tourism village in Bali ',
    center: [-8.422014775063426, 115.35892766915914],
    enable: true,
    id: "penglipuran_bali_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'PENGLIPURAN BALI MASTER EXPLORER',
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
    _class_id: 3,
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
    _class_id: 10,
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
    _class_id: 0,
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
    _class_id: 11,
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
    kind: 'geofence',
    description: 'Visit Gedung Sate in Bandung, Jawa Barat',
    center: [-6.901868756243435, 107.6185790699266],
    enable: true,
    id: "bandung_jabar_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'BANDUNG MASTER EXPLORER',
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
    kind: 'geofence',
    description: 'Visit Kebun Raya Bogor in Bogor, Jawa Barat',
    center: [-6.600203478405904, 106.79780099660768],
    enable: true,
    id: "bogor_jabar_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'PRAMBANAN MASTER EXPLORER',
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
    kind: 'geofence',
    description: 'Visit Khatulistiwa Park in Kalimantan',
    center: [0.000992961970242778, 109.32211336424594],
    enable: true,
    id: "khatulistiwa_kalimantan_mission",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'KHATULISTIWA PARK KALIMANTAN MASTER EXPLORER',
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
  },

  {
    kind: 'geofence+picture',
    description: '',
    center: [-8.363116718328028,115.43486917817383],
    enable: true,
    id: "besakih",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'BESAKIH VISITOR',
    _class_id: 4,
    geofence: [
      new firestore.GeoPoint(-8.363116718328028,115.43486917817383),
      new firestore.GeoPoint(-8.388930928216672, 115.42963350617676),
      new firestore.GeoPoint(-8.391563202029836, 115.46559656464844),
      new firestore.GeoPoint(-8.362777046263053, 115.46542490327148),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Sanur and take a picture',
    center: [-8.71464417604366, 115.26991920852049],
    enable: true,
    id: "sanur",
    class_id: 7,
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'SANUR VISITOR',
    geofence: [
      new firestore.GeoPoint(-8.695469892128505, 115.24528580092772),
      new firestore.GeoPoint(-8.716680325453178, 115.24554329299315),
      new firestore.GeoPoint(-8.71464417604366, 115.26991920852049),
      new firestore.GeoPoint(-8.689361064464014, 115.27052002333983),
      new firestore.GeoPoint(-8.695469892128505, 115.24528580092772),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Gili Trawang and take a picture',
    center: [-8.363916889143846, 116.01920742578122],
    enable: true,
    class_id: 15,
    id: "gilitrawang",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'GILI TRAWANG VISITOR',
    geofence: [
      new firestore.GeoPoint(-8.334704070663227, 116.01912159509274),
      new firestore.GeoPoint(-8.363916889143846, 116.01920742578122),
      new firestore.GeoPoint(-8.364086724716623, 116.04984898156735),
      new firestore.GeoPoint(-8.33258096091539, 116.04615826196286),
      new firestore.GeoPoint(-8.334704070663227, 116.01912159509274),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Kawah Ijen and take a picture',
    center: [-8.049032842887318, 114.23317097875979],
    enable: true,
    class_id: 16,
    id: "kawahijen",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'KAWAH IJEN VISITOR',
    geofence: [
      new firestore.GeoPoint(-8.049032842887318, 114.23317097875979),
      new firestore.GeoPoint(-8.06968370428269, 114.23317097875979),
      new firestore.GeoPoint(-8.06602951339663, 114.25359868261721),
      new firestore.GeoPoint(-8.048182990632338, 114.25385617468264),
      new firestore.GeoPoint(-8.049032842887318, 114.23317097875979),
    ]
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Komodo island and take a picture',
    center: [-8.531574878964053, 119.34570387441403],
    enable: true,
    class_id: 17,
    id: "kodomo",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'KOMODO MEETER',
    geofence: [
      new firestore.GeoPoint(-8.531574878964053, 119.34570387441403),
      new firestore.GeoPoint(-8.780703153809036, 119.34570387441403),
      new firestore.GeoPoint(-8.775274330734803, 119.53041151601559),
      new firestore.GeoPoint(-8.417477974841699, 119.60594252187497),
      new firestore.GeoPoint(-8.412723204239601, 119.40887526113278),
      new firestore.GeoPoint(-8.531574878964053, 119.34570387441403),
    ]
  },

  {
    kind: 'geofence+picture',
    description: 'Visit Monkey Forest and take a picture',
    center: [-8.514068875544234, 115.25320808564452],
    class_id: 9,
    enable: true,
    id: "monkeyforest",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'MONKEY MEETER',
    geofence: [
      new firestore.GeoPoint(-8.514068875544234, 115.25320808564452),
      new firestore.GeoPoint(-8.525443268943837, 115.255096360791),
      new firestore.GeoPoint(-8.52298167517681, 115.26634018098143),
      new firestore.GeoPoint(-8.514578183973807, 115.26625435029295),
      new firestore.GeoPoint(-8.514068875544234, 115.25320808564452),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Pura Tirtha Empul and take a picture',
    center: [-8.411258530755367, 115.31086726557618],
    enable: true,
    class_id: 6,
    id: "tirthaempul",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'TIRTHA EMPUL VISITOR',
    geofence: [
      new firestore.GeoPoint(-8.411258530755367, 115.31086726557618),
      new firestore.GeoPoint(-8.419452013989384, 115.3096656359375),
      new firestore.GeoPoint(-8.419154844052267, 115.32219691645508),
      new firestore.GeoPoint(-8.411767975180545, 115.3203086413086),
      new firestore.GeoPoint(-8.411258530755367, 115.31086726557618),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Kraton Yogya and take a picture',
    center: [-7.793974181265752, 110.35128938085934],
    enable: true,
    class_id: 2,
    id: "kraton",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'KRATON VISITOR',
    geofence: [
      new firestore.GeoPoint(-7.793974181265752, 110.35128938085934),
      new firestore.GeoPoint(-7.81506302242462, 110.34983025915524),
      new firestore.GeoPoint(-7.813872551672415, 110.3803859842529),
      new firestore.GeoPoint(-7.793974181265752, 110.37609444982907),
      new firestore.GeoPoint(-7.793974181265752, 110.35128938085934),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Jago and take a picture',
    center: [-8.000770212309012, 112.75379251738282],
    enable: true,
    class_id: 1,
    id: "jago",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'JAGO VISITOR',
    geofence: [
      new firestore.GeoPoint(-8.000770212309012, 112.75379251738282),
      new firestore.GeoPoint(-8.014114244813024, 112.7567965914795),
      new firestore.GeoPoint(-8.01428422966736, 112.7784259249756),
      new firestore.GeoPoint(-7.999410286368232, 112.77791094084473),
      new firestore.GeoPoint(-8.000770212309012, 112.75379251738282),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Ratu Boko and take a picture',
    center: [-7.766374494518572, 110.48031774702149],
    class_id: 12,
    enable: true,
    id: "ratuboko",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'RATU BOKO VISITOR',
    geofence: [
      new firestore.GeoPoint(-7.766374494518572, 110.48031774702149),
      new firestore.GeoPoint(-7.774878747496074, 110.4813477152832),
      new firestore.GeoPoint(-7.771732193970979, 110.49825636091309),
      new firestore.GeoPoint(-7.765353972588683, 110.49705473127442),
      new firestore.GeoPoint(-7.766374494518572, 110.48031774702149),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Taman Sari and take a picture',
    center: [-7.805050233127004, 110.35061753908688],
    enable: true,
    class_id: 8,
    id: "tamansari",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'TAMAN SARI VISITOR',
    geofence: [
      new firestore.GeoPoint(-7.805050233127004, 110.35061753908688),
      new firestore.GeoPoint(-7.813978869658115, 110.35181916872556),
      new firestore.GeoPoint(-7.811938055277037, 110.37439263979489),
      new firestore.GeoPoint(-7.80590058768383, 110.37113107363278),
      new firestore.GeoPoint(-7.805050233127004, 110.35061753908688),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Tanah Lot and take a picture',
    center: [-8.617054793848997, 115.08079885180666],
    enable: true,
    class_id: 5,
    id: "tanahlot",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'TANAH LOT VISITOR',
    geofence: [
      new firestore.GeoPoint(-8.617054793848997, 115.08079885180666),
      new firestore.GeoPoint(-8.623758817920535, 115.0817429893799),
      new firestore.GeoPoint(-8.624098259013858, 115.092385994751),
      new firestore.GeoPoint(-8.617224517444392, 115.09118436511233),
      new firestore.GeoPoint(-8.617054793848997, 115.08079885180666),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Sukuh and take a picture',
    center: [-7.622544552425433, 111.1241349914795],
    enable: true,
    class_id: 14,
    id: "sukuh",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'SUKUH VISITOR',
    geofence: [
      new firestore.GeoPoint(-7.622544552425433, 111.1241349914795),
      new firestore.GeoPoint(-7.631051691777098, 111.12344834597168),
      new firestore.GeoPoint(-7.632072537130696, 111.13417718203125),
      new firestore.GeoPoint(-7.62399077804643, 111.13666627199707),
      new firestore.GeoPoint(-7.622544552425433, 111.1241349914795),
    ]
  },
  {
    kind: 'geofence+picture',
    description: 'Visit Sewu and take a picture',
    center: [-7.739073940132538, 110.48286730944822],
    enable: true,
    class_id: 13,
    id: "sewu",
    createdAt: admin.firestore.Timestamp.now(),
    reward: 'SEWU VISITOR',
    geofence: [
      new firestore.GeoPoint(-7.739073940132538, 110.48286730944822),
      new firestore.GeoPoint(-7.747493697897904, 110.4832964628906),
      new firestore.GeoPoint(-7.747153508926983, 110.50011927783201),
      new firestore.GeoPoint(-7.73694771207672, 110.49702937304686),
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

    // const {value, error} = MissionSchema.validate(rest, {stripUnknown: true})
    // if (error) {
    //   functions.logger.warn("Seeding mission error", error)
    // } else {
        const {id, ...rest} = it
      try {
        await db.collection('missions').doc(it.id).set(rest);
      } catch (error) {
        functions.logger.error(`Mission with desc '${rest.description}' fail to add, `, error)
      }
    // }
  }))

  functions.logger.info('Selesai seeding mission');
});