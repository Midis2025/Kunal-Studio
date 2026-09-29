// Films migrated from studiokunalphotography.com/cinematicfilms (YouTube).
// Titles are cleaned-up versions of the published YouTube titles.

export type Film = {
  id: string; // YouTube id
  couple: string;
  title: string;
  kind: string;
  place?: string;
  music?: string;
  story?: string; // related portfolio story slug
};

export const films: Film[] = [
  { id: "GE4RwB_Ezf8", couple: "Hiral & Hardik", title: "A Hindu Wedding", kind: "Cinematic Highlight Film" },
  { id: "ZT4f1XDbmDg", couple: "Deep & Payal", title: "Toronto, in 4K", kind: "E-shoot Film", place: "Toronto, Canada", story: "deep-payal" },
  { id: "PK30ZglbXJQ", couple: "Harkeet & Nina", title: "Fall in Love: Again & Again", kind: "E-shoot Film", place: "Canada" },
  { id: "4djvYWzA-LY", couple: "Aman & Mrinal", title: "With You", kind: "E-shoot Film", music: "AP Dhillon", story: "aman-mrinal" },
  { id: "MkhER4Ob6dA", couple: "Jugraj & Nooreen", title: "The Engagement", kind: "Engagement Ceremony", place: "Canada", story: "nooreen-jugraj" },
  { id: "V50vQEXenaE", couple: "Nisha & Jonpreet", title: "The Sunflower Farm", kind: "E-shoot Film", place: "Canada", music: "Hey Luv — Sukha" },
  { id: "qhmxcS6rbzY", couple: "Parth & Zeal", title: "Glimpses from the Mehndi", kind: "Mehndi Ceremony", place: "Canada" },
  { id: "EEFd2OHEV6A", couple: "Parth & Zeal", title: "Raaginder", kind: "E-shoot Film", place: "Canada" },
  { id: "YBAhqOTVLH4", couple: "Jagdeep & Manveer", title: "A Punjabi Pre-wedding", kind: "Pre-wedding Film" },
];

export const ytPoster = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
