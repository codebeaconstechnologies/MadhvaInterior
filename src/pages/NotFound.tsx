import Seo from "../components/Seo";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <span className="eyebrow">404</span>
          <h1>This page has moved, or never existed.</h1>
          <p className="lede">Let&rsquo;s get you back to somewhere beautiful.</p>
          <Button to="/" variant="primary">
            Return Home
          </Button>
        </div>
      </section>
    </>
  );
}
