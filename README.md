# IF-js-engine
Internals for a basic interactive fiction engine


#### Special Types

###### Trigger fire

`>>triggername` fires trigger

`>>m>outside` special trigger, fires move to 'outside'

###### Interaction

either a string returned to the reader, or trigger (starts with *)

###### Parsable Description

[[imug01:taken:false==and a mug]]

###### Number States

*++ : increases by 1
*+2 : increase by 2
*-2 : decrease by 2
*-- : decrease by 1

###### State Check

typeof resultstring !== 'string'

then it's an object

for 'exits' must have direction
{
    'onpass': 'outside',
    'onfail': 'Door is closed',
    'req': {
        'rtavern:doorOpen': true
    }
}

eg puzzlebox
{
    'onpass': '>>openpuzzlebox',
    'onfail': 'cannot open puzzlebox yet',
    'req': {
        'puzzle:openedSectionOne': true,
        'puzzle:openedSectionTwo': false,
    }
}



#### Problems
- optional / status driven exits
- containers
- obvious required item in inventory; key->lock, 
- 2 stage interaction; open box, examine
- NPC
- travel to specific room
- always show description?
- already taken item
- trigger switch type
- movement through specific exit fires trigger only first time