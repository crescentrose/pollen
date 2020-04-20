const parseXml = require('xml2js').parseStringPromise;
const axios = require('axios');

const API_URL = 'http://www.stampar.hr/sites/default/files/uploads/peludnaformatirano/peludna_zagreb.xml';

function getPollen() {
  return axios.get(API_URL)
    .catch(err => {throw new Error('Pollen API is down.')})
    .then(body => parseXml(body.data.trim()))
    .then(json => process(json));
}

function process(json) {
  plants = {};
  json.peludna.biljka.forEach(plant => {
    plants[plant.naziv[0].toLowerCase()] = processDays(plant.dan);
  });
  return plants;
}

function processDays(days) {
  prognosis = {};
  days.forEach(day => {
    prognosis[day.datum[0]] = day.vrijednost[0];
  });
  return prognosis;
}

module.exports = getPollen
