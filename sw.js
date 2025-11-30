// Service Worker para Calcule Sua Saúde
// Versão: 1.1.0 (Atualizado)

const CACHE_NAME = 'calcule-saude-v1.1';
const DYNAMIC_CACHE = 'calcule-dynamic-v1.1';
const IMMUTABLE_CACHE = 'calcule-immutable-v1.1'; // Para fontes e libs externas

// Página offline dedicada (Melhor experiência de usuário)
const OFFLINE_PAGE = '/offline.html';

// Assets essenciais que DEVEM estar no cache imediatamente
const STATIC_ASSETS = [
  '/',
  '/index.html',
  OFFLINE_PAGE,
  '/manifest.json',
  '/icon192.png',
  '/icon512.png',
  // Adicione aqui seus arquivos CSS/JS principais se existirem fisicamente
  // '/css/estilo.css', 
  // '/js/main.js' 
];

// Limite de itens no cache dinâmico para economizar memória
const MAX_DYNAMIC_ITEMS = 50;

// Função para limitar o tamanho do cache
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    trimCache(cacheName, maxItems);
  }
}

// INSTALAÇÃO
self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Adiciona assets estáticos
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ATIVAÇÃO
self.addEventListener('activate', event => {
  console.log('[SW] Ativando...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          // Remove caches antigos que não correspondem às versões atuais
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE && key !== IMMUTABLE_CACHE) {
            console.log('[SW] Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// INTERCEPTAÇÃO DE REQUISIÇÕES
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. Estratégia para Navegação (Páginas HTML)
  // Tenta Rede -> Falha para Cache -> Falha para Página Offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          return caches.match(request).then(cachedResponse => {
            // Se tem no cache, retorna. Se não, retorna a página offline.
            return cachedResponse || caches.match(OFFLINE_PAGE);
          });
        })
    );
    return;
  }

  // 2. Estratégia para Assets Estáticos e Imagens (Stale-While-Revalidate)
  // Retorna cache rápido, mas atualiza em segundo plano
  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        const networkFetch = fetch(request).then(networkResponse => {
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, networkResponse.clone());
            trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_ITEMS);
          });
          return networkResponse;
        });
        return cachedResponse || networkFetch;
      })
    );
    return;
  }

  // 3. Estratégia para Fontes e Libs Externas (Cache First)
  // Google Fonts, Unpkg (Lucide), etc. Raramente mudam.
  if (url.origin.includes('fonts.googleapis.com') || 
      url.origin.includes('fonts.gstatic.com') || 
      url.origin.includes('unpkg.com') ||
      url.origin.includes('cdn.tailwindcss.com')) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then(networkResponse => {
          return caches.open(IMMUTABLE_CACHE).then(cache => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Padrão para outras requisições
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
