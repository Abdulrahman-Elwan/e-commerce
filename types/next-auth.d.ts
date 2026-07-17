import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        user: {
            _id?: string;
            name: string;
            email: string;
            role: string;
        };

        token: string;
    }

    interface Session {
        user: DefaultSession["user"] & {
            _id: string;
            name: string;
            email: string;
            role: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            _id: string;
            name: string;
            email: string;
            role: string;
        };
        token: string;
    }
}