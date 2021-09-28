DROP TABLE IF EXISTS campsites;

CREATE TABLE campsites (
    id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    campsiteName VARCHAR(128),
    typeOfUse VARCHAR(128),
    lat REAL,
    long REAL
)
