PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE col (
    id              integer primary key,
    crt             integer not null,
    mod             integer not null,
    scm             integer not null,
    ver             integer not null,
    dty             integer not null,
    usn             integer not null,
    ls              integer not null,
    conf            text not null,
    models          text not null,
    decks           text not null,
    dconf           text not null,
    tags            text not null
);
INSERT INTO col VALUES(1,1332961200,1398130163295,1398130163168,11,0,0,0,'<%- configuration %>','<%- models %>','<%- decks %>','<%- deckConfiguration %>','{}');
CREATE TABLE notes (
    id              integer primary key,   /* 0 */
    guid            text not null,         /* 1 */
    mid             integer not null,      /* 2 */
    mod             integer not null,      /* 3 */
    usn             integer not null,      /* 4 */
    tags            text not null,         /* 5 */
    flds            text not null,         /* 6 */
    sfld            text not null,         /* 7 */
    csum            integer not null,      /* 8 */
    flags           integer not null,      /* 9 */
    data            text not null          /* 10 */
);

<% for (var i = 0; i < notes.length; i++) {%>
INSERT INTO notes VALUES(
    <%- Number(notes[i].id) %>,
    '<%- notes[i].guid %>',
    <%- Number(notes[i].modelId) %>,
    <%- Number(now) %>,
    -1,
    '<%- notes[i].tags %>',
    '<%- notes[i].fields[0] %><%- "\x1f" %><%- notes[i].fields[1] %>',
    '<%- notes[i].firstField %>',
    <%- Number(notes[i].checksum) %>,
    0,
    '');
<% } %>

CREATE TABLE cards (
    id              integer primary key,   /* 0 */
    nid             integer not null,      /* 1 */
    did             integer not null,      /* 2 */
    ord             integer not null,      /* 3 */
    mod             integer not null,      /* 4 */
    usn             integer not null,      /* 5 */
    type            integer not null,      /* 6 */
    queue           integer not null,      /* 7 */
    due             integer not null,      /* 8 */
    ivl             integer not null,      /* 9 */
    factor          integer not null,      /* 10 */
    reps            integer not null,      /* 11 */
    lapses          integer not null,      /* 12 */
    left            integer not null,      /* 13 */
    odue            integer not null,      /* 14 */
    odid            integer not null,      /* 15 */
    flags           integer not null,      /* 16 */
    data            text not null          /* 17 */
);
<% for (var i = 0; i < cards.length; i++) {%>
INSERT INTO cards VALUES(
    <%- Number(cards[i].id) %>,
    <%- Number(cards[i].noteId) %>,
    <%- Number(cards[i].deckId) %>,
    0,
    <%- Number(now) %>,
    -1,
    0,
    0,
    484332854,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    '');
<% } %>

CREATE TABLE revlog (
    id              integer primary key,
    cid             integer not null,
    usn             integer not null,
    ease            integer not null,
    ivl             integer not null,
    lastIvl         integer not null,
    factor          integer not null,
    time            integer not null,
    type            integer not null
);
CREATE TABLE graves (
    usn             integer not null,
    oid             integer not null,
    type            integer not null
);
ANALYZE sqlite_master;
INSERT INTO "sqlite_stat1" VALUES('col',NULL,'1');
CREATE INDEX ix_notes_usn on notes (usn);
CREATE INDEX ix_cards_usn on cards (usn);
CREATE INDEX ix_revlog_usn on revlog (usn);
CREATE INDEX ix_cards_nid on cards (nid);
CREATE INDEX ix_cards_sched on cards (did, queue, due);
CREATE INDEX ix_revlog_cid on revlog (cid);
CREATE INDEX ix_notes_csum on notes (csum);
COMMIT;
