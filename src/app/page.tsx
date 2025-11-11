import Image from "next/image";

export default function Home() {
  return (
   <main>
      <header className="site-header">
        <nav className="navbar">
          <div className="nav-left">
            <a className="home" href="#">
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

      <section className="hero">
        <div className="hero__inner">
          {/* LEFT SIDE */}
          <div className="hero__content">
            <h1 className="title">Niharika Sapre</h1>

            <div className="typewrap">
              <ul className="option">
                <li>
                  <span>Designer.</span>
                </li>
                <li>
                  <span>Developer.</span>
                </li>
                <li>
                  <span>Writer.</span>
                </li>
                <li>
                  <span>Creative.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE (IMAGE) */}
          <div className="hero__image">
            <img src="/idphoto.jpg" alt="Portrait of Niharika Sapre" />
            <div className="hero__links">
              <a
                href="https://www.linkedin.com/in/niharikasapre/"
                target="_blank"
                className="btn"
              >
                LinkedIn
              </a>
              <a
                href="mailto:niiharika.sapre@gmail.com"
                target="_blank"
                className="btn btn--secondary"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
