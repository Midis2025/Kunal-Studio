// Shared enquiry schema — the form renders from these options and the server
// validates against them, so the two can never drift apart.

export const weddingTypes = [
  "Sikh (Anand Karaj)",
  "Hindu",
  "Muslim",
  "Christian",
  "Interfaith / Fusion",
  "Civil / Intimate",
  "Pre-wedding / Engagement shoot",
  "Other",
] as const;

export const guestCounts = ["Under 50", "50–150", "150–300", "300–500", "500+", "Not sure yet"] as const;
export const coverage = ["Photography", "Film", "Both"] as const;
export const sources = ["Instagram", "YouTube", "Google", "A friend or family", "A planner or vendor", "We've worked together before", "Other"] as const;

export type InquiryField =
  | "names"
  | "email"
  | "phone"
  | "eventDate"
  | "location"
  | "weddingType"
  | "guests"
  | "coverage"
  | "source"
  | "message";

export type Inquiry = Record<InquiryField, string>;

export type InquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; errors: Partial<Record<InquiryField, string>>; values: Partial<Inquiry> }
  | { status: "success"; names: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(v: Partial<Inquiry>) {
  const errors: Partial<Record<InquiryField, string>> = {};
  const len = (k: InquiryField) => (v[k] ?? "").trim().length;

  if (len("names") < 2) errors.names = "Please tell us your names.";
  else if (len("names") > 120) errors.names = "That's a little long — please shorten it.";
  if (!EMAIL.test((v.email ?? "").trim()) || len("email") > 200) errors.email = "Please enter a valid email address.";
  if (v.phone && !/^[+()\d\s.-]{7,25}$/.test(v.phone.trim())) errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (!v.eventDate) errors.eventDate = "Please add your date — an approximate one is fine.";
  else {
    const d = new Date(v.eventDate + "T12:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(d.getTime())) errors.eventDate = "Please choose a valid date.";
    else if (d < today) errors.eventDate = "That date has already passed — please choose an upcoming one.";
  }
  if (len("location") < 2) errors.location = "Where is the celebration taking place?";
  else if (len("location") > 160) errors.location = "Please shorten the location.";
  if (!weddingTypes.includes(v.weddingType as (typeof weddingTypes)[number])) errors.weddingType = "Please choose a celebration type.";
  if (!guestCounts.includes(v.guests as (typeof guestCounts)[number])) errors.guests = "Please choose an estimated guest count.";
  if (!coverage.includes(v.coverage as (typeof coverage)[number])) errors.coverage = "Photography, film, or both?";
  if (v.source && !sources.includes(v.source as (typeof sources)[number])) errors.source = "Please choose an option.";
  if (len("message") < 20) errors.message = "Tell us a little more — at least a sentence or two.";
  else if (len("message") > 5000) errors.message = "Please keep your message under 5,000 characters.";

  return errors;
}
