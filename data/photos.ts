export type PhotoSubject =
  | "yusuke"
  | "anomu"
  | "hiromu"
  | "aberyo"
  | "band"
  | "audience";

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  photographer: string;
  subjects: PhotoSubject[];
  consentLogged: boolean;
  takenAt?: string;
};

export const photos: GalleryPhoto[] = [];
