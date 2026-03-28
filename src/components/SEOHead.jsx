import { Helmet } from "react-helmet-async";

export default function SEOHead({
  title = "Chaipat Jainan - CS Student & Applied LLM Engineer",
  description = "Final-year CS student with research and industry experience in LLM systems, RAG pipelines, and backend engineering. Built production systems at CMU and contributed to joint research at JAIST.",
  keywords = "Chaipat Jainan, LLM Engineer, AI Engineer, Backend Developer, RAG Pipeline, Knowledge Graphs, CMU, JAIST, Flask, AWS, Python",
  ogImage = "https://raw.githubusercontent.com/AppleBoiy/mysite/main/img/profile.jpeg",
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl = "https://chaipat.cc",
  author = "Chaipat Jainan",
  publishedTime = null,
  modifiedTime = null,
}) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Chaipat Jainan Portfolio" />
      
      {/* Article-specific metadata */}
      {ogType === "article" && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {keywords && <meta property="article:tag" content={keywords} />}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:creator" content="@AppleBoiy" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}
