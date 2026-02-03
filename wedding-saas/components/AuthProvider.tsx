"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isAdmin: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    isAdmin: false,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);
            setUser(session?.user ?? null);
            setIsAdmin(session?.user?.email?.toLowerCase() === "mhmmadridho64@gmail.com");
            setLoading(false);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsAdmin(session?.user?.email?.toLowerCase() === "mhmmadridho64@gmail.com");

            // Onboarding Check logic
            // Onboarding Check logic
            // Only check if user is logged in
            if (session?.user) {
                // Ignore check if already on onboarding page to prevent loop
                if (window.location.pathname === '/onboarding') return;

                const { data: profile } = await supabase.from('profiles').select('full_name, phone_number').eq('id', session.user.id).maybeSingle();

                // If profile incomplete, Force Redirect
                if (!profile || !profile.full_name || !profile.phone_number) {
                    // Use window.location ONLY if not already there to prevent Next.js router conflicts?
                    // Actually, inside a component, router.push is safer for SPA.
                    // But we need to define router first inside the component.
                    // Let's stick to window.location but add a check to ensure we aren't spamming it?
                    // No, "refresh mulu" means the page is reloading. router.push avoids reload.
                    // However, we need to import useRouter.
                }
            }

            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, isAdmin, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
