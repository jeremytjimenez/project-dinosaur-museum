/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  let longDino = '';
  let longDinoLength = 0;

  for (const dino of dinosaurs) {
    if (dino.lengthInMeters > longDinoLength) {
      longDinoLength = dino.lengthInMeters;
      longDino = dino.name;
    }
  }

  let longDinoLengthFeet = longDinoLength * 3.281;

  const longDinoObj = {};

  if (longDino !== '') {
    longDinoObj[longDino] = longDinoLengthFeet;
  }

  return longDinoObj;

}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  let dinosaur = '';
  let dinosaurPhono = '';
  let dinosaurDesc = '';
  let dinosaurPeriod = '';
  let dinosaurTime = '';

  for (const dino of dinosaurs) {
    if (id === dino.dinosaurId) {
      dinosaur = dino.name;
      dinosaurPhono = dino.pronunciation;
      dinosaurDesc = dino.info;
      dinosaurPeriod = dino.period;
      
      if (dino.mya.length < 2) {
        dinosaurTime = dino.mya[0];
      } else {
        dinosaurTime = dino.mya[1];
      }
    }
  }

  if (dinosaur !== '') {
    return `${dinosaur} (${dinosaurPhono})\n${dinosaurDesc} It lived in the ${dinosaurPeriod} period, over ${dinosaurTime} million years ago.`;
  } else {
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  }
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let dinoArr = [];

  for (const dino of dinosaurs) {
    // if key given does not exist
    if (dino[key] === undefined) {
      if (dino.mya.length < 2) {
        // if dino.mya has only 1 value
        if (dino.mya[0] >= mya - 1 && dino.mya[0] <= mya + 1) {
          dinoArr.push(dino.dinosaurId);
        }
      } else {
        if (mya >= dino.mya[1] && mya <= dino.mya[0]) {
          dinoArr.push(dino.dinosaurId);
        }
      }
    } else {
      if (dino.mya.length < 2) {
        if (dino.mya[0] >= mya - 1 && dino.mya[0] <= mya + 1) {
          dinoArr.push(dino[key]);
        }
      } else {
        if (mya >= dino.mya[1] && mya <= dino.mya[0]) {
          dinoArr.push(dino[key]);
        }
      }
    }
  }

  return dinoArr;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
