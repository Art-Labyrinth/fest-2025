import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-130px)] flex flex-col items-center justify-center font-deledda text-brown gap-6">
      <div className="text-8xl font-bold opacity-20">404</div>
      <Link to="/" className="underline hover:opacity-60">← На главную</Link>
    </main>
  );
}
