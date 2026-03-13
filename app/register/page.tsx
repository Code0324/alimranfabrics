"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Lock, Mail, Eye, EyeOff, User, AlertCircle } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  const { register, isLoading, error, token } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (token) router.replace(redirect);
  }, [token, router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    if (!name.trim()) return setLocalError("Please enter your name.");
    if (!email.trim()) return setLocalError("Please enter your email.");
    if (password.length < 8) return setLocalError("Password must be at least 8 characters.");
    try {
      await register(name.trim(), email.trim(), password);
      router.replace(redirect);
    } catch {
      // error is set in authStore
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 pt-28 md:pt-32 pb-12">
      <Link href="/" className="font-playfair text-2xl font-bold mb-8" style={{ color: "#CC0000" }}>
        Al Imran Fabrics
      </Link>

      <div className="bg-white border border-[#E0D8CC] w-full max-w-md p-8">
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#FFE500" }}>
            <User className="w-5 h-5" style={{ color: "#CC0000" }} />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-charcoal">Create Account</h1>
          <p className="font-inter text-sm text-charcoal/50 mt-1">Join Al Imran Fabrics today</p>
        </div>

        {displayError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 mb-5 rounded text-sm font-inter text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-inter text-xs text-charcoal/50 uppercase tracking-wide mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aisha Khan"
                autoComplete="name"
                className="w-full border border-[#E0D8CC] pl-10 pr-3 py-2.5 font-inter text-sm text-charcoal
                           focus:outline-none focus:border-[#CC0000] transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-inter text-xs text-charcoal/50 uppercase tracking-wide mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full border border-[#E0D8CC] pl-10 pr-3 py-2.5 font-inter text-sm text-charcoal
                           focus:outline-none focus:border-[#CC0000] transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-inter text-xs text-charcoal/50 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                className="w-full border border-[#E0D8CC] pl-10 pr-10 py-2.5 font-inter text-sm text-charcoal
                           focus:outline-none focus:border-[#CC0000] transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal transition"
                tabIndex={-1}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-inter font-semibold text-sm uppercase tracking-wide transition disabled:opacity-60 mt-2"
            style={{ backgroundColor: "#FFE500", color: "#CC0000" }}
          >
            {isLoading ? "Creating Account…" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-inter text-sm text-charcoal/50">
            Already have an account?{" "}
            <Link href={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="font-semibold underline" style={{ color: "#CC0000" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
