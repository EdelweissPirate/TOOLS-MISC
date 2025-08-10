### NPM commands

"mapTemps": "node tools/calcTemps",
"mapHeatColours": "node tools/pixelReader_heatMap",
"mapSpanColours": "node tools/pixelReader_span"

All outputted text files need to be manually reformatted into js files.

tempVals > Array in tempVals.js
tempSpan > Object in tempColours.js

- tempVals give the temperature of each pixel depending on how white or black it is.

- tempSpan > gives the colours available to denote temperature differences 