// import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'

// exports.storage = functions.storage.object().onFinalize(async (f) => {
//   // FIXME: this trigger is expensive
//   // FIXME: make everything in this bucket public, this is a workaround because resizing an image took time, but we need it immediately to reference when creating post
//   // so, just make everything public, an MVP am I rit?
//   // await admin.storage().bucket().file(f.name!).makePublic()
//   functions.logger.info(`Made file at ${f.name} public`)
// })