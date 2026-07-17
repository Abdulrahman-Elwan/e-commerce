import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        "email": credentials?.email,
                        "password": credentials?.password
                    }),
                    headers: { "content-type": "application/json" }
                })

                const payLoad = await response.json();
                if (payLoad.message === 'success') {
                    const decodedToken: { id: string } = jwtDecode(payLoad.token);
                    return {
                        id: decodedToken.id,
                        user: payLoad.user,
                        token: payLoad.token
                    }
                } else {
                    throw new Error(payLoad.message || 'An error occurred, please try again.')
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    ...user.user,
                    _id: user.id, // <-- خزنه هنا
                };

                token.token = user.token;
            }

            return token;
        },

        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    }
} 