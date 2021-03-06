const DECK_ID = 42;
const MODEL_ID = 1342697561419;

const configuration = {
  nextPos: 1,
  estTimes: true,
  activeDecks: [ 1 ],
  sortType: 'noteFld',
  timeLim: 0,
  sortBackwards: false,
  addToCur: true,
  curDeck: 1,
  newBury: true,
  newSpread: 0,
  dueCounts: true,
  curModel: '1398130163168',
  collapseTime: 1200
};

const models = {
  [MODEL_ID]: {
    vers: [],
    name: 'Basic',
    tags: [],
    did: 1398130078204,
    usn: -1,
    req: [
      [
        0,
        "all",
        [
          0
        ]
       ]
     ],
    flds: [
      {
        "name":"Front",
        "rtl":false,
        "sticky":false,
        "media": [],
        "ord":0,
        "font":"Arial",
        "size":12
      },
      {
        "name":"Back",
        "rtl":false,
        "sticky":false,
        "media":[],
        "ord":1,
        "font":"Arial",
        "size":12
      }
    ],
    sortf: 0,
    latexPre: '\\\\documentclass[12pt]{article}\n\\\\special{papersize=3in,5in}\n\\\\usepackage{amssymb,amsmath}\n\\\\pagestyle{empty}\n\\\\setlength{\\\\parindent}{0in}\n\\\\begin{document}\n',
    tmpls: [{
      "name":"Forward",
      "qfmt":"{{Front}}",
      "did":null,
      "bafmt":"",
      "afmt":"{{FrontSide}}\n\n<hr id=answer/>\n\n{{Back}}",
      "ord":0,
      "bqfmt":""
    }],
    latexPost: '\\\\end{document}',
    type: 0,
    id: 1342697561419,
    css: '.card {\n font-family: arial;\n font-size: 30px;\n text-align: center;\n color: black;\n background-color: white;\n}\n\n.card1 { background-color: #FFFFFF; }',
    mod: 1398130117
  }
}

const decks = (deckName) => {
  return {
    1: {
      desc: '',
      name: 'Default',
      extendRev: 50,
      usn: 0,
      collapsed: false,
      newToday: [ 0, 0 ],
      timeToday: [ 0, 0 ],
      dyn: 0,
      extendNew: 10,
      conf: 1,
      revToday: [ 0, 0 ],
      lrnToday: [ 0, 0 ],
      id: 1,
      mod: 1398130160
    },
    [DECK_ID]: {
      desc: '',
      name: deckName,
      extendRev: 50,
      usn: -1,
      collapsed: false,
      newToday: [ 754, 0 ],
      timeToday: [ 754, 0 ],
      dyn: 0,
      extendNew: 10,
      conf: 1,
      revToday: [ 754, 0 ],
      lrnToday: [ 754, 0 ],
      id: 1398130078204,
      mod: 1398130140
    }
  }
}

const deckConfiguration = {
  1: {
    name: 'Default',
    replayq: true,
    lapse: {
      leechFails: 8,
      minInt: 1,
      delays: [
        10
      ],
      leechAction: 0,
      mult: 0
    },
    rev: {
      perDay: 100,
      fuzz: 0.05,
      ivlFct: 1,
      maxIvl: 36500,
      ease4: 1.3,
      bury: true,
      minSpace: 1
    },
    timer: 0,
    maxTaken: 60,
    usn: 0,
    new: {
      perDay: 20,
      delays: [
        1,
        10
      ],
      separate: true,
      ints: [
        1,
        4,
        7
      ],
      initialFactor: 2500,
      bury: true,
      order: 1
    },
    mod: 0,
    id: 1,
    autoplay: true
  }
}

module.exports = {
  DECK_ID: DECK_ID,
  MODEL_ID: MODEL_ID,
  configuration: configuration,
  deckConfiguration: deckConfiguration,
  decks: decks,
  models: models
};
