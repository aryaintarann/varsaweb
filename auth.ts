import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const { email, password } = loginSchema.parse(credentials)

                    // Find user in database
                    const user = await prisma.user.findUnique({
                        where: { email },
                    })

                    if (!user) {
                        return null
                    }

                    // Verify password
                    const isValidPassword = await bcrypt.compare(password, user.password)

                    if (!isValidPassword) {
                        return null
                    }

                    return {
                        id: user.id,
                        name: user.name || "Admin",
                        email: user.email,
                    }
                } catch {
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            if (token.id) {
                session.user.id = token.id as string
            }
            return session
        },
    },
})
