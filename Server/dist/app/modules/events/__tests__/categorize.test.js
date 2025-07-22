"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categorize_1 = require("../categorize");
describe("categorizeEvent", () => {
    it("should return 'Work' when title or notes contain work-related keywords", () => {
        expect((0, categorize_1.categorizeEvent)("Client meeting")).toBe("Work");
        expect((0, categorize_1.categorizeEvent)("Weekly Report")).toBe("Work");
        expect((0, categorize_1.categorizeEvent)("Update", "Project deadline is near")).toBe("Work");
        expect((0, categorize_1.categorizeEvent)("Team sync", "Review KPI and performance")).toBe("Work");
        expect((0, categorize_1.categorizeEvent)("Design discussion")).toBe("Work");
    });
    it("should return 'Personal' when title or notes contain personal-related keywords", () => {
        expect((0, categorize_1.categorizeEvent)("Family Dinner")).toBe("Personal");
        expect((0, categorize_1.categorizeEvent)("Doctor's Appointment")).toBe("Personal");
        expect((0, categorize_1.categorizeEvent)("Plan", "Holiday with family")).toBe("Personal");
        expect((0, categorize_1.categorizeEvent)("Birthday Party")).toBe("Personal");
        expect((0, categorize_1.categorizeEvent)("Trip to the beach", "Vacation with wife")).toBe("Personal");
    });
    it("should return 'Other' when no keywords match", () => {
        expect((0, categorize_1.categorizeEvent)("Go shopping")).toBe("Other");
        expect((0, categorize_1.categorizeEvent)("Unknown event")).toBe("Other");
    });
    it("should be case insensitive", () => {
        expect((0, categorize_1.categorizeEvent)("PROJECT meeting")).toBe("Work");
        expect((0, categorize_1.categorizeEvent)("BiRthDaY Party")).toBe("Personal");
        expect((0, categorize_1.categorizeEvent)("HOLIDAY with FAMILY")).toBe("Personal");
    });
    it("should handle undefined or empty notes", () => {
        expect((0, categorize_1.categorizeEvent)("Client call")).toBe("Work");
        expect((0, categorize_1.categorizeEvent)("Holiday", undefined)).toBe("Personal");
        expect((0, categorize_1.categorizeEvent)("Read book", "")).toBe("Personal");
    });
});
