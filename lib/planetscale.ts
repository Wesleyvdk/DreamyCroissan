import 'server-only';
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface Author {
  id: string;
  author: string;
  age: number;
  about: string;
  
}

interface Story {
    id: Generated<number>;
    name: string;
    author: string;
    author_id: string;
    story: string;
    date_created: string;
    description: string;
}


interface Database {
  authors: Author;
  stories: Story;
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
