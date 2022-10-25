Curse Cards

## [PROJECT LOGLINE]

[A MORE DETAIED DESCRIPTION OF THE PROJECT, IF NECESSARY]

#### TODO NEXT

- enable Next Turn button after replacing card

#### TODO LATER

##### Features

- upon a player's turn starting, disable the ability to go to the next player's turn until current player has seen their card; maybe use same button
- add ability to finish turn and set up next turn via button
- add reveal current phrase button
- add skip button
- add localStorage to store deck state, current hand, current player, numOfPlayers, if current phrase is revealed
- add ability to reset deck
- ? add ability to shuffle deck

##### Behavior

- prevent new round from choosing the last cursed person again via shuffle

##### Style

- add credit

#### DONE

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
