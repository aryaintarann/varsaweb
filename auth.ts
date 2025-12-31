import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

// Minimal config for now
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // Mock auth for now until DB connection is verified
                if (credentials.email === "admin@varsaweb.com" && credentials.password === "admin") {
                    return { id: "1", name: "Admin", email: "admin@varsaweb.com" }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
})
