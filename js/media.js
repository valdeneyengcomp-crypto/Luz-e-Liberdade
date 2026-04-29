// Centralização de dados (Mock de Banco de Dados)
const MEDIA_DATA = {
    books: [
        { title: "Acervo Digital Tucuruí", author: "Biblioteca Luz e Liberdade", link: "acervo.html" },
        { title: "Manual de Instrução 01", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/1MDCL_PQKQZV3eiKFMBnaDKgA-33wV0e0/view?usp=drive_link" },
        { title: "Manual de Instrução 02", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/1UOF6XK6j2wsKpEWxPZ2OlnOE7jpJrkE4/view?usp=drive_link" },
        { title: "Manual de Instrução 03", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/1Dfs7pMs_rgbikxk5kyhYrAvPIj61-DGH/view?usp=drive_link" },
        { title: "Manual de Instrução 04", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/1z9w4xd7TC8MYOT2-MJByGu2b2eHdgaoN/view?usp=drive_link" },
        { title: "Manual de Instrução 05", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/13PHNQo-KKbkRktzS8qDUv6Pkm2fY1cdJ/view?usp=drive_link" },
        { title: "Manual de Instrução 06", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/1FNfHr8iIJGUjWi6rLHQ4EtjKvNnMsfZ5/view?usp=drive_link" },
        { title: "Manual de Instrução 07", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/1sJ_j4y8q5z1_G-wRfI7wintw_zkUoNXE/view?usp=drive_link" },
        { title: "Manual de Instrução 08", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/1PMAMU9yrbSbSshoWX16xjdEZKLTt5H2-/view?usp=drive_link" },
        { title: "Manual de Instrução 09", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/1YBeA-xr3WSIutkTCKcfzUPgxlz94R9Ye/view?usp=drive_link" },
        { title: "Manual de Instrução 10", author: "Acervo Luz e Liberdade", link: "https://drive.google.com/file/d/1k-hJ-yPgETD9dpRpd2i7CzGI7uB6x-eE/view?usp=drive_link" }
    ],
    videos: [
        { title: "Destaque Instagram", id: "DPM8n8cDXdN", platform: "instagram" }
    ],
    photos: [
        "https://lh3.googleusercontent.com/d/1PzW60gJek_etvYdTw09ff276zrz0pyrJ", // Símbolos e Arte
        "https://lh3.googleusercontent.com/d/18JiFkkshSK2kv05x0qeV_IClF-yUuYSR", // Arquitetura
          // Livros Antigos
    ]
};

// Função para carregar Livros
function loadBooks() {
    const container = document.querySelector('#biblioteca .grid');
    if (!container) return;

    if (!MEDIA_DATA.books || MEDIA_DATA.books.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center text-gray-500">Nenhum livro cadastrado.</p>';
        return;
    }

    container.innerHTML = MEDIA_DATA.books
        .filter(book => {
            const isAcervoPage = window.location.pathname.includes('acervo.html');
            const isManual = book.title.startsWith('Manual');

            if (isAcervoPage) {
                // Na página de acervo, mostramos apenas os manuais
                return isManual;
            } else {
                // Na página inicial, mostramos o card do Acervo e outros livros, ocultando os manuais
                return !isManual;
            }
        })
        .map(book => `
            <div class="card-custom p-4 shadow">
                <h3 class="font-bold text-slate-800">${book.title}</h3>
                <p class="text-sm text-gray-600 mb-4">${book.author}</p>
                <a href="${book.link}" ${book.link.startsWith('http') ? 'target="_blank"' : ''} class="text-gold font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Acessar <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
            </div>
        `).join('');
}

// Função para carregar Galeria
function loadGallery() {
    const container = document.querySelector('#midia .grid-cols-2');
    if (!container) return;

    container.innerHTML = MEDIA_DATA.photos.map(url => `
        <div onclick="openLightbox('${url}')" class="cursor-pointer overflow-hidden rounded shadow-sm hover:shadow-md transition">
            <img src="${url}" class="hover:scale-110 transition duration-500 w-full aspect-square object-cover" alt="Acervo">
        </div>
    `).join('');
}

// Funções do Modal (Lightbox)
function setupLightbox() {
    if (document.getElementById('lightbox-modal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    // Classes Tailwind para um modal centralizado e elegante
    modal.className = 'fixed inset-0 bg-black bg-opacity-90 z-[100] hidden items-center justify-center p-4 cursor-pointer';
    modal.innerHTML = `
        <button onclick="closeLightbox()" class="absolute top-6 right-6 text-white text-4xl hover:text-gold transition">&times;</button>
        <img id="lightbox-img" src="" class="max-w-full max-h-full rounded shadow-2xl transition-transform duration-300 scale-95" alt="Zoom">
    `;
    
    // Fecha ao clicar no fundo
    modal.onclick = (e) => { if (e.target === modal) closeLightbox(); };
    document.body.appendChild(modal);
}

window.openLightbox = (url) => {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    img.src = url;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Trava o scroll da página
    setTimeout(() => img.classList.remove('scale-95'), 10);
};

window.closeLightbox = () => {
    const modal = document.getElementById('lightbox-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = ''; // Libera o scroll
};

// Função para carregar Vídeos (YouTube)
function loadVideos() {
    const container = document.querySelector('#videos .grid');
    if (!container) return;

    if (!MEDIA_DATA.videos || MEDIA_DATA.videos.length === 0) {
        container.innerHTML = '<p class="col-span-full text-center text-gray-500">Nenhum vídeo disponível.</p>';
        return;
    }

    container.innerHTML = MEDIA_DATA.videos.map(video => {
        const isInstagram = video.platform === 'instagram';
        const embedUrl = isInstagram 
            ? `https://www.instagram.com/reel/${video.id}/embed` 
            : `https://www.youtube.com/embed/${video.id}`;
        
        return `
            <div class="card-custom p-2 shadow">
                <div class="${isInstagram ? 'flex justify-center bg-black rounded' : ''}">
                    <iframe class="rounded ${isInstagram ? 'w-full max-w-[350px] h-[550px]' : 'w-full aspect-video'}" 
                        src="${embedUrl}" 
                        title="${video.title}" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen scrolling="no"></iframe>
                </div>
                <h3 class="mt-2 text-center font-medium text-slate-700">${video.title}</h3>
            </div>
        `;
    }).join('');
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    setupLightbox();
    loadBooks();
    loadGallery();
    loadVideos();
});