import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function Cart() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="min-h-screen md:ml-48">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-artistic-accent mb-4">
            Repair Kit
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-3">
            Cart
          </h1>
          <p className="text-zinc-300">
            Review your selected parts and continue to checkout when ready.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="border border-artistic-border bg-zinc-950/60 p-8">
            <p className="text-zinc-200 mb-6">Your cart is empty right now.</p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-artistic-accent text-black px-4 py-2 font-bold uppercase text-[10px] tracking-widest"
            >
              Browse parts
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border border-artistic-border bg-zinc-950/60 p-4 flex flex-col sm:flex-row gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover grayscale border border-artistic-border"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{Math.round(item.price * 80).toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-zinc-500">per unit</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <label className="text-xs uppercase tracking-widest text-zinc-400">Qty</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-20 border border-artistic-border bg-black px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs uppercase tracking-widest text-artistic-accent hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="border border-artistic-border bg-zinc-950/60 p-6 self-start">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-artistic-border pt-3">
                  <span>Total</span>
                  <span>₹{Math.round(total * 80).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full border border-artistic-border px-4 py-3 text-xs uppercase tracking-widest hover:bg-zinc-900"
                >
                  Clear cart
                </button>
                <Link
                  to="/shop"
                  className="block text-center border border-artistic-border px-4 py-3 text-xs uppercase tracking-widest hover:bg-zinc-900"
                >
                  Continue shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
