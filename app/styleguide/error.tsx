"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="error-panel">
      <h1 className="h2">Unable to load this page</h1>
      <p>Please try again.</p>
      <button className="btn btn-primary" type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
