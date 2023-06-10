## ladder 
## 1

move ladder
use ladder 

## 2

place ladder 
lean ladder
use ladder on wall
place ladder against wall
lean ladder against wall

## 3
use old ladder on wall


["combine", "red", "ladder", "with", "green", "wall"]
["red", "ladder", "with", "green"]
indx = 2
splitIndex = 2 + 1 = 3

0 -> 3 ["combine", "red", "ladder"]
4 - 6 ["green", "wall"]

Try
["combine", "red", "ladder"]
[ "red", "ladder"]
["ladder"]
["green", "wall"]
["wall"]

If Both Objects
    If combinable
        combine
    Else
        These objects cannot be combined
Else
    Can't find A/B or can't find either