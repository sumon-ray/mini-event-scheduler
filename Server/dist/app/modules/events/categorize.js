"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizeEvent = categorizeEvent;
const eventCategories_1 = require("../../constraints/eventCategories");
/**
 * AI-like categorization ফাংশন।
 * title এবং optional notes মিলে category নির্ধারণ করে।
 */
function categorizeEvent(title, notes) {
    const text = (title + " " + (notes !== null && notes !== void 0 ? notes : "")).toLowerCase();
    if (eventCategories_1.workKeywords.some((kw) => text.includes(kw))) {
        return "Work";
    }
    if (eventCategories_1.personalKeywords.some((kw) => text.includes(kw))) {
        return "Personal";
    }
    return "Other";
}
