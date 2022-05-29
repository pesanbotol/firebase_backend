/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Bottle {
  _contentImagePath?: string
  autoTags?: string[]
  /**
   * Auto aggregated number of comments received for this post (Including filtered, spam etc)
   */
  commentCount?: number
  contentImageUrl?: string
  contentText?: string
  /**
   * a firebase timestamp (If getting data from firestore) or js date (if creating data to store to firestore)
   */
  createdAt: {
    _nanoseconds?: number
    _seconds?: number
  } | {
    nanoseconds?: number
    seconds?: number
  } | Date
  flags?: string[]
  /**
   * Unified typesense, firestore, and client geoposition data type, [lat, lng]
   */
  geo?: any[]
  kind?: 'text' | 'image' | '360' | 'short'
  /**
   * Last time someone commented on this post, used for relevance
   */
  lastCommentAt?: Date
  /**
   * Last time someone like this post, used for relevance
   */
  lastLikeAt?: Date
  /**
   * Last time someone either like or commented on this post, for easier relevance scoring
   */
  lastSignalAt?: Date
  likeCount?: number
  mentions?: string[]
  tags?: string[]
  uid: string
}

/**
 * Schema for creating a new post, sent from client
 */
export interface BottleCreateReqDTO {
  contentImagePath?: string
  contentText?: string
  /**
   * Unified typesense, firestore, and client geoposition data type, [lat, lng]
   */
  geo?: any[]
  kind?: 'text' | 'image' | '360' | 'short'
}

/**
 * Schema for validating post received by client from server, this adds personalized relevance score
 */
export interface BottleGetResDTO {
  _contentImagePath?: string
  autoTags?: string[]
  /**
   * Auto aggregated number of comments received for this post (Including filtered, spam etc)
   */
  commentCount?: number
  contentImageUrl?: string
  contentText?: string
  /**
   * a firebase timestamp (If getting data from firestore) or js date (if creating data to store to firestore)
   */
  createdAt: {
    _nanoseconds?: number
    _seconds?: number
  } | {
    nanoseconds?: number
    seconds?: number
  } | Date
  flags?: string[]
  /**
   * Unified typesense, firestore, and client geoposition data type, [lat, lng]
   */
  geo?: any[]
  kind?: 'text' | 'image' | '360' | 'short'
  /**
   * Last time someone commented on this post, used for relevance
   */
  lastCommentAt?: Date
  /**
   * Last time someone like this post, used for relevance
   */
  lastLikeAt?: Date
  /**
   * Last time someone either like or commented on this post, for easier relevance scoring
   */
  lastSignalAt?: Date
  likeCount?: number
  mentions?: string[]
  relevanceScore?: number
  tags?: string[]
  uid: string
  user?: UserProfileGet
}

export interface IndexByGeocordReqDTO {
  /**
   * Unified typesense, firestore, and client geoposition data type, [lat, lng]
   */
  geo?: any[]
  /**
   * show post as recent as x minutes, default to 24 hours
   */
  minutes?: number
}

export interface IndexByGeoposDTO {
  lat: number
  lng: number
}

export interface SearchReqDTO {
  page?: number
  perPage?: number
  q: string | '' | null
  searchKind: 'all' | 'users' | 'bottles'
}

export interface UserMetaAggegator {
  commentCount: number
  likeCount: number
  postCount: number
  recvCommentCount: number
  recvLikeCount: number
}

export interface UserProfile {
  description?: string
  displayName?: string
  follows?: any[]
  recvFollows?: any[]
  registeredAt: Date
  username: string
}

export interface UserProfileGet {
  displayName?: string
  username: string
}

export interface UserUpdateProfile {
  description?: string
  displayName?: string
  facebook?: string
  instagram?: string
  twitter?: string
}
