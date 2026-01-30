import { InvitationData } from '../types/invitation';

export const mapToTemplateData = (data: InvitationData) => {
    // Default Fallback
    if (!data || !data.content) return null;

    const { content, metadata, engagement } = data;

    // Helper to pass through the date string if it exists, otherwise return current date
    const safeDate = (dateStr: string) => {
        return dateStr || new Date().toISOString();
    };

    return {
        metadata: {
            title: "The Wedding",
            theme_color: "#A48874", // Default, could be dynamic
            music_url: metadata?.music_url || ""
        },
        hero: {
            // Try to split the nicknames field first (e.g. "Romeo & Juliet")
            // If not available, fall back to parsing the full names
            bride_nickname: (() => {
                if (content.hero?.nicknames && content.hero.nicknames.includes('&')) {
                    return content.hero.nicknames.split('&')[1].trim();
                }
                return content.couples?.wanita?.name?.split(' ')[0] || "Bride";
            })(),
            groom_nickname: (() => {
                if (content.hero?.nicknames && content.hero.nicknames.includes('&')) {
                    return content.hero.nicknames.split('&')[0].trim();
                }
                return content.couples?.pria?.name?.split(' ')[0] || "Groom";
            })(),
            main_image_url: content.hero?.main_image || "https://placehold.co/600x800",
            wedding_date_time: safeDate(content.hero?.date) // Template expects ISO/Date-able string
        },
        quotes: {
            title: "We Found Love",
            content: "And over all these virtues put on love, which binds them all together in perfect unity.",
            source: "Colossians 3:14"
        },
        couple: {
            groom: {
                full_name: content.couples?.pria?.name || "Groom Name",
                parent_names: content.couples?.pria?.parents || "Parents Name",
                instagram_handle: content.couples?.pria?.ig?.replace('@', '') || "",
                photo_url: content.couples?.pria?.photo || "https://placehold.co/400x400"
            },
            bride: {
                full_name: content.couples?.wanita?.name || "Bride Name",
                parent_names: content.couples?.wanita?.parents || "Parents Name",
                instagram_handle: content.couples?.wanita?.ig?.replace('@', '') || "",
                photo_url: content.couples?.wanita?.photo || "https://placehold.co/400x400"
            }
        },
        events: {
            akad: {
                date: content.events?.akad?.date, // Keep original string for display if template permits, but template uses new Date() sometimes.
                // Wait, ModernArch uses: new Date(invitation.events.akad.date) ? No, ModernArch uses it as string in one place: 
                // <p ...>{invitation.events.akad.date}</p>
                // So passing the string is fine.
                // EXCEPT in `hero.wedding_date_time` where it does `new Date(...)`.

                time: content.events?.akad?.time,
                location_name: content.events?.akad?.venue,
                address: content.events?.akad?.address,
                map_url: content.events?.akad?.map_url
            },
            resepsi: {
                date: content.events?.resepsi?.date,
                time: content.events?.resepsi?.time,
                location_name: content.events?.resepsi?.venue,
                address: content.events?.resepsi?.address,
                map_url: content.events?.resepsi?.map_url
            }
        },
        gallery: {
            images: content.gallery?.images || [],
            video_url: content.gallery?.video_url || ""
        },
        gifts: {
            bank_accounts: engagement?.gifts?.map(g => ({
                bank_name: g.bank,
                account_number: g.acc_number,
                holder_name: g.holder
            })) || [],
            address_for_gifts: ""
        }
    };
};
