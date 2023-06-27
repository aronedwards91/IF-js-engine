# IF-js-engine
Internals for a basic interactive fiction engine


#### Special Types

###### Trigger fire

`>>T>triggername` fires trigger

`>>M>outside` special trigger, fires move to 'outside'

###### Interaction

either a string returned to the reader, or trigger (starts with *)

###### Parsable Description TODO

[[imug01:taken:false==and a mug]]

###### Number States

`>+>1` : increases by 1
`>+>2` : increase by 2
`>->2` : decrease by 2
`>*>2` : double

###### State Check

typeof resultstring !== 'string'

then it's an object

for 'exits' must have direction
{
    'onPass': 'outside',
    'onFail': 'Door is closed',
    'req': {
        'rtavern:doorOpen': true
    }
}

eg puzzlebox
{
    'onPass': '>>T>openpuzzlebox',
    'onFail': 'cannot open puzzlebox yet',
    'req': {
        'puzzle:openedSectionOne': true,
        'puzzle:openedSectionTwo': false,
    }
}

#### Numerical

{
    'onPass': 'outside',
    'onFail': 'Door is closed',
    'req': {
        'ibox:val:>=': 5
    }
}

  smaller "<",
  bigger ">",
  smallerOrEq "<=",
  biggerOrEq ">=",

#### TODO

parseable text
search TODO's

#### Future Problems
- containers
- trigger multistate edit
- obvious required item in inventory; key->lock, 
- NPC
- travel to specific room (across rooms?)
- movement through specific exit fires trigger only first time

#### Limitations
 - Item max three word description?