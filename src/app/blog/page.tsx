import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

type PostMeta = {
  title: string;
  date: string;
  slug: string;
};

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const files = fs.readdirSync(postsDir);

  const posts: PostMeta[] = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(fileContent);
    return {
      title: data.title,
      date: data.date,
      slug: filename.replace(/\.mdx$/, ""),
    };
  });

return (
    <main className="min-h-screen bg-[#190f1a] text-white">
      {/* Header/Nav - reuse your existing nav */}
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

      {/* Blog Content */}
      <div className="max-w-3xl ml-19 px-6 py-16">
        <h1 className="text-5xl font-bold mb-12 text-[#e0b1cb]">Blog</h1>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <article className="border-b border-[#e0b1cb]/20 pb-6 transition-all hover:border-[#e0b1cb]/60">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#e0b1cb] transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-400">{post.date}</time>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
