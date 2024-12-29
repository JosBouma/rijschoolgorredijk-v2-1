import { z } from 'zod';
import type { Content } from "@prismicio/client";

const schema = z.object({
  ...prismicDocumentSchema,
  data: z.object({
    email_link: prismicUrlField,
    email_text: z.string(),
    facebook: prismicUrlField,
    instagram: prismicUrlField,
    telephone_link: prismicUrlField,
    telephone_text: z.string(),
    image: prismicImageField,
    termsconditions: prismicUrlField,
    privacystatement: prismicUrlField,
    opening_hours: z.any(),
  })
}).nullable();

export default defineCachedEventHandler(async (evt) => {
  const data = await allContent();
  const input: Content.FooterDocument = data?.find((item) => 'footer' === item.uid) as any;
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
}, {
  maxAge: 60 * 60
});