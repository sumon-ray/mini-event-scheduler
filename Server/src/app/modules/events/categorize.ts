const workKeywords = ["meeting", "project", "client", "deadline", "report"];
const personalKeywords = ["birthday", "family", "party", "holiday", "doctor"];

export function categorizeEvent(title: string, notes?: string): "Work" | "Personal" | "Other" {
  const text = (title + " " + (notes ?? "")).toLowerCase();

  if (workKeywords.some(kw => text.includes(kw))) {
    return "Work";
  }

  if (personalKeywords.some(kw => text.includes(kw))) {
    return "Personal";
  }

  return "Other";
}
