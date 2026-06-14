import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/posts",
    // posts/<slug>/index.md → slug = "<slug>" (instead of "<slug>/index")
    generateId: ({ entry }) =>
      entry.replace(/\.\w+$/, "").replace(/\/index$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date(),
      tags: z.array(z.string()).optional(),
      images: z
        .array(
          z.object({
            src: image(),
            caption: z.string().optional(),
            alt: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

export const collections = { posts };
