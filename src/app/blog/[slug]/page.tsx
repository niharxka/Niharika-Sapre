import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDir);
  return files.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(source);

  return {
    title: data.title,
    description: data.description || "Personal blog by Niharika Sapre",
    openGraph: {
      title: data.title,
      description: data.description || "Personal blog by Niharika Sapre",
      url: `https://niharikasapre.com/blog/${slug}`,
    },
  };
}

export default async function PostPage({params}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);

return (
    <main className="min-h-screen bg-[#190f1a] text-white">
      {/* Header/Nav */}
      <header className="site-header">
        <nav className="navbar">
          <div className="nav-left">
            <a className="home" href="/">
              Home
            </a>
          </div>
          <div className="nav-right">
            <a href="#">About</a>
            <a href="#">Projects</a>
            <a href="#">Work</a>
            <a href="/blog">Blog</a>
            <a href="#">Contact</a>
          </div>
        </nav>
      </header>

      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-[#e0b1cb] hover:text-[#c56d9d] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Article */}
      <article className="prose prose-lg prose-invert mx-auto max-w-4xl px-6 py-12
        prose-headings:text-[#e0b1cb] 
        prose-headings:font-bold
        prose-h1:text-5xl
        prose-h1:mb-4
        prose-h2:text-3xl
        prose-h2:mt-12
        prose-h2:mb-4
        prose-p:text-gray-300
        prose-p:leading-relaxed
        prose-a:text-[#e0b1cb] 
        prose-a:no-underline
        prose-a:hover:text-[#c56d9d]
        prose-strong:text-white
        prose-code:text-[#9f86c0]
        prose-code:bg-white/5
        prose-code:px-2
        prose-code:py-1
        prose-code:rounded
        prose-pre:bg-white/5
        prose-pre:border
        prose-pre:border-[#e0b1cb]/20
        prose-blockquote:border-l-[#e0b1cb]
        prose-blockquote:text-gray-400
        prose-li:text-gray-300
        prose-img:rounded-lg
        prose-img:shadow-xl">
        
        <h1>{data.title}</h1>
        <p className="text-gray-500 text-base -mt-2 mb-8 pt-2">{data.date}</p>
        <MDXRemote source={content} />
      </article>
    </main>
  );
}