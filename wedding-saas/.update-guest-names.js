#!/usr/bin/env node
/**
 * Batch update script for adding guest names to all remaining templates
 * This documents the pattern to apply to each template
 */

const TEMPLATE_UPDATES = {
    'DarkLuxury.tsx': {
        prop: "const DarkLuxuryTemplate = ({ data, guestName = \"Tamu Undangan\" }: { data: InvitationData; guestName?: string }) => {",
        font: "Great Vibes",
        insertBefore: "invitation.texts.open_button"
    },
    'PremiumPeppy.tsx': {
        prop: "const PremiumPeppy: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = \"Tamu Undangan\" }) => {",
        font: "Grand Hotel",
        insertBefore: "invitation.texts.open_button"
    },
    'GamerQuest.tsx': {
        prop: "const GamerQuest: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = \"Tamu Undangan\" }) => {",
        font: "Orbitron",
        insertBefore: "open_button"
    },
    'ElegantVanilla.tsx': {
        prop: "const ElegantVanilla: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = \"Tamu Undangan\" }) => {",
        font: "Playfair Display",
        insertBefore: "open_button"
    },
    'RoyalGlass.tsx': {
        prop: "export default function RoyalGlass({ data, guestName = \"Tamu Undangan\" }: { data: InvitationData; guestName?: string }) {",
        font: "Cormorant Garamond",
        insertBefore: "Open Invitation"
    },
    'NetflixLuxury.tsx': {
        prop: "const NetflixLuxury: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = \"Tamu Undangan\" }) => {",
        font: "Martel Sans",
        insertBefore: "open_button"
    },
    'GrandBallroom.tsx': {
        prop: "const GrandBallroom: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = \"Tamu Undangan\" }) => {",
        font: "Cinzel",
        insertBefore: "open_button"
    },
    'RoyalArabian.tsx': {
        prop: "const RoyalArabian: React.FC<{ data: InvitationData; guestName?: string }> = ({ data, guestName = \"Tamu Undangan\" }) => {",
        font: "Cinzel",
        insertBefore: "open_button"
    }
};

// Pattern for guest name display (to insert before open button):
/*
{/* Guest Name *\/}
<div className="mb-8">
  <p className="font-[BODYFONT] text-xs text-[COLOR] italic mb-1">Kepada Yth,</p>
  <p className="font-[HEADFONT] text-lg font-semibold text-[PRIMARYCOLOR]">{guestName}</p>
</div>
*/

console.log('Templates remaining:', Object.keys(TEMPLATE_UPDATES).length);
