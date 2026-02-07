# Rencana Implementasi: Fitur Pencarian Musik iTunes

## Deskripsi
Menambahkan fitur "Cari & Pilih Musik" pada sidebar editor menggunakan iTunes Search API. Fitur ini memungkinkan pengguna untuk mencari lagu, mendengarkan preview, dan menggunakannya sebagai musik latar undangan. Fitur ini tersedia untuk semua pengguna, termasuk pengguna Gratis (Free).

## Perubahan yang Diusulkan

### [components/EditorSidebar.tsx](file:///c:/Users/USER/weddinginvitation/wedding-saas/components/EditorSidebar.tsx)

#### [MODIFY] Menambahkan State dan Logika Pencarian
Saya akan menambahkan state berikut ke dalam komponen `EditorSidebar`:
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState<any[]>([]);
const [isSearching, setIsSearching] = useState(false);
// Opsional: Untuk preview suara saat memilih, kita bisa menambah state audioPreview
```

Dan fungsi `searchMusic`:
```typescript
const searchMusic = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&media=music&entity=song&limit=5`);
        const data = await res.json();
        setSearchResults(data.results);
    } catch (err) {
        console.error(err);
        alert("Gagal mencari lagu");
    } finally {
        setIsSearching(false);
    }
};
```

#### [MODIFY] Menambahkan UI Pencarian di Bagian Musik
Saya akan menyisipkan UI pencarian di bawah bagian "Music Upload Section" (sekitar baris 460).
UI akan mencakup:
1.  **Input Pencarian**: Field untuk mengetik judul lagu/artis.
2.  **Tombol Cari**: Untuk memicu pencarian.
3.  **Daftar Hasil**: Menampilkan cover, judul, artis, dan tombol "Pilih".
    *   Tiap item bisa di-klik untuk preview (opsional) atau langsung pilih.
    *   Tombol "Pilih" akan mengupdate `metadata.music_url` dengan `previewUrl` dari iTunes.

```tsx
<div className="mt-4 border-t border-slate-100 pt-4">
    <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase">Cari Lagu (iTunes Preview)</label>
        <span className="text-[9px] bg-green-100 text-green-600 px-2 py-0.5 rounded font-bold">FREE</span>
    </div>
    
    <div className="flex gap-2">
        <input 
            className="flex-1 border text-sm px-3 py-2 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-pink-500/20 outline-none transition"
            placeholder="Judul lagu / Penyanyi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchMusic()}
        />
        <button 
            onClick={searchMusic}
            disabled={isSearching}
            className="bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-700 transition"
        >
            {isSearching ? '...' : 'Cari'}
        </button>
    </div>

    {/* Hasil Pencarian */}
    {searchResults.length > 0 && (
        <div className="mt-3 space-y-2 bg-white border border-slate-100 rounded-xl p-2 shadow-sm max-h-60 overflow-y-auto custom-scroll">
            {searchResults.map((track) => (
                <div key={track.trackId} className="flex items-center gap-3 p-2 hover:bg-pink-50 rounded-lg cursor-pointer transition group">
                    <img src={track.artworkUrl60} className="w-10 h-10 rounded-md shadow-sm" alt="cover" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{track.trackName}</p>
                        <p className="text-[10px] text-slate-500 truncate">{track.artistName}</p>
                    </div>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onUpdate('metadata.music_url', track.previewUrl);
                            setSearchResults([]);
                            setSearchQuery('');
                        }}
                        className="text-[10px] bg-white border border-pink-200 text-pink-600 px-2.5 py-1.5 rounded-md font-bold hover:bg-pink-600 hover:text-white transition"
                    >
                        Pilih
                    </button>
                </div>
            ))}
        </div>
    )}
</div>
```

## Verifikasi
1.  Buka editor undangan.
2.  Masuk ke tab yang memuat setting musik (Design/Media).
3.  Cari lagu (misal: "Payung Teduh").
4.  Pastikan hasil muncul.
5.  Pilih lagu, dan pastikan field "Musik Latar" terisi URL preview iTunes.
6.  Cek apakah URL tersebut bisa diputar di preview undangan (jika editor mendukung preview live).

## Guest Generation Feature (Fitur Tamu Undangan)

**Status Saat Ini:**
- Komponen `GuestModal.tsx` sudah ada namun **tidak terhubung** ke halaman manapun (Orphan Component).
- Struktur data `InvitationData` belum memiliki field untuk menyimpan daftar tamu (`guests`).
- Limitasi Tier (20, 100, 500, 1000) belum didefinisikan secara kode.

**Rencana Implementasi:**
1.  **Definisi Konstanta Limit**: Membuat `lib/limits.ts` atau update `lib/constants.ts` untuk menyimpan aturan limit per tier.
2.  **Update Database/Type**: Menambahkan array `guests` pada struktur JSON undangan (`metadata` atau `engagement`).
3.  **Integrasi UI**:
    -   Menambahkan tab/tombol "Tamu" (Guest) di `EditorSidebar`.
    -   Menghubungkan `GuestModal` agar bisa dibuka dari Editor.
    -   Mengimplementasikan logika simpan/update daftar tamu ke Supabase.
4.  **Enforce Limits**: Memastikan user tidak bisa menambah tamu melebihi kuota tier mereka.

### [User Dashboard & Editor]
#### [MODIFY] [EditorSidebar.tsx](file:///c:/Users/USER/weddinginvitation/wedding-saas/components/EditorSidebar.tsx)
- Add "Tamu" tab or button.
- Integrate `GuestModal`.

#### [MODIFY] [types/invitation.ts](file:///c:/Users/USER/weddinginvitation/wedding-saas/types/invitation.ts)
- Add `guests: string[]` to `engagement`.

#### [NEW] [lib/limits.ts](file:///c:/Users/USER/weddinginvitation/wedding-saas/lib/limits.ts)
- Define `GUEST_LIMITS` constants.
