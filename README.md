# IF-js-engine
Internals for a basic interactive fiction engine


#### Special Types

###### Trigger fire

`>>T>triggername` fires trigger

`>>M>outside` special trigger, fires move to 'outside'

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

#### TODO

combination interactions
Test open/close door

?? trigger multistate edit

#### Problems
- containers
- obvious required item in inventory; key->lock, 
- 2 stage interaction; open box, examine
- NPC
- travel to specific room
- always show description?
- movement through specific exit fires trigger only first time