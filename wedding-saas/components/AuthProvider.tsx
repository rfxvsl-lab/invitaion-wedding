"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: any | null;
    loading: boolean;
    isAdmin: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    profile: null,
    loading: true,
    isAdmin: false,
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
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

            if (session?.user) {
                const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
                setProfile(data);
            }

            setLoading(false);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsAdmin(session?.user?.email?.toLowerCase() === "mhmmadridho64@gmail.com");

            if (session?.user) {
                // Ignore check if already on onboarding page to prevent loop
                const currentPath = window.location.pathname;
                if (currentPath === '/onboarding') return;

                const { data: profileData } = await supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
                setProfile(profileData);

                // ONLY redirect to onboarding from Dashboard entry points
                // Editor has its own logic. Don't redirect from arbitrary pages.
                // The root '/' is only checked if exactly '/' (Home page)
                const exactProtectedPages = ['/', '/dashboard', '/dashboard/user'];
                const isProtectedPage = exactProtectedPages.includes(currentPath) || currentPath.startsWith('/dashboard/');

                // Exclude /editor from auto-redirect; it has its own fetch logic
                if (currentPath.startsWith('/editor')) return;

                if (isProtectedPage && (!profileData || !profileData.full_name || !profileData.phone_number)) {
                    router.push('/onboarding');
                }
            } else {
                setProfile(null);
            }

            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, session, profile, loading, isAdmin, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
