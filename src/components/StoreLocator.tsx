import React from "react";

export function StoreLocator() {
  return (
    <div className="min-h-screen md:ml-48">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-artistic-accent mb-4">
          Find a repair hub
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-4">
          Store Locator
        </h1>
        <p className="text-zinc-300 max-w-2xl">
          Use this page to add live store finder logic or map integrations for nearby repair centers.
        </p>
      </div>
    </div>
  );
}
