"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password");
            setLoading(false);
        } else {
            router.push("/admin");
            router.refresh();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <Zap className="w-6 h-6 fill-current" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">
                            Varsa<span className="text-indigo-400">Admin</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Sign in to Admin Panel</h1>
                    <p className="text-slate-400 mt-2">Enter your credentials to access the CMS</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email</label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="admin@varsaweb.com"
                            required
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Password</label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>

                    <p className="text-center text-sm text-slate-500">
                        <Link href="/" className="text-indigo-400 hover:text-indigo-300">
                            ← Back to website
                        </Link>
                    </p>
                </form>

                <p className="text-center text-xs text-slate-600 mt-6">
                    Demo: admin@varsaweb.com / admin
                </p>
            </div>
        </div>
    );
}
