const Card = require('./card');

let card = new Card.Card('solid', 'bean', 'red', 1);
let card1 = new Card.Card('stripped', 'bean', 'red', 2);
let card2 = new Card.Card('empty', 'bean', 'red', 3);
let card3 = new Card.Card('stripped', 'diamond', 'red', 3);
let cardDeck = [];
let cardLookupTable = [];

/* checks if card is solid */
test('checks if card is solid', () => {
  expect(card.pattern).toBe('solid');
});

/* checks if card is bean */
test('checks if card is a bean', () => {
  expect(card.shape).toBe('bean');
});

/* checks if card is red */
test('checks if card is red', () => {
  expect(card.color).toBe('red');
});

/* checks if card is 1 */
test('checks if card is 1', () => {
  expect(card.number).toBe(1);
});

/* card, card1, card2 have matching attribute shape */
test('card, card1, card2 have matching attribute shape', () => {
  expect(card.matching_attribute(card1, card2, 'shape')).toBe(true);
});

/* card, card1, card3 do not have matching attribute shape */
test('card, card1, card3 do not have matching attribute shape', () => {
  expect(card.matching_attribute(card1, card3, 'shape')).toBe(false);
});

/* card, card1, card2 are a set */
test('card, card1, card2 are a set', () => {
  expect(card.matching_set(card1, card2)).toBe(true);
});

/* card, card1, card3 are not a set */
test('card, card1, card3 are not a set', () => {
  expect(card.matching_set(card1, card3)).toBe(false);
});

/* Card deck is 81 length */
test('Card deck is 81 length', () => {
  Card.generateDeck(cardDeck);
  expect(cardDeck.length).toBe(81);
})

/* Card lookup table enumerates card_ids */
test('Card lookup table enumerates card_ids', () => {
  Card.generateCardLookup(cardLookupTable)
  expect(cardLookupTable.length).toBe(82);
  expect(cardLookupTable[0]).toBe(undefined);
})
