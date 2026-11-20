
import Navbar from "./components/Navbar";
import UploadResume from "./components/UploadResume";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <span className="hero-label">
            AI POWERED CAREER ASSISTANT
          </span>

          <h1>
            Make Your Resume
            <br />
            <span>Stand Out.</span>
          </h1>

          <p>
            Analyze your resume with AI, discover missing
            skills and improve your chances of getting
            shortlisted.
          </p>

          <a href="#analyzer" className="hero-button">
            Analyze My Resume
          </a>
        </section>

        <UploadResume />
      </main>

      <footer>
        <p>© 2026 ResumeAI. Built with MERN Stack.</p>
      </footer>
    </>
  );
}

export default App;
