import { ship } from "../src/ship.js";

const carrier = ship(2);
carrier.hit();

test('check after 1 hit', () => {
    expect(carrier.isSunk()).toBe(false);
});


carrier.hit();

test('check after 2 hit', () => {
    expect(carrier.isSunk()).toBe(true);
});

carrier.hit();

test('check after sinking', () => {
    expect(carrier.isSunk()).toBe(true);
});
