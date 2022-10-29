# Curse Cards

## [PROJECT LOGLINE]

[A MORE DETAIED DESCRIPTION OF THE PROJECT, IF NECESSARY]

#### TODO NEXT

- insert words to use
- test it on phone sizes

#### TODO LATER

##### Features

- ? add pop-up rules
- ? add timer

##### Behavior

##### Style

- add sounds
- should I add an image to the back of the card?
- add credit

#### DONE

_0.7.1_

- fix revealed big card in final stage going back down but remaining in final stage if clicking "new round"
- fix replacing big card in final stage going to first player again

_0.7.0_

- add ability to change player names
- style name change form
- change 'Show rules' to 'Shuffle deck'
- add ability to reset and shuffle deck

_0.6.0_

- shuffle deck upon launch
- shuffle deck upon repopulating deck
- start working on Names form

_0.5.0_

- adjust spacing of sub-heading elements
- implement localStorage to store deck, numOfPlayers, currentHand, playerNames, and currentPlayer

_0.4.0_

- add Player count with in-/decrement buttons
- make in-/decrement buttons works
- add Player names button
- add Reset Round button and make it work
- add non-functioning Show Rules button

_0.3.11_

- change card front color to light purple
- test on iPad
- adjust sizing, spacing, box-shadow spread for desktop vs mobile
- style buttons

_0.3.10_

- change cursor to pointer over current cards
- stop empty round from highlighting Player 1
- make buttons react to touch
- restructure big card instructions to add '-' elements ::before and ::after for decoration
- fix New Round button so, when a big card is revealed, it replaces it and starts a new round instead of going to the next player's turn
- fix draw button so it goes to next turn

_0.3.9_

- if in final stage, change "draw" button to "reveal"
- if in final stage, make revealed card go back down into hand upon tapping
- disable drawing if hand is empty
- make it so only current small card can be tapped to draw it

_0.3.8_

- merge 'next turn' and 'put back' into one button; enable after drawing
- use big card as put back/next turn button
- use small cards for draw, optionally

_0.3.7_

- actually fix the animations by refactoring the replaceCard() event listeners with callback functions, removing the {once: true}, and within each one listening to see if it's triggered by the correct event and, if it is, removing the listener and performing the actions

_0.3.6_

- get flip-back animation to trigger the fade-out animation on the big card
  - this will be the death of me
  - this was happening because the two animations I thought were simultaneous technically were not, so the animationend event listener was catching them each separately instead of catching the end of flip-back, like it was supposed to

_0.3.5_

- prevent small cards from saying the phrase
- add logic to make big card text smaller if longest word is a certain length
- add underline to big card text
- play with color schemes

_0.3.4_

- stop top menu bar on ios from being white
- move Draw button to show behind the big card
- add font for Draw
- change color of seen cards in hand

_0.3.3_

- add box-shadow to current card, big and small
- center everything, adjust various layout items
- add radial gradient to background
- fix player name indicator to display properly if at end of round

_0.3.2_

- make cards slide up and down as they fade in and out
  - fix so flipOver animation still works...
  - the specifiers on the .card-fadeIn and -fadeOut classes was making the attributes more specific than the basic .card-flipOver / -flipBack; adding .bigCard.card-flipOver fixed the problem

_0.3.1_

- upon a player's turn starting, enable Next Turn button only after drawing and replacing card
- prevent new round from choosing the last cursed person again via shuffle

_0.3.0_

- make it so currentPlayer can go one higher than actually possible so all cards can be shown as seen; disable "next player" button when this is the case
- grey out Next Turn button after clicking it or upon startup
- add Draw Card button that makes small card disappear, makes big card appear, then makes big card flip over
- add follow-up button when you're done looking at the card that makes big card flip back over, big card disappear, small card reappear, and re-enables Next Turn button
- when big card is still revealed and new round is started, prevent big card from changing before the animation completes

_0.2.0_

- write function to advance to next player
- make cards display with proper text (text is for testing)
- make big card display current card's text
- assign style to cards based on whether they've been seen or not

_0.1.0_

- set up state variables
- add Card component
- write shuffle function
- write drawHand() for New Round button

_0.0.0_

- Initial commit
