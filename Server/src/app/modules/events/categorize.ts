import {
  personalKeywords,
  workKeywords,
} from "../../constraints/eventCategories";

// category according to interface
export type Category = "Work" | "Personal" | "Other";

/**
 * AI-like categorization ফাংশন।
 * title এবং optional notes মিলে category নির্ধারণ করে।
 */
export function categorizeEvent(title: string, notes?: string): Category {
  const text = (title + " " + (notes ?? "")).toLowerCase();

  if (workKeywords.some((kw) => text.includes(kw))) {
    return "Work";
  }

  if (personalKeywords.some((kw) => text.includes(kw))) {
    return "Personal";
  }

  return "Other";
}
