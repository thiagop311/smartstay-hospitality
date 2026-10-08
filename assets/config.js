// SmartStay — conexión con la nube (Supabase).
//
// Mientras estos dos valores estén vacíos, el sitio funciona en "modo local"
// (los datos quedan en el navegador de cada persona, como una demo).
// Con los dos valores, los datos viven en la nube y los ven el CGO y el
// personal de cada hotel. Guía completa: nube/GUIA.md
//
// Ninguno de estos dos valores es secreto: están pensados para ir en el
// navegador. NUNCA pegues acá la clave "service_role" / "secret".
window.SS_CONFIG = {
  supabaseUrl: 'https://vywsiydwchklpktdaqim.supabase.co',
  supabaseKey: 'sb_publishable_QPeLwN3CV1YewhxxKpsd3Q_p3UTiRYd',
};
