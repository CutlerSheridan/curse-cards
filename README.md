# Curse Cards

## [PROJECT LOGLINE]

[A MORE DETAIED DESCRIPTION OF THE PROJECT, IF NECESSARY]

#### TODO NEXT

- style it up a bit

#### TODO LATER

##### Features

- add reveal current phrase button at end of round
- add ability to change number of players
- add skip button
- add localStorage to store deck state, current hand, current player, numOfPlayers, if current phrase is revealed
- add ability to reset deck
- ? add player names
- ? add ability to shuffle deck
- ? add timer

##### Behavior

- change "new round" button to say "end round" unless currentPlayer === numOfPlayers + 1
- merge 'next turn' and 'put back' into one button; enable after drawing; make sure small card doesn't reappear before animation finishes

##### Style

- add credit

#### DONE

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
