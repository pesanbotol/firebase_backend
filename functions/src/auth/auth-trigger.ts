import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { UserCreateProfile } from '../interfaces/User'
import { isUsernameTaken } from './utils'
import {UserMetaAggegator} from '../interfaces'

const _generateRandomNumericId = (): string => Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString()

/**
 * When a user deleted its account, its profile will also be deleted
 * but! we have no endpoint to delete account yet, so, this will never be called
 * we definitely should think more about this
 */
export const deleteProfile = functions.auth.user().onDelete((user) => {
  // const currentTime = Date.now();
  const db = admin.firestore()
  void db.collection('users').doc(user.uid).delete()
  functions.logger.info(`Deleted user with id ${user.uid}`)
})

/**
 * When a new user registered, create a profile account
 */
export const createProfile = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore()
  const currentTime = new Date()

  let proposalUid = _generateRandomNumericId()

  // Generate random numeric id until a unique initial username found
  while (true) {
    if (await isUsernameTaken(proposalUid)) {
      proposalUid = _generateRandomNumericId()
    } else {
      break
    }
  }

  const _displayName = user.displayName && user.displayName.length > 0 ? user.displayName : proposalUid

  const newProfile: UserCreateProfile = {
    registeredAt: currentTime,
    description: 'halo',
    username: proposalUid,
    displayName: _displayName,
  }

  const newProfileAggregator: UserMetaAggegator = {
    commentCount: 0,
    likeCount: 0,
    postCount: 0,
    recvCommentCount: 0,
    recvLikeCount: 0
  }

  const usernamesTaken = {
    uid: user.uid
  }

  // void db.collection('users').doc(user.uid).set(newProfile)
  await db.runTransaction(async (tr) => {
    const userProfileRef = db.collection('users').doc(user.uid)
    tr.set(userProfileRef, newProfile)
    tr.create(userProfileRef.collection('meta').doc('aggregator'), newProfileAggregator)
    tr.set(db.collection('usernames').doc(proposalUid), usernamesTaken)
  })

  functions.logger.info(`Created profile and aggregator for username (${proposalUid}) for user (${user.uid})`)
})
