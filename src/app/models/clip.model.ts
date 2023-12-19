import { FieldValue } from "@angular/fire/firestore";

export default interface IClip {
  docID?: string;
  uid: string;
  title: string;
  clipFileName: string;
  clipUrl: string;
  timestamp: FieldValue;
  screenshotURL?: string;
  screenshotFileName?: string;
}
