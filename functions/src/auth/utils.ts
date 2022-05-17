import * as admin from 'firebase-admin'

export const isUsernameTaken = async (lowercaseUsername: string): Promise<boolean> => {
  const db = admin.firestore()
  const usernameQuery = await db.collection('users').where('username', '==', lowercaseUsername).get()
  return usernameQuery.docs.length > 0
}
