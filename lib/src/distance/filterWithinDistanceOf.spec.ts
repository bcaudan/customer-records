import filterWithinDistanceOf from "./filterWithinDistanceOf";

describe("filterWithinDistanceOf", () => {
  const DUBLIN = { latitude: 53.339428, longitude: -6.257664 };
  const PARIS = { latitude: 48.875786, longitude: 2.370994 };
  // actual distance between the two is 779.61 km

  it("should keep coordinates where distance to origin is lower than max distance", () => {
    const result = filterWithinDistanceOf([PARIS], 780, DUBLIN);
    expect(result.length).toBe(1);
  });

  it("should reject coordinates where distance to origin is greater than max distance", () => {
    const result = filterWithinDistanceOf([PARIS], 779, DUBLIN);
    expect(result.length).toBe(0);
  });
});
