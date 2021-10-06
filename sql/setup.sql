DROP TABLE IF EXISTS campsites;
DROP TABLE IF EXISTS recareas;
DROP TABLE IF EXISTS events;

CREATE TABLE campsites (
    id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    campsitename VARCHAR(128),
    typeofuse VARCHAR(128),
    lat REAL,
    long REAL
);

CREATE TABLE recareas (
    id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recareaname VARCHAR(256),
    recareadescription TEXT,
    recareadirections TEXT,
    lat REAL,
    long REAL
);

CREATE TABLE events (
    id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    entity_id SMALLINT,
    event_name VARCHAR(256),
    description TEXT
)

