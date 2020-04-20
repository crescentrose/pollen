const getPollen = require('../pollen');
const assert = require('assert');
const sinon = require('sinon');
const axios = require('axios');

describe('getPollen', function() {
  before(function() {
    const mockPrognosis = `<?xml version="1.0"?>
<peludna><grad>Zagreb</grad><biljka><naziv>Hrast</naziv><dan><datum>2020-04-20</datum><vrijednost>visoka</vrijednost></dan><dan><datum>2020-04-21</datum><vrijednost>visoka</vrijednost></dan><dan><datum>2020-04-22</datum><vrijednost>visoka</vrijednost></dan></biljka><biljka><naziv>Breza</naziv><dan><datum>2020-04-20</datum><vrijednost>visoka</vrijednost></dan><dan><datum>2020-04-21</datum><vrijednost>visoka</vrijednost></dan><dan><datum>2020-04-22</datum><vrijednost>visoka</vrijednost></dan></biljka><biljka><naziv>Koprive</naziv><dan><datum>2020-04-20</datum><vrijednost>visoka</vrijednost></dan><dan><datum>2020-04-21</datum><vrijednost>visoka</vrijednost></dan><dan><datum>2020-04-22</datum><vrijednost>visoka</vrijednost></dan></biljka></peludna>
    `;

    sinon.stub(axios, 'get').resolves({data: mockPrognosis})
  });

  it('processes the data', async function() {
    const pollenData = await getPollen();
    assert(pollenData, {
      hrast: {
        '2020-04-20': 'visoka',
        '2020-04-21': 'visoka',
        '2020-04-22': 'visoka'
      },
      breza: {
        '2020-04-20': 'visoka',
        '2020-04-21': 'visoka',
        '2020-04-22': 'visoka'
      },
      kopriva: {
        '2020-04-20': 'visoka',
        '2020-04-21': 'visoka',
        '2020-04-22': 'visoka'
      }
    })
  })
});
