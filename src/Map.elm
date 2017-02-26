module Map exposing (..)

import Dict exposing (Dict)
import Native.Map

type Map key value = Map key value

empty: Map key value
empty =
  Native.Map.empty

singleton: key -> value -> Map key value
singleton =
  Native.Map.singleton

insert: key -> value -> Map key value -> Map key value
insert =
  Native.Map.insert

update: key -> (Maybe value -> Maybe value) -> Map key value -> Map key value
update key fn m =
  case fn (get key m) of
    Nothing -> remove key m
    Just value -> insert key value m

remove: key -> Map key value -> Map key value
remove =
  Native.Map.delete

isEmpty: Map key value -> Bool
isEmpty m =
  size m == 0

size: Map key value -> Int
size =
  Native.Map.size

get: key -> Map key value -> Maybe value
get =
  Native.Map.get

member: key -> Map key value -> Bool
member =
  Native.Map.member

keys: Map key value -> List key
keys =
  Native.Map.keys

values: Map key value -> List value
values =
  Native.Map.values

toList: Map key value -> List (key, value)
toList =
  Native.Map.toList

fromList: List (key, value) -> Map key value
fromList list =
  List.foldl
    (\(key, value) res -> insert key value res)
    res
    list

fromDict: Dict a value -> Map key value
fromDict dict =
  Dict.foldl
    (\key value res -> insert key value res)
    empty
    dict

map: (key -> value -> newValue) -> Map key value -> Map key newValue
map =
  Native.Map.map

fold: (key -> value -> result -> result) -> result -> Map key value -> result
fold =
  Native.Map.fold

filter: (key -> value -> Bool) -> Map key value -> Map key value
filter =
  Native.Map.filter

partition: (key -> value -> Bool) -> Map key value -> (Map key value, Map key value)
partition =
  Native.Map.partition

union: Map key value -> Map key value -> Map key value
union =
  Native.Map.union

intersect: Map key value -> Map key value -> Map key value
intersect =
  Native.Map.intersect

diff: Map key value -> Map key value -> Map key value
diff =
  Native.Map.diff

merge
  :  (key -> value1 -> result -> result)
  -> (key -> value1 -> value2 -> result -> result)
  -> (key -> value2 -> result -> result)
  -> Map key value1
  -> Map key value2
  -> result
  -> result
merge =
  Native.Map.merge
