/* 
A Card class that represents a Set Card and provides methods with operating on Cards.
*/
class Card {
    /*
    Constructs a card.
    Requires:
        pattern in ['solid', 'striped', 'empty'], shape in ['bean', 'diamond', 'oval'], color 
        in ['red', 'purple', 'green'].
    */
    constructor(pattern, shape, color, number) {
        this.pattern = pattern;
        this.shape = shape;
        this.color = color;
        this.number = number;
    }

    /* 
    Checks if this.attribute is all same or all different as card1.attribute, card2.attribute
    Requires:
        Card1, Card2 is instance of Card.
        attribute is in [pattern, shape, color, number].
    Returns: 
        if this.attribute is all same or all different as card1.attribute, card2.attribute 
            true
        else 
            false
    */
    matching_attribute(card1, card2, attribute) {
        if ((this[attribute] == card1[attribute]) &&  (this[attribute] == card2[attribute])) {
            return true;
        }
        if ((this[attribute] != card1[attribute]) &&  (this[attribute] != card2[attribute]) &&  (card1[attribute] != card2[attribute]) ) {
            return true;
        }
        return false;
    }

    /* 
    Checks if this is in a valid set with card1, card2
        Requires:
        Card1, Card2 is instance of Card.
        attribute is in [pattern, shape, color, number].
    Returns: 
        if this is in a valid set with card1, card2
            true
        else 
            false
    */
    matching_set(card1, card2) {
        for (var attr in this) {
            if (!this.matching_attribute(card1, card2, attr)) {
                return false;
            }
        }
        return true;
    }

}

/*
Removes card-display element of all children
Requires:
    document.getElementById('card-display') exists.
Ensures:
    document.getElementById('card-display').children.length == 0.
*/
function cleanCardDisplay() {
    cardDisplay = document.getElementById('card-display');
    /* iterates through each child and removes */
    while (cardDisplay.firstChild) {
        cardDisplay.removeChild(cardDisplay.firstChild);
    }
}

/*
Given a card_id, creates image node with image associated from www.setgame.com assets. 
Requires:
    1 <= card_id <= 81
*/
function makeCardImg(card_id) {
    let card_img = document.createElement('img');
    card_img.classList.add('card-img');
    /* goes to setgame and finds associated card. */
    card_img.setAttribute('src', 'https://www.setgame.com/sites/all/modules/setgame_set/assets/images/new/' + card_id + '.png');
    card_img.setAttribute('alt', 'card-' + card_id);
    return card_img;
}

/*
Given a card_id, creates a card div with the card id, associated card info, and image.
Requires:
    1 <= card_id <= 81
*/
function makeCardDiv(card_id){
    /* makes card div */
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', card_id);
    /* append associated image of the card */
    card.appendChild(makeCardImg(card_id));
    card.onclick = function(){ selectCard(card_id); };
    document.getElementById('card-display').appendChild(card);
}

/*
Makes cardDeck an array of randomly sorted card ids
Ensures:
    for i in cardDeck, 1 <= i <= 81 and cardDeck is randomly sorted. 
*/
function generateDeck() {
    /* puts all ids in array */
    for(let i = 1; i < 82; i++) {
        cardDeck.push(i);
    }
    /* randomizes order */
    cardDeck.sort((a, b) => 0.5 - Math.random());
}

/*
Makes cardLookupTable an array of card objects, where each index = the associated card id.
*/
function generateCardLookup() {
    card_id = 1;
    pattern_list = ['solid', 'striped', 'empty'];
    shape_list = ['bean', 'diamond', 'oval'];
    color_list = ['red', 'purple', 'green'];
    /* found out how www.setgame.com enumerated their cards and followed the same pattern to generate ids. */
    for(let pattern = 0; pattern < 3; pattern++) {
        for(let shape = 0; shape < 3; shape++) {
            for(let color= 0; color < 3; color++) {
                for(let number=0; number < 3; number++) {
                    /* adds generated card object in the array slot associated with the appropriate card id. */
                    cardLookupTable[card_id] = new Card(pattern_list[pattern], shape_list[shape], color_list[color], number+1);
                    card_id++;
                }
            }
        }
    }
}
