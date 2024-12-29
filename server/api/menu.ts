import { z } from 'zod';
import type { Content } from "@prismicio/client";

const schema = z.object({
  ...prismicDocumentSchema,
  data: z.object({
    items: z.object({
      link: prismicUrlField,
      text: z.string()
    }).array()
  })
});

export default defineEventHandler(async (evt) => {
  const data = await allContent();
  const input: Content.MenuDocument = data?.find((item) => 'menu' === item.uid) as any;
  const result = schema.safeParse(input);
  if(result.success) {
    return result.data;
  } else {
    result.error.errors.forEach(err => {
      let tmp = (input || {}) as any;
      let field = err.path[0] as string;
      let value = field in tmp ? tmp[field] : null;
      console.error('Error on field', err.path.join('.'), value);
    });
    // throw new Error('Fatal error for footer fields');
  }
  return null;
});