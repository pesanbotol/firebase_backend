/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

/**
 * Unified media storage type, with thumbnail support (Not only images)
 */
export interface IMedia {
  kind?: 'image' | 'video' | 'unknown';
  mediaThumbnailUrl?: string;
  mediaUrl?: string;
}

/**
 * a firebase timestamp (If getting data from firestore) or js date (if creating data to store to firestore)
 */
export type fbTimestampOrJsDateSchema = {
  _nanoseconds?: number;
  _seconds?: number;
} | {
  nanoseconds?: number;
  seconds?: number;
} | Date;

/**
 * Unified typesense, firestore, and client geoposition data type, [lat, lng]
 */
export type geoSchema = any[];
