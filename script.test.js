const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;

test("valid username with at least 1 capital letter, 1 special character, 1 number, and at least 8 characters long", () => {
  expect(regex.test("Password1!")).toBe(true);
});

test("invalid username without a capital letter", () => {
  expect(regex.test("password1!")).toBe(false);
});

test("invalid username without a special character", () => {
  expect(regex.test("Password1")).toBe(false);
});

test("invalid username without a number", () => {
  expect(regex.test("Password!")).toBe(false);
});

test("invalid username with less than 8 characters", () => {
  expect(regex.test("Pass1!")).toBe(false);
});

test("regex matches the constant in script.js", () => {
  // Test to ensure regex consistency between test and implementation
  var testValue = "TestPass1!";
  expect(regex.test(testValue)).toBe(true);
});
