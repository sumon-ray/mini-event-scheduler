import { categorizeEvent } from "../categorize";

describe("categorizeEvent", () => {
  it("should return 'Work' when title or notes contain work-related keywords", () => {
    expect(categorizeEvent("Client meeting")).toBe("Work");
    expect(categorizeEvent("Weekly Report")).toBe("Work");
    expect(categorizeEvent("Update", "Project deadline is near")).toBe("Work");
  });

  it("should return 'Personal' when title or notes contain personal-related keywords", () => {
    expect(categorizeEvent("Family Dinner")).toBe("Personal");
    expect(categorizeEvent("Doctor's Appointment")).toBe("Personal");
    expect(categorizeEvent("Plan", "Holiday with family")).toBe("Personal");
  });

  it("should return 'Other' when no keywords match", () => {
    expect(categorizeEvent("Go shopping")).toBe("Other");
    expect(categorizeEvent("Random thought", "Something not categorized")).toBe("Other");
  });

  it("should be case insensitive", () => {
    expect(categorizeEvent("PROJECT meeting")).toBe("Work");
    expect(categorizeEvent("BiRthDaY Party")).toBe("Personal");
  });

  it("should handle undefined notes", () => {
    expect(categorizeEvent("Client call")).toBe("Work");
    expect(categorizeEvent("Holiday", undefined)).toBe("Personal");
  });
});
