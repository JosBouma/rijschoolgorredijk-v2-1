import { repositoryName } from '../../slicemachine.config.json';
import { Client, type PrismicDocument } from "@prismicio/client";
import { string, z } from 'zod';

export const prismicDocumentSchema = {
  uid: z.string(),
  first_publication_date: z.coerce.date(),
  last_publication_date: z.coerce.date(),
};

export const prismicUrlField = z
  .object({
    url: z.string().url().nullable().optional(),
    link_type: z.string().nullable(),
    uid: z.string().nullable().optional(),
  })
  .transform((data) => ({
    ...data,
    url: data.url ? data.url : null
  }))
  .optional();

export const prismicImageField = z
  .object({
    url: z.string().url().optional(),
    alt: string().nullable(),
    dimensions: z.object({
      width: z.number(),
      height: z.number()
    })
    .nullable()
  })
  .transform((data) => ({
    ...data,
    url: data.url ? data.url : null
  }));

export const prismicRichTextField = z
  .object({
    type: z.string(),
    text: z.string(),
    spans: z.any().array(),
  })
  .array();

export const allContent = defineCachedFunction(
  async () => {
    let data: PrismicDocument<Record<string, any>, string, string>[] | null = null;
    try {
      data = await new Client(repositoryName).dangerouslyGetAll();
      if (0 === data.length) {
        throw Error('No documents');
      }
    } catch (e) {
      console.error('Fatal prismic error', e);
    }
    return data;
  },
  {
    maxAge: 60 * 60,
    name: 'allContent',
    getKey: () => repositoryName,
  }
);