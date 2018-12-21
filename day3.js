const data = require("./data/day3.js");

const tiles = {};
const claimObj = {};
const claims = data.map(val => {
    const myRegexp = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/g;
    const [, id, x, y, width, height ] = myRegexp.exec(val);
    const claim = { id: parseInt(id), x: parseInt(x), y: parseInt(y), width: parseInt(width), height: parseInt(height) };
    claimObj[id] = claim;
    return claim;
});

claims.forEach(({ id, x, y, width, height }) => {
    for (let ny = 0; ny < height; ny++) {
        for (let nx = 0; nx < width; nx++) {
            const tile = `${x + nx},${y + ny}`;
            if (tiles.hasOwnProperty(tile)) {
                tiles[tile].push(id);
            } else {
                tiles[tile] = [id];
            }
        }
    }
});

const conflicts = Array.from(Object.keys(tiles)).filter(id => tiles[id].length > 1);

console.log(`Part 1 answer`, conflicts.length);

const conflictingIds = conflicts
    .map(key => tiles[key])
    .reduce((memo, val) => {
        val.forEach(id => !memo.includes(id) && memo.push(id));
        return memo;
    }, []);

const noConflict = claims.find(({ id }) => !conflictingIds.includes(id));
console.log(`Part 2 answer`, noConflict.id);