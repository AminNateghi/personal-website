import { getCollection } from "astro:content";

export async function getPublishedBlogPosts() {
  // Exclude drafts from the public blog.
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const translations = new Map<string, Set<"en" | "fa">>();

  for (const post of posts) {
    const pathParts = post.id.split("/");

    // Expect IDs such as "en/const-by-default".
    if (pathParts.length !== 2 || pathParts[0] !== post.data.lang) {
      throw new Error(`Invalid blog path or language for "${post.id}".`);
    }

    const key = post.data.translationKey;
    const languages = translations.get(key) ?? new Set<"en" | "fa">();

    if (languages.has(post.data.lang)) {
      throw new Error(`Duplicate ${post.data.lang} translation for "${key}".`);
    }

    languages.add(post.data.lang);
    translations.set(key, languages);
  }

  // Every published translation group must contain both languages.
  for (const [key, languages] of translations) {
    if (!languages.has("en") || !languages.has("fa")) {
      throw new Error(
        `Blog post "${key}" must have published en and fa versions.`,
      );
    }
  }

  return posts;
}

export async function getBlogArticlePaths(lang: "en" | "fa") {
  const posts = await getPublishedBlogPosts();

  return posts
    .filter((post) => post.data.lang === lang)
    .map((post) => {
      const slug = post.id.split("/")[1];

      const translatedPost = posts.find(
        (candidate) =>
          candidate.data.translationKey === post.data.translationKey &&
          candidate.data.lang !== lang,
      );

      if (!translatedPost) {
        throw new Error(
          `Missing translation for "${post.data.translationKey}".`,
        );
      }

      const translatedSlug = translatedPost.id.split("/")[1];

      const translatedUrl =
        translatedPost.data.lang === "fa"
          ? `/fa/blog/${translatedSlug}/`
          : `/blog/${translatedSlug}/`;

      return {
        params: { slug },
        props: {
          post,
          translatedUrl,
        },
      };
    });
}
