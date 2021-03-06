-- Deploy omur:init to pg

BEGIN;

-- on crèe un domaine pint, qui implique la nécessité que la VALUE soit supérieure à 0
CREATE DOMAIN pint AS int CHECK(VALUE > 0);

-- on crée un domaine mail avec une regex pour vérifier que le texte correspond bien au format mail attendu
CREATE DOMAIN mail AS text CHECK(VALUE ~ '.*@[a-z0-9\-]+(\.[a-z]{1,63})?[[:alpha:]]{1,3}');

-- on crèe nos tables
CREATE TABLE wall (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    title_color TEXT,
    description TEXT,
    photo TEXT,
    pdf TEXT,
    owner_id INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()    
);

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email mail NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()  
);

ALTER TABLE "wall"
  ADD FOREIGN KEY ("owner_id") REFERENCES "user" ("id") ON DELETE CASCADE;

CREATE TABLE "column" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    position INTEGER,
    wall_id INTEGER NOT NULL REFERENCES wall(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()  
);

CREATE TABLE element (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    position INTEGER,
    link TEXT,
    src TEXT,
    wall_id INTEGER NOT NULL REFERENCES wall(id) ON DELETE CASCADE,
    column_id INTEGER REFERENCES "column" ("id") ON DELETE CASCADE,
    owner_id INTEGER NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()  
);

CREATE TABLE participate (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    wall_id INTEGER NOT NULL REFERENCES wall(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()  
);



COMMIT;
