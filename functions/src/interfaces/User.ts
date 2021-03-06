/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { IMedia, UserMetaAggegator, UserMetaSocials } from '.';

export interface UserCreateProfile {
  description?: string;
  displayName?: string;
  /**
   * a firebase timestamp (If getting data from firestore) or js date (if creating data to store to firestore)
   */
  registeredAt: {
    _nanoseconds?: number;
    _seconds?: number;
  } | {
    nanoseconds?: number;
    seconds?: number;
  } | Date;
  username: string;
}

export interface UserProfile {
  /**
   * Unified media storage type, with thumbnail support (Not only images)
   */
  avatar?: IMedia;
  description?: string;
  displayName?: string;
  follows?: any[];
  meta: {
    aggregator?: UserMetaAggegator;
    socials?: UserMetaSocials;
  };
  recvFollows?: any[];
  /**
   * a firebase timestamp (If getting data from firestore) or js date (if creating data to store to firestore)
   */
  registeredAt: {
    _nanoseconds?: number;
    _seconds?: number;
  } | {
    nanoseconds?: number;
    seconds?: number;
  } | Date;
  username: string;
}

export interface UserProfileSummaryGet {
  /**
   * Unified media storage type, with thumbnail support (Not only images)
   */
  avatar?: IMedia;
  displayName?: string;
  username: string;
}

export interface UserUpdateProfile {
  description?: string;
  displayName?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}
