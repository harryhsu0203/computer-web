import Link from 'next/link';
import { ShoppingCart, LogIn } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40">
      <div className="glass border-b border-white/10">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-[var(--font-display)] text-gradient text-lg tracking-wide">凱銓科技商行</span>
            <span className="hidden sm:inline text-xs text-white/60">KAICHUAN 3C</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/products" className="px-3 py-1.5 rounded-md text-white/90 hover:bg-white/10">商品</Link>
            <Link href="/admin" className="px-3 py-1.5 rounded-md text-white/90 hover:bg-white/10">後台</Link>
            <Link href="/login" className="px-3 py-1.5 rounded-md text-white/90 hover:bg-white/10 flex items-center gap-1">
              <LogIn size={16} /> 登入
            </Link>
            <Link href="/cart" className="ml-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-white flex items-center gap-1">
              <ShoppingCart size={16} /> 購物車
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}


