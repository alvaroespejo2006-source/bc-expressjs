// Paso 4: comparar los tres patrones — deben mostrar el mismo resultado

import { loadSuppliersWithCallback } from './01-callbacks.js';
import { loadSuppliersWithPromise } from './02-promises.js';
import { loadSuppliersWithAsync } from './03-async-await.js';
import { loadAllData } from './04-parallel.js';

// 1. Con callbacks (más verboso)
loadSuppliersWithCallback((err, suppliers) => {
  if (err) {
    console.error('Callback error:', err.message);
    return;
  }
  console.log('Callbacks:', suppliers?.length, 'suppliers loaded');
});

// 2. Con Promises (encadenado)
loadSuppliersWithPromise()
  .then((suppliers) => console.log('Promises:', suppliers.length, 'suppliers loaded'))
  .catch((err: Error) => console.error('Promise error:', err.message));

// 3. Con async/await (más legible — el estándar que usaremos)
const runAsync = async (): Promise<void> => {
  try {
    const suppliers = await loadSuppliersWithAsync();
    console.log('Async/Await:', suppliers.length, 'suppliers loaded');
  } catch (err) {
    console.error('Async error:', err instanceof Error ? err.message : err);
  }
};

runAsync();

// 5. Carga en paralelo con Promise.all
loadAllData();
