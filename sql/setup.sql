DROP TABLE IF EXISTS campsites;

CREATE TABLE campsites (
    id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    campsitename VARCHAR(128),
    typeofuse VARCHAR(128),
    lat REAL,
    long REAL
)
