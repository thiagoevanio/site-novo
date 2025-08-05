// Service Worker para Calcule Sua Saúde
// Versão: 1.0.0
// Implementa estratégias de caching avançadas para PWA

const CACHE_NAME = 'calcule-sua-saude-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';
const IMAGES_CACHE = 'images-v1.0.0';

// Assets estáticos para cache imediato
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/estilo.css',
  '/js/modo-noturno.js',
  '/js/menu-mobile.js',
  '/js/utils.js',
  '/icon192.png',
  '/icon512.png',
  '/maskable_icon_x192.png',
  '/maskable_icon_x512.png',
  '/favicon.ico'
];

// Páginas principais para cache
const CORE_PAGES = [
  '/index.html',
  '/desafios.html',
  '/artigos.html',
  '/todos_quizzes.html',
  '/sobre.html',
  '/contato.html',
  '/politica.html',
  '/termos.html'
];

// Ferramentas para cache
const TOOLS_PAGES = [
  '/ferramentas/imc.html',
  '/ferramentas/tmb.html',
  '/ferramentas/agua.html',
  '/ferramentas/calorias.html',
  '/ferramentas/macros.html',
  '/ferramentas/gordura.html',
  '/ferramentas/glicemia.html',
  '/ferramentas/frequencia_cardiaca.html'
];

// JavaScript das ferramentas
const TOOLS_JS = [
  '/js/imc.js',
  '/js/tmb.js',
  '/js/agua.js',
  '/js/calorias.js',
  '/js/macros.js',
  '/js/gordura.js',
  '/js/glicemia.js',
  '/js/frequencia_cardiaca.js',
  '/js/desafios.js',
  '/js/quiz.js'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Configuração de estratégias por tipo de recurso
const RESOURCE_STRATEGIES = {
  // Assets estáticos - Cache First
  static: CACHE_STRATEGIES.CACHE_FIRST,
  // Páginas HTML - Stale While Revalidate
  pages: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
  // Imagens - Cache First com fallback
  images: CACHE_STRATEGIES.CACHE_FIRST,
  // API calls - Network First
  api: CACHE_STRATEGIES.NETWORK_FIRST,
  // CSS/JS - Stale While Revalidate
  assets: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE
};

// Event: Install
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache assets estáticos
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache páginas principais
      caches.open(CACHE_NAME).then(cache => {
        console.log('[SW] Caching core pages...');
        return cache.addAll([...CORE_PAGES, ...TOOLS_PAGES]);
      }),
      
      // Cache JavaScript das ferramentas
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching tools JavaScript...');
        return cache.addAll(TOOLS_JS);
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      // Força a ativação imediata
      return self.skipWaiting();
    })
  );
});

// Event: Activate
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    Promise.all([
      // Limpa caches antigos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGES_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Assume controle de todas as abas
      self.clients.claim()
    ]).then(() => {
      console.log('[SW] Activation complete');
    })
  );
});

// Event: Fetch - Intercepta todas as requisições
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignora requisições não-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Determina a estratégia baseada no tipo de recurso
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isImage(url)) {
    event.respondWith(cacheFirstWithFallback(request, IMAGES_CACHE));
  } else if (isPage(url)) {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
  } else if (isAsset(url)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  } else {
    // Para outros recursos, usa network first
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Event: Background Sync
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Event: Push (para notificações futuras)
self.addEventListener('push', event => {
  console.log('[SW] Push message received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nova atualização disponível!',
    icon: '/icon192.png',
    badge: '/icon192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver agora',
        icon: '/icon192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icon192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Calcule Sua Saúde', options)
  );
});

// Event: Notification Click
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click received');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Estratégia: Cache First
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Cache hit:', request.url);
      return cachedResponse;
    }
    
    console.log('[SW] Cache miss, fetching:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline - Recurso não disponível', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Estratégia: Cache First com Fallback
async function cacheFirstWithFallback(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback para imagem padrão
    const cache = await caches.open(STATIC_CACHE);
    const fallback = await cache.match('/icon192.png');
    return fallback || new Response('', { status: 404 });
  }
}

// Estratégia: Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.log('[SW] Network failed, using cache:', error);
    return cachedResponse;
  });
  
  // Retorna cache imediatamente se disponível, senão espera a rede
  return cachedResponse || fetchPromise;
}

// Estratégia: Network First
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    return cachedResponse || new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Background Sync
async function doBackgroundSync() {
  console.log('[SW] Performing background sync...');
  
  try {
    // Aqui você pode implementar sincronização de dados
    // Por exemplo, enviar dados salvos offline
    const pendingData = await getStoredData();
    
    if (pendingData.length > 0) {
      for (const data of pendingData) {
        await syncData(data);
      }
      await clearStoredData();
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Funções auxiliares para classificar recursos
function isStaticAsset(url) {
  return url.pathname.includes('/css/') || 
         url.pathname.includes('/js/') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.includes('manifest.json') ||
         url.pathname.includes('favicon.ico');
}

function isImage(url) {
  return url.pathname.includes('/img/') ||
         url.pathname.includes('/images/') ||
         url.pathname.endsWith('.jpg') ||
         url.pathname.endsWith('.jpeg') ||
         url.pathname.endsWith('.png') ||
         url.pathname.endsWith('.gif') ||
         url.pathname.endsWith('.webp') ||
         url.pathname.endsWith('.svg');
}

function isPage(url) {
  return url.pathname.endsWith('.html') || 
         url.pathname === '/' ||
         (!url.pathname.includes('.') && !url.pathname.includes('/api/'));
}

function isAsset(url) {
  return url.pathname.includes('/css/') ||
         url.pathname.includes('/js/') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js');
}

// Funções para Background Sync (placeholder)
async function getStoredData() {
  // Implementar lógica para recuperar dados armazenados offline
  return [];
}

async function syncData(data) {
  // Implementar lógica para sincronizar dados com o servidor
  console.log('[SW] Syncing data:', data);
}

async function clearStoredData() {
  // Implementar lógica para limpar dados sincronizados
  console.log('[SW] Clearing synced data');
}

// Limpeza periódica de cache
setInterval(() => {
  cleanupOldCaches();
}, 24 * 60 * 60 * 1000); // A cada 24 horas

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    !name.includes('v1.0.0') && 
    (name.includes('calcule-sua-saude') || 
     name.includes('static') || 
     name.includes('dynamic') || 
     name.includes('images'))
  );
  
  await Promise.all(
    oldCaches.map(cacheName => caches.delete(cacheName))
  );
  
  console.log('[SW] Cleaned up old caches:', oldCaches);
}
