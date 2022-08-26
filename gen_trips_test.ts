import { assertEquals, assertExists } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import { gen_trips } from "./gen_trips.ts";

Deno.test("generate trips", () => {
  const trips = gen_trips(3);
  assertEquals(trips.length, 3);
  assertExists(trips[0].title);
  assertExists(trips[1].image);
  assertExists(trips[2].offset);
});
