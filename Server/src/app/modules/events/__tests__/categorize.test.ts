import { categorizeEvent } from "../categorize";

describe("categorizeEvent", () => {
  it("should return 'Work' when title or notes contain work-related keywords", () => {
    expect(categorizeEvent("Client meeting")).toBe("Work");
    expect(categorizeEvent("Weekly Report")).toBe("Work");
    expect(categorizeEvent("Update", "Project deadline is near")).toBe("Work");
    expect(categorizeEvent("Team sync", "Review KPI and performance")).toBe("Work");
    expect(categorizeEvent("Design discussion")).toBe("Work");
  });

  it("should return 'Personal' when title or notes contain personal-related keywords", () => {
    expect(categorizeEvent("Family Dinner")).toBe("Personal");
    expect(categorizeEvent("Doctor's Appointment")).toBe("Personal");
    expect(categorizeEvent("Plan", "Holiday with family")).toBe("Personal");
    expect(categorizeEvent("Birthday Party")).toBe("Personal");
    expect(categorizeEvent("Trip to the beach", "Vacation with wife")).toBe("Personal");
  });

  it("should return 'Other' when no keywords match", () => {
    expect(categorizeEvent("Go shopping")).toBe("Other");
    expect(categorizeEvent("Unknown event")).toBe("Other");
  });

  it("should be case insensitive", () => {
    expect(categorizeEvent("PROJECT meeting")).toBe("Work");
    expect(categorizeEvent("BiRthDaY Party")).toBe("Personal");
    expect(categorizeEvent("HOLIDAY with FAMILY")).toBe("Personal");
  });

  it("should handle undefined or empty notes", () => {
    expect(categorizeEvent("Client call")).toBe("Work");
    expect(categorizeEvent("Holiday", undefined)).toBe("Personal");
    expect(categorizeEvent("Read book", "")).toBe("Personal");
  });
});
