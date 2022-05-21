/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Bottle {
  _contentImagePath?: string;
  autoTags?: string[];
  /**
   * Auto aggregated number of comments received for this post (Including filtered, spam etc)
   */
  commentCount?: number;
  contentText?: string;
  /**
   * a firebase timestamp (If getting data from firestore) or js date (if creating data to store to firestore)
   */
  createdAt: {
    _nanoseconds?: number;
    _seconds?: number;
  } | {
    nanoseconds?: number;
    seconds?: number;
  } | Date;
  flags?: string[];
  /**
   * Unified typesense, firestore, and client geoposition data type, [lat, lng]
   */
  geo?: any[];
  kind?: 'text';
  /**
   * Last time someone commented on this post, used for relevance
   */
  lastCommentAt?: Date;
  /**
   * Last time someone like this post, used for relevance
   */
  lastLikeAt?: Date;
  /**
   * Last time someone either like or commented on this post, for easier relevance scoring
   */
  lastSignalAt?: Date;
  likeCount?: number;
  mentions?: string[];
  tags?: string[];
  uid: string;
}

/**
 * Schema for creating a new post, sent from client
 */
export interface BottleCreateReqDTO {
  contentImagePath?: string;
  contentText?: string;
  /**
   * Unified typesense, firestore, and client geoposition data type, [lat, lng]
   */
  geo?: any[];
  kind?: 'text';
}

/**
 * Schema for validating post received by client from server, this adds personalized relevance score
 */
export interface BottleGetResDTO {
  _contentImagePath?: string;
  _contentImageUrl?: string;
  autoTags?: string[];
  /**
   * Auto aggregated number of comments received for this post (Including filtered, spam etc)
   */
  commentCount?: number;
  contentText?: string;
  /**
   * a firebase timestamp (If getting data from firestore) or js date (if creating data to store to firestore)
   */
  createdAt: {
    _nanoseconds?: number;
    _seconds?: number;
  } | {
    nanoseconds?: number;
    seconds?: number;
  } | Date;
  flags?: string[];
  /**
   * Unified typesense, firestore, and client geoposition data type, [lat, lng]
   */
  geo?: any[];
  kind?: 'text';
  /**
   * Last time someone commented on this post, used for relevance
   */
  lastCommentAt?: Date;
  /**
   * Last time someone like this post, used for relevance
   */
  lastLikeAt?: Date;
  /**
   * Last time someone either like or commented on this post, for easier relevance scoring
   */
  lastSignalAt?: Date;
  likeCount?: number;
  mentions?: string[];
  relevanceScore?: number;
  tags?: string[];
  uid: string;
}
