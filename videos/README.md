# Video Files

Folder ini untuk menyimpan video-video portfolio Anda.

## Video yang Ada
- `video-1.mp4` - Urban Motion
- `video-2.mp4` - Nature's Symphony  
- `video-3.mp4` - Architectural Poetry (Featured)

## Menambahkan Video Baru
1. Simpan file video Anda di folder ini (format: MP4, WebM)
2. Buat thumbnail untuk video (simpan di folder `images/`)
3. Edit `index.html` di section videography untuk menambahkan video item baru

## Template Video Item
```html
<div class="group relative overflow-hidden rounded-xl bg-gray-900 aspect-video" data-anim="fade-up">
    <video class="w-full h-full object-cover video-autoplay" muted loop playsinline poster="images/video-thumbnail-X.jpg">
        <source src="videos/video-X.mp4" type="video/mp4">
    </video>
    
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <div>
            <h3 class="text-xl font-bold mb-2">Judul Video</h3>
            <p class="text-gray-300 text-sm">Deskripsi video</p>
        </div>
    </div>
    
    <button class="video-control absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-[#00e676]/20">
        <svg class="w-6 h-6 play-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
        </svg>
        <svg class="w-6 h-6 pause-icon hidden" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/>
        </svg>
    </button>
    
    <div class="loading-spinner absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 pointer-events-none">
        <div class="w-12 h-12 border-3 border-[#00e676] border-t-transparent rounded-full animate-spin"></div>
    </div>
</div>
```

Ganti `X` dengan nomor video Anda.
