// SmartStay — conexión con la nube (Supabase).
//
// Mientras estos dos valores estén vacíos, el sitio funciona en "modo local"
// (los datos quedan en el navegador de cada persona, como una demo).
// Para que los datos vivan en la nube y los vean el CGO y el personal de
// cada hotel, pegá acá los dos valores de tu proyecto de Supabase
// (Project Settings → API) y subí este archivo. Guía completa: nube/GUIA.md
//
// Ninguno de estos dos valores es secreto: están pensados para ir en el
// navegador. NUNCA pegues acá la clave "service_role" / "secret".
window.SS_CONFIG = {
  supabaseUrl: '',   // Ej: 'https://abcdefghijklmnop.supabase.co'
  supabaseKey: '',   // la clave "anon" (JWT largo) o "publishable" (sb_publishable_...)
};
