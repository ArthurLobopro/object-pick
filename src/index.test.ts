import { expect, test } from "@jest/globals";
import { clone, pick, pickAll } from ".";

const obj = {
    a: "a",
    b: [1, 2, 3],
};

test("Picking Properties", () => {
    expect(pick(obj, ["b"])).toEqual({ b: [1, 2, 3] });
});

test("Clonning object", () => {
    expect(pickAll(obj)).toEqual(obj);
});

test("Clone value", () => {
    expect(clone(obj)).toEqual(obj);
    expect(clone("a")).toEqual("a");
    expect(clone(10)).toEqual(10);
    expect(clone([obj, "a", 10])).toEqual([obj, "a", 10]);
});

test("Random data api test", () => {
    return fetch("https://random-data-api.com/api/users/random_user")
        .then((data) => data.json())
        .then((fakeData: object) => {
            expect(clone(fakeData)).toEqual(fakeData);
        });
});
