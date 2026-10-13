// SmartStay Hospitality — shared UI helpers (toast, modal, accordion, tabs, copy)

// A Supabase recovery email can land on ANY page of the site: if its redirect
// address isn't in the project's allowed list, Supabase falls back to the Site
// URL (usually the home page). Forward that link to the reset page with the
// one-time token (or the "expired" error) still attached.
(function ssForwardRecoveryLink() {
  try {
    const h = location.hash || '';
    if (/resetear-password\.html$/.test(location.pathname)) return;
    const isRecovery = /(^#|&)type=recovery(&|$)/.test(h) && /access_token=/.test(h);
    const isLinkError = /error_code=otp_expired/.test(h);
    if (isRecovery || isLinkError) location.replace(location.pathname.replace(/[^/]*$/, '') + 'resetear-password.html' + h);
  } catch (e) {}
})();

function showToast(message, icon) {
  let toast = document.getElementById('sharedToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sharedToast';
    toast.className = 'toast';
    toast.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg><span></span>';
    document.body.appendChild(toast);
  }
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.removeAttribute('hidden');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.setAttribute('hidden', '');
}
document.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('modal-overlay')) {
    e.target.setAttribute('hidden', '');
  }
});

// =========================================================
// Real multi-language support (ES/EN). Any element with
// data-i18n="key" gets its text swapped on language change; add
// data-i18n-html to the same element instead when the translation itself
// needs inline markup (e.g. a <br>). Elements with data-i18n-placeholder
// get their placeholder attribute translated instead of their content.
// The chosen language persists in localStorage so it survives navigation
// between pages, exactly like a real site-wide language switch.
// =========================================================
const LANG_KEY = 'ss_language';
const I18N = {
  es: {
    'nav.home': 'Inicio', 'nav.advantages': 'Ventajas', 'nav.features': 'Funcionalidades',
    'nav.security': 'Seguridad', 'nav.contact': 'Contacto', 'nav.login': 'Iniciar sesión',
    'hero.badge': 'Tecnología que transforma tu estadía',
    'hero.title': 'Bienvenido a',
    'hero.lead': 'La plataforma inteligente que te acompaña durante toda tu estadía, desde tu llegada hasta tu salida.',
    'hero.feature1': 'Llave digital<br>NFC', 'hero.feature2': 'Servicios<br>a un clic', 'hero.feature3': 'Control de<br>consumos',
    'continue.heading': '¿Cómo deseas continuar?', 'continue.sub': 'Selecciona una opción para empezar',
    'continue.guestTitle': 'Soy huésped', 'continue.guestDesc': 'Realiza tu check-in, accede a tu habitación y gestiona tu estadía.', 'continue.guestBtn': 'Continuar',
    'continue.staffTitle': 'Soy personal del hotel', 'continue.staffDesc': 'Accede al panel administrativo para gestionar huéspedes, servicios y más.', 'continue.staffBtn': 'Iniciar sesión',
    'benefits.b1Title': 'Acceso sin límites', 'benefits.b1Desc': 'Tu celular es tu llave NFC para habitaciones y áreas del hotel',
    'benefits.b2Title': 'Todo en un solo lugar', 'benefits.b2Desc': 'Servicios, consumos, información y más desde tu móvil',
    'benefits.b3Title': 'Seguridad y confianza', 'benefits.b3Desc': 'Tecnología avanzada para proteger tu información y accesos',
    'benefits.b4Title': 'Soporte 24/7', 'benefits.b4Desc': 'Estamos para ayudarte en todo momento',
    'features.heading': 'Funcionalidades pensadas para tu estadía', 'features.sub': 'Todo lo que necesitás para disfrutar tu estadía, en un solo lugar.',
    'features.f1Title': 'Check-in 100% digital', 'features.f1Desc': 'Registra tu llegada desde tu celular, sin filas ni papeleo.',
    'features.f2Title': 'Servicios a un clic', 'features.f2Desc': 'Solicita room service, spa, lavandería y más desde la app.',
    'features.f3Title': 'Control de consumos', 'features.f3Desc': 'Visualiza en tiempo real todos los gastos de tu estadía.',
    'mission.heading': 'Nuestra misión y visión', 'mission.sub': 'El propósito que impulsa a SmartStay Hospitality.',
    'mission.missionTitle': 'Misión',
    'mission.missionText': 'Brindar una plataforma hotelera innovadora y accesible que facilite la experiencia del huésped, ofreciendo información clara, experiencias personalizadas, herramientas digitales eficientes y un servicio seguro para los usuarios.',
    'mission.visionTitle': 'Visión',
    'mission.visionText': 'Ser un área de soporte técnico líder dentro del hotel, reconocida por garantizar el óptimo funcionamiento de las plataformas digitales y sistemas tecnológicos. Aspiramos a mejorar continuamente la experiencia del huésped y de los colaboradores mediante soluciones innovadoras.',
    'security.title': 'Seguridad avanzada en cada acceso',
    'security.desc': 'Control de accesos NFC y protección de datos en cada operación, cumpliendo los más altos estándares de la industria hotelera.',
    'footer.tagline': 'La plataforma inteligente que acompaña a huéspedes y hoteles durante toda la estadía.',
    'footer.productHeading': 'Producto', 'footer.accessHeading': 'Accesos', 'footer.contactHeading': 'Contacto',
    'footer.checkinLink': 'Check-in de huésped', 'footer.panelLink': 'Panel del hotel',
    'footer.copyright': 'SmartStay Hospitality S.A. © 2026 · Todos los derechos reservados',
    'footer.terms': 'Términos de uso', 'footer.privacy': 'Política de privacidad',
    'splash.tap': 'Toca para continuar',
    'login.heroTitle': 'Panel administrativo<br>para <span>hoteles inteligentes</span>',
    'login.heroDesc': 'Gestiona huéspedes, habitaciones, servicios y accesos desde un solo lugar.',
    'login.f1Title': 'Control total', 'login.f1Desc': 'Monitorea en tiempo real la actividad del hotel y toma mejores decisiones.',
    'login.f2Title': 'Gestión eficiente', 'login.f2Desc': 'Administra huéspedes, habitaciones, servicios y consumos de forma simple y rápida.',
    'login.f3Title': 'Seguridad avanzada', 'login.f3Desc': 'Control de accesos NFC y protección de datos en cada operación.',
    'login.f4Title': 'Todo en tiempo real', 'login.f4Desc': 'Información actualizada para brindar la mejor experiencia a tus huéspedes.',
    'login.secureNotice': '<strong>Acceso seguro</strong> y exclusivo para el personal autorizado. Todas las operaciones quedan registradas.',
    'login.heading': 'Iniciar sesión', 'login.sub': 'Accede al panel administrativo de SmartStay',
    'login.email': 'Correo electrónico', 'login.emailPlaceholder': 'ejemplo@hotel.com', 'login.password': 'Contraseña', 'login.remember': 'Recordarme',
    'login.forgot': '¿Olvidaste tu contraseña?', 'login.submit': 'Iniciar sesión', 'login.or': 'o continúa con',
    'login.cgo': 'Acceso CGO', 'login.restrictedTitle': 'Acceso restringido',
    'login.restrictedDesc': 'Esta área es exclusiva para el personal del hotel. Si no tienes una cuenta, <a href="registro-staff.html" style="color:var(--blue-primary); font-weight:600;">registrate acá</a>.',
    'login.help': '¿Necesitas ayuda?',
    'gnav.home': 'Inicio', 'gnav.checkin': 'Check-in', 'gnav.stay': 'Mi estadía',
    'gnav.services': 'Servicios', 'gnav.account': 'Mi cuenta', 'gnav.help': 'Asistencia', 'gnav.logout': 'Cerrar sesión',
    'common.noCharge': 'Sin cargo',
    'billing.room': 'Habitación', 'billing.night': 'noche', 'billing.nights': 'noches',
    'ci.step1Title': 'Buscar reserva', 'ci.step1Desc': 'Localiza tu reserva',
    'ci.step2Title': 'Datos personales', 'ci.step2Desc': 'Verifica tu información',
    'ci.step3Title': 'Documento de identidad', 'ci.step3Desc': 'Confirma tu documento',
    'ci.step4Title': 'Confirmar habitación', 'ci.step4Desc': 'Revisa tu asignación',
    'ci.step5Title': 'Términos y condiciones', 'ci.step5Desc': 'Acepta los términos',
    'ci.step6Title': 'Registro de ingreso', 'ci.step6Desc': 'Firma digital y registro',
    'ci.step7Title': 'Check-in completado', 'ci.step7Desc': '¡Listo! Disfruta tu estadía',
    'ci.title': 'Check-in digital', 'ci.subtitle': 'Completa los pasos para registrar tu ingreso al hotel.',
    'ci.secureTitle': 'Tu información está segura', 'ci.secureDesc': 'Usamos tecnología avanzada para proteger tus datos personales.',
    'ci.yourReservation': 'Tu reserva', 'ci.reservaPlaceholder': 'Buscaremos tu reserva para mostrar el resumen aquí.',
    'ci.feature1Title': 'Check-in 100% digital', 'ci.feature1Desc': 'Rápido, cómodo y seguro.',
    'ci.feature2Desc': 'Tu celular abre tu habitación y las áreas autorizadas.',
    'ci.feature3Title': 'Todo en tu móvil', 'ci.feature3Desc': 'Gestiona tu estadía de forma fácil y segura.',
    'ci.helpDesc': 'Nuestro equipo de recepción está disponible las 24 horas.',
    'ci.call': 'Llamar', 'ci.reception': 'Recepción', 'ci.receptionNotified': 'Aviso enviado a recepción',
    'svc.title': 'Servicios del hotel', 'svc.subtitle': 'Solicita los servicios que necesites, se cargarán directamente a tu habitación.',
    'svc.all': 'Todos', 'svc.spa': 'Spa & bienestar', 'svc.laundry': 'Lavandería', 'svc.cleaning': 'Limpieza', 'svc.transport': 'Transporte',
    'cta.back': 'Volver a mi estadía', 'cta.title': 'Mi cuenta', 'cta.subtitle': 'Gestioná tus datos personales, facturación y preferencias.',
    'cta.personalData': 'Datos personales', 'cta.firstName': 'Nombre', 'cta.lastName': 'Apellido', 'cta.phone': 'Teléfono', 'cta.save': 'Guardar cambios',
    'cta.history': 'Historial de estadías anteriores',
    'cta.preferences': 'Preferencias', 'cta.pushTitle': 'Notificaciones push', 'cta.pushDesc': 'Recibir avisos sobre tu estadía y servicios.',
    'cta.offersTitle': 'Ofertas y novedades', 'cta.offersDesc': 'Recibir promociones de SmartStay por email.', 'cta.prefUpdated': 'Preferencia actualizada',
    'cta.billing': 'Facturación de la estadía', 'cta.downloadReceipt': 'Descargar comprobante', 'cta.total': 'Total',
    'cta.finishStay': 'Finalizar tu estadía', 'cta.finishStayDesc': 'Cuando estés listo/a para irte, confirmá tu check-out. Vamos a verificar tu cuenta y liberar la habitación para el hotel.',
    'cta.confirmCheckout': 'Confirmar check-out',
    'info.title': 'Información del hotel', 'info.subtitle': 'Todo lo que necesitás saber durante tu estadía.',
    'info.network': 'Red', 'info.password': 'Clave', 'info.copy': 'Copiar', 'info.hours': 'Horarios',
    'info.breakfast': 'Desayuno', 'info.pool': 'Piscina', 'info.gym': 'Gimnasio',
    'info.amenities': 'Amenities del hotel', 'info.amenity1': 'Piscina climatizada', 'info.amenity2': 'Gimnasio 24 horas',
    'info.amenity4': 'Restaurante y room service 24/7', 'info.amenity5': 'Estacionamiento privado',
    'info.locationContact': 'Ubicación y contacto',
    'asis.subtitle': 'Estamos disponibles las 24 horas para ayudarte con lo que necesites.',
    'asis.faq': 'Preguntas frecuentes',
    'asis.q1': '¿Cómo abro la puerta de mi habitación?',
    'asis.a1': 'Acercá tu celular a la etiqueta NFC de la puerta o tocá "Abrir mi habitación" en "Mi estadía". Tu celular es tu llave y se activa solo al completar el check-in digital. Si tu celular no tiene NFC, pedí una tarjeta física (opcional) desde "Mi estadía" o en recepción.',
    'asis.q2': '¿Puedo cambiar la hora de mi check-out?',
    'asis.a2': 'Sí, escribinos por WhatsApp o contactá a recepción con al menos 3 horas de anticipación para coordinar un check-out tardío, sujeto a disponibilidad.',
    'asis.q3': '¿Cómo solicito un servicio a mi habitación?',
    'asis.a3': 'Ingresá a la sección "Servicios" desde el menú principal, elegí lo que necesites y tocá "Solicitar". Se carga automáticamente a tu habitación.',
    'asis.q4': '¿Qué hago si pierdo mi celular o mi tarjeta?',
    'asis.a4': 'Bloqueá la llave desde "Mi estadía" (botón "Perdí mi celular" o "Perdí mi tarjeta"; podés entrar desde otro celular con tu código de reserva) o avisá a recepción. La llave bloqueada deja de abrir tu puerta y recepción te la reactiva o te entrega una nueva.',
    'asis.writeUs': 'Escribinos', 'asis.subject': 'Asunto', 'asis.message': 'Mensaje', 'asis.sendMessage': 'Enviar mensaje',
    'asis.messageSent': '¡Mensaje enviado!', 'asis.willReply': 'Nuestro equipo te va a responder a la brevedad.',
    'asis.directContact': 'Contacto directo', 'asis.replyMinutes': 'Respuesta en minutos', 'asis.chat': 'Chatear',
    'asis.callReception': 'Llamar a recepción', 'asis.write': 'Escribir', 'asis.groundFloor': 'Planta baja · 24 horas',
    'asis.notify': 'Avisar', 'asis.avgResponse': 'Tiempo de respuesta promedio: menos de 5 minutos.',
    'portal.welcome': '¡Bienvenido/a!', 'portal.subtitle': 'Esto es lo que pasa hoy en tu estadía.',
    'portal.qServicesDesc': 'Solicita room service, spa y más.', 'portal.qAccountDesc': 'Datos, facturación y preferencias.',
    'portal.qInfo': 'Información', 'portal.qInfoDesc': 'Wi-Fi, horarios y datos del hotel.',
    'portal.qHelpDesc': 'Contacta a recepción las 24 horas.',
    'portal.qProfile': 'Mi perfil', 'portal.qProfileDesc': 'Editá tu información personal.',
    'portal.qMore': 'Más', 'portal.qMoreDesc': 'Todas las opciones disponibles.',
    'portal.spending': 'Control de consumos', 'portal.notifications': 'Notificaciones',
    'portal.greeting': 'Hola, ', 'portal.room': 'Habitación', 'portal.checkinActive': 'Check-in activo',
    'portal.cardNo': 'N.º', 'portal.cardBlocked': 'Bloqueada', 'portal.lostCard': 'Perdí mi tarjeta',
    'portal.lostCardConfirm': '¿Bloquear tu tarjeta NFC? Dejará de abrir tu habitación y vas a poder pedir una nueva en recepción.',
    'portal.cardBlockedToast': 'Tarjeta bloqueada. Pide una nueva en recepción.',
    'portal.stayTotal': 'Total estadía', 'portal.noServicesYet': 'Todavía no solicitaste ningún servicio.',
    'portal.checkinConfirmedTitle': 'Check-in confirmado',
    'portal.completed': 'Completado', 'portal.inProgress': 'En proceso', 'portal.requestReceived': 'Solicitud recibida',
    'portal.checkoutReminderTitle': 'Recordatorio de check-out', 'portal.departureIs': 'Tu salida es',
    'portal.coordinateWithReception': 'a coordinar con recepción',
    'key.phoneTitle': 'Llave digital en tu celular', 'key.phoneActive': 'Activa', 'key.phoneBlockedPill': 'Bloqueada',
    'key.phoneDescActive': 'Acercá tu celular a la etiqueta NFC de la puerta o tocá "Abrir mi habitación".',
    'key.phoneDescBlocked': 'Tu llave digital está bloqueada. Avisá a recepción para reactivarla.',
    'key.openRoom': 'Abrir mi habitación', 'key.lostPhone': 'Perdí mi celular',
    'key.lostPhoneConfirm': '¿Bloquear la llave digital de tu celular? Dejará de abrir tu habitación hasta que recepción la reactive.',
    'key.phoneBlockedToast': 'Llave del celular bloqueada. Avisá a recepción.',
    'key.cardTitle': 'Tarjeta física (opcional)',
    'key.cardDescNone': '¿Tu celular no tiene NFC? Pedí una tarjeta en recepción.', 'key.cardRequest': 'Pedir tarjeta',
    'key.cardRequestedPill': 'Solicitada', 'key.cardRequested': 'Pedido enviado: retirá tu tarjeta en recepción.', 'key.cardRequestedToast': 'Avisamos a recepción: retirá tu tarjeta ahí.',
    'key.cardActiveDesc': 'Acercala al lector de la puerta para ingresar.',
    'key.cardBlockedDesc': 'Tu tarjeta está bloqueada. Pedí una nueva en recepción.',
    'key.notifPhone': 'Tu celular ya es tu llave: acercalo a la etiqueta NFC de tu puerta.',
    'key.notifPhoneBlocked': 'Tu llave del celular está bloqueada. Avisá a recepción.',
    'door.title': 'Puerta', 'door.room': 'Habitación', 'door.common': 'Áreas comunes', 'door.open': 'Puerta abierta', 'door.denied': 'No se pudo abrir',
    'door.opening': 'Comprobando tu llave…', 'door.retry': 'Volver a intentar', 'door.backToStay': 'Ir a mi estadía',
    'door.needLogin': 'Para abrir la puerta con tu celular, ingresá primero con tu código de reserva.', 'door.login': 'Ingresar con mi código',
    'door.openedMsg': 'Entrá y disfrutá tu estadía.', 'door.demoNote': 'Demostración: no hay cerradura física conectada, el sistema simula la apertura y la deja registrada.',
    'door.r.blocked': 'Tu llave está bloqueada. Avisá a recepción.', 'door.r.ended': 'Tu estadía ya finalizó.', 'door.r.nostay': 'Todavía no completaste el check-in.',
    'door.r.wrongDoor': 'Esta no es la puerta de tu habitación.', 'door.r.wrongHotel': 'Esta puerta pertenece a otro hotel.',
    'door.r.unknown': 'No encontramos tu reserva.', 'door.r.error': 'No pudimos comprobar tu llave. Revisá tu conexión.',
    'pay.title': 'Pagar mi cuenta', 'pay.total': 'Total de la estadía', 'pay.paid': 'Pagado', 'pay.pendingCash': 'Efectivo por entregar en recepción', 'pay.balance': 'Saldo a pagar',
    'pay.settled': 'Tu cuenta está saldada. ¡Gracias!', 'pay.nothing': 'Todavía no tenés consumos para pagar.',
    'pay.chooseWay': 'Elegí cómo pagar',
    'pay.optCard': 'Tarjeta de crédito o débito', 'pay.optCardDesc': 'Pagás ahora, acá mismo.', 'pay.optCash': 'Efectivo en recepción', 'pay.optCashDesc': 'Pagás cuando pasés por el mostrador.',
    'pay.phName': 'NOMBRE APELLIDO', 'pay.phExpiry': 'MM/AA', 'pay.cardNumber': 'Número de tarjeta', 'pay.cardName': 'Nombre en la tarjeta', 'pay.cardExpiry': 'Vencimiento (MM/AA)', 'pay.cardCvv': 'CVV',
    'pay.payNow': 'Pagar', 'pay.processing': 'Procesando el pago…',
    'pay.cashBtn': 'Pagaré en efectivo en recepción', 'pay.cashInfo': 'Registramos tu pago como pendiente: acercate a recepción con el monto y lo confirman al recibirlo.',
    'pay.testNote': 'Pagos en modo de prueba: no se cobra dinero real. Tarjeta de prueba: 4242 4242 4242 4242, cualquier fecha futura y 3 dígitos. Solo guardamos la marca y los últimos 4 dígitos.',
    'pay.history': 'Pagos de esta estadía', 'pay.byCard': 'Tarjeta', 'pay.byCash': 'Efectivo', 'pay.st.paid': 'Pagado', 'pay.st.pending': 'Pendiente', 'pay.st.canceled': 'Anulado',
    'pay.errNumber': 'Revisá el número de la tarjeta.', 'pay.errName': 'Ingresá el nombre que figura en la tarjeta.', 'pay.errExpiry': 'Revisá el vencimiento (MM/AA).', 'pay.errExpired': 'La tarjeta está vencida.', 'pay.errCvv': 'Revisá el código de seguridad (CVV).',
    'pay.declined': 'La tarjeta fue rechazada. Probá con otra.', 'pay.funds': 'Fondos insuficientes. Probá con otra tarjeta o pagá en efectivo.',
    'pay.errAmount': 'Ese monto no es válido para tu saldo actual.', 'pay.errNetwork': 'No pudimos registrar el pago. Revisá tu conexión e intentá de nuevo.', 'pay.errStay': 'Tu estadía no está activa.',
    'pay.okCard': '¡Pago aprobado! Gracias.', 'pay.okCash': 'Listo: avisamos a recepción. Pagá en el mostrador.',
    'pay.receiptPaid': 'PAGADO', 'pay.receiptBalance': 'SALDO',
    'ci.keyTitle': 'Llave digital NFC', 'ci.doneText': 'Tu registro fue exitoso. Tu celular ya es tu llave: acercalo a la etiqueta NFC de tu puerta o tocá "Abrir mi habitación" en tu estadía. Si tu celular no tiene NFC, podés pedir una tarjeta física (opcional) en recepción.',
  },
  en: {
    'nav.home': 'Home', 'nav.advantages': 'Advantages', 'nav.features': 'Features',
    'nav.security': 'Security', 'nav.contact': 'Contact', 'nav.login': 'Sign in',
    'hero.badge': 'Technology that transforms your stay',
    'hero.title': 'Welcome to',
    'hero.lead': 'The smart platform that goes with you through your whole stay, from arrival to departure.',
    'hero.feature1': 'NFC digital<br>key', 'hero.feature2': 'Services<br>in one tap', 'hero.feature3': 'Spending<br>tracker',
    'continue.heading': 'How would you like to continue?', 'continue.sub': 'Choose an option to get started',
    'continue.guestTitle': "I'm a guest", 'continue.guestDesc': 'Check in, unlock your room, and manage your stay.', 'continue.guestBtn': 'Continue',
    'continue.staffTitle': "I'm hotel staff", 'continue.staffDesc': 'Access the admin panel to manage guests, services, and more.', 'continue.staffBtn': 'Sign in',
    'benefits.b1Title': 'Unlimited access', 'benefits.b1Desc': 'Your phone is your NFC key for rooms and hotel areas',
    'benefits.b2Title': 'Everything in one place', 'benefits.b2Desc': 'Services, spending, information and more from your phone',
    'benefits.b3Title': 'Security and trust', 'benefits.b3Desc': 'Advanced technology to protect your information and access',
    'benefits.b4Title': '24/7 support', 'benefits.b4Desc': "We're here to help at any time",
    'features.heading': 'Features built for your stay', 'features.sub': 'Everything you need to enjoy your stay, in one place.',
    'features.f1Title': '100% digital check-in', 'features.f1Desc': 'Check in from your phone, no lines and no paperwork.',
    'features.f2Title': 'Services in one tap', 'features.f2Desc': 'Request room service, spa, laundry and more from the app.',
    'features.f3Title': 'Spending tracker', 'features.f3Desc': 'See every expense of your stay in real time.',
    'mission.heading': 'Our mission and vision', 'mission.sub': 'The purpose that drives SmartStay Hospitality.',
    'mission.missionTitle': 'Mission',
    'mission.missionText': 'To provide an innovative and accessible hospitality platform that makes the guest experience easier, offering clear information, personalized experiences, efficient digital tools, and a secure service for every user.',
    'mission.visionTitle': 'Vision',
    'mission.visionText': "To be a leading technical support team within the hotel, recognized for keeping digital platforms and technology systems running smoothly. We aim to continuously improve the experience of guests and staff through innovative solutions.",
    'security.title': 'Advanced security on every access',
    'security.desc': 'NFC access control and data protection on every operation, meeting the highest standards of the hospitality industry.',
    'footer.tagline': 'The smart platform that supports guests and hotels through their whole stay.',
    'footer.productHeading': 'Product', 'footer.accessHeading': 'Access', 'footer.contactHeading': 'Contact',
    'footer.checkinLink': 'Guest check-in', 'footer.panelLink': 'Hotel panel',
    'footer.copyright': 'SmartStay Hospitality S.A. © 2026 · All rights reserved',
    'footer.terms': 'Terms of use', 'footer.privacy': 'Privacy policy',
    'splash.tap': 'Tap to continue',
    'login.heroTitle': 'Admin panel<br>for <span>smart hotels</span>',
    'login.heroDesc': 'Manage guests, rooms, services, and access from one place.',
    'login.f1Title': 'Full control', 'login.f1Desc': 'Monitor hotel activity in real time and make better decisions.',
    'login.f2Title': 'Efficient management', 'login.f2Desc': 'Manage guests, rooms, services, and charges simply and quickly.',
    'login.f3Title': 'Advanced security', 'login.f3Desc': 'NFC access control and data protection on every operation.',
    'login.f4Title': 'Everything in real time', 'login.f4Desc': 'Up-to-date information to give your guests the best experience.',
    'login.secureNotice': '<strong>Secure access</strong>, exclusive to authorized staff. Every action is logged.',
    'login.heading': 'Sign in', 'login.sub': "Access SmartStay's admin panel",
    'login.email': 'Email', 'login.emailPlaceholder': 'example@hotel.com', 'login.password': 'Password', 'login.remember': 'Remember me',
    'login.forgot': 'Forgot your password?', 'login.submit': 'Sign in', 'login.or': 'or continue with',
    'login.cgo': 'CGO access', 'login.restrictedTitle': 'Restricted access',
    'login.restrictedDesc': "This area is for hotel staff only. If you don't have an account, <a href=\"registro-staff.html\" style=\"color:var(--blue-primary); font-weight:600;\">register here</a>.",
    'login.help': 'Need help?',
    'gnav.home': 'Home', 'gnav.checkin': 'Check-in', 'gnav.stay': 'My stay',
    'gnav.services': 'Services', 'gnav.account': 'My account', 'gnav.help': 'Support', 'gnav.logout': 'Log out',
    'common.noCharge': 'No charge',
    'billing.room': 'Room', 'billing.night': 'night', 'billing.nights': 'nights',
    'ci.step1Title': 'Find reservation', 'ci.step1Desc': 'Locate your reservation',
    'ci.step2Title': 'Personal info', 'ci.step2Desc': 'Verify your information',
    'ci.step3Title': 'ID document', 'ci.step3Desc': 'Confirm your document',
    'ci.step4Title': 'Confirm room', 'ci.step4Desc': 'Review your assignment',
    'ci.step5Title': 'Terms and conditions', 'ci.step5Desc': 'Accept the terms',
    'ci.step6Title': 'Check-in record', 'ci.step6Desc': 'Digital signature and record',
    'ci.step7Title': 'Check-in complete', 'ci.step7Desc': "You're set! Enjoy your stay",
    'ci.title': 'Digital check-in', 'ci.subtitle': 'Complete the steps to register your arrival at the hotel.',
    'ci.secureTitle': 'Your information is secure', 'ci.secureDesc': 'We use advanced technology to protect your personal data.',
    'ci.yourReservation': 'Your reservation', 'ci.reservaPlaceholder': "We'll look up your reservation to show a summary here.",
    'ci.feature1Title': '100% digital check-in', 'ci.feature1Desc': 'Fast, comfortable, and secure.',
    'ci.feature2Desc': 'Your phone opens your room and authorized areas.',
    'ci.feature3Title': 'Everything on your phone', 'ci.feature3Desc': 'Manage your stay easily and securely.',
    'ci.helpDesc': 'Our front desk team is available 24 hours a day.',
    'ci.call': 'Call', 'ci.reception': 'Front desk', 'ci.receptionNotified': 'The front desk has been notified',
    'svc.title': 'Hotel services', 'svc.subtitle': "Request the services you need — they'll be charged directly to your room.",
    'svc.all': 'All', 'svc.spa': 'Spa & wellness', 'svc.laundry': 'Laundry', 'svc.cleaning': 'Housekeeping', 'svc.transport': 'Transport',
    'cta.back': 'Back to my stay', 'cta.title': 'My account', 'cta.subtitle': 'Manage your personal information, billing, and preferences.',
    'cta.personalData': 'Personal information', 'cta.firstName': 'First name', 'cta.lastName': 'Last name', 'cta.phone': 'Phone', 'cta.save': 'Save changes',
    'cta.history': 'Previous stays',
    'cta.preferences': 'Preferences', 'cta.pushTitle': 'Push notifications', 'cta.pushDesc': 'Get alerts about your stay and services.',
    'cta.offersTitle': 'Offers and news', 'cta.offersDesc': 'Receive SmartStay promotions by email.', 'cta.prefUpdated': 'Preference updated',
    'cta.billing': 'Stay billing', 'cta.downloadReceipt': 'Download receipt', 'cta.total': 'Total',
    'cta.finishStay': 'Finish your stay', 'cta.finishStayDesc': "When you're ready to leave, confirm your check-out. We'll verify your account and free up the room for the hotel.",
    'cta.confirmCheckout': 'Confirm check-out',
    'info.title': 'Hotel information', 'info.subtitle': 'Everything you need to know during your stay.',
    'info.network': 'Network', 'info.password': 'Password', 'info.copy': 'Copy', 'info.hours': 'Hours',
    'info.breakfast': 'Breakfast', 'info.pool': 'Pool', 'info.gym': 'Gym',
    'info.amenities': 'Hotel amenities', 'info.amenity1': 'Heated pool', 'info.amenity2': '24-hour gym',
    'info.amenity4': 'Restaurant and 24/7 room service', 'info.amenity5': 'Private parking',
    'info.locationContact': 'Location and contact',
    'asis.subtitle': "We're available 24 hours a day to help with anything you need.",
    'asis.faq': 'Frequently asked questions',
    'asis.q1': 'How do I open my room door?',
    'asis.a1': 'Hold your phone near the NFC tag on the door, or tap "Open my room" in "My stay". Your phone is your key and it turns on by itself once you complete digital check-in. If your phone has no NFC, ask for a physical card (optional) from "My stay" or at the front desk.',
    'asis.q2': 'Can I change my check-out time?',
    'asis.a2': 'Yes — message us on WhatsApp or contact the front desk at least 3 hours ahead to arrange a late check-out, subject to availability.',
    'asis.q3': 'How do I request a service to my room?',
    'asis.a3': 'Go to the "Services" section from the main menu, choose what you need, and tap "Request." It\'s charged to your room automatically.',
    'asis.q4': 'What do I do if I lose my phone or my card?',
    'asis.a4': "Block the key from \"My stay\" (\"I lost my phone\" or \"I lost my card\" button; you can sign in from another phone with your reservation code) or tell the front desk. A blocked key stops opening your door and the front desk re-enables it or hands you a new one.",
    'asis.writeUs': 'Message us', 'asis.subject': 'Subject', 'asis.message': 'Message', 'asis.sendMessage': 'Send message',
    'asis.messageSent': 'Message sent!', 'asis.willReply': "Our team will get back to you shortly.",
    'asis.directContact': 'Direct contact', 'asis.replyMinutes': 'Reply within minutes', 'asis.chat': 'Chat',
    'asis.callReception': 'Call the front desk', 'asis.write': 'Email', 'asis.groundFloor': 'Ground floor · 24 hours',
    'asis.notify': 'Notify', 'asis.avgResponse': 'Average response time: under 5 minutes.',
    'portal.welcome': 'Welcome!', 'portal.subtitle': "Here's what's happening in your stay today.",
    'portal.qServicesDesc': 'Request room service, spa, and more.', 'portal.qAccountDesc': 'Details, billing, and preferences.',
    'portal.qInfo': 'Information', 'portal.qInfoDesc': 'Wi-Fi, hours, and hotel info.',
    'portal.qHelpDesc': 'Reach the front desk 24/7.',
    'portal.qProfile': 'My profile', 'portal.qProfileDesc': 'Edit your personal information.',
    'portal.qMore': 'More', 'portal.qMoreDesc': 'All the available options.',
    'portal.spending': 'Spending', 'portal.notifications': 'Notifications',
    'portal.greeting': 'Hi, ', 'portal.room': 'Room', 'portal.checkinActive': 'Check-in active',
    'portal.cardNo': 'No.', 'portal.cardBlocked': 'Blocked', 'portal.lostCard': 'I lost my card',
    'portal.lostCardConfirm': 'Block your NFC card? It will stop opening your room and you can ask the front desk for a new one.',
    'portal.cardBlockedToast': 'Card blocked. Ask the front desk for a new one.',
    'portal.stayTotal': 'Stay total', 'portal.noServicesYet': "You haven't requested any service yet.",
    'portal.checkinConfirmedTitle': 'Check-in confirmed',
    'portal.completed': 'Completed', 'portal.inProgress': 'In progress', 'portal.requestReceived': 'Request received',
    'portal.checkoutReminderTitle': 'Check-out reminder', 'portal.departureIs': 'Your departure is',
    'portal.coordinateWithReception': 'to be coordinated with the front desk',
    'key.phoneTitle': 'Digital key on your phone', 'key.phoneActive': 'Active', 'key.phoneBlockedPill': 'Blocked',
    'key.phoneDescActive': 'Hold your phone near the NFC tag on the door, or tap "Open my room".',
    'key.phoneDescBlocked': 'Your digital key is blocked. Tell the front desk to re-enable it.',
    'key.openRoom': 'Open my room', 'key.lostPhone': 'I lost my phone',
    'key.lostPhoneConfirm': 'Block your phone\'s digital key? It will stop opening your room until the front desk re-enables it.',
    'key.phoneBlockedToast': 'Phone key blocked. Tell the front desk.',
    'key.cardTitle': 'Physical card (optional)',
    'key.cardDescNone': 'Your phone has no NFC? Ask for a card at the front desk.', 'key.cardRequest': 'Ask for a card',
    'key.cardRequestedPill': 'Requested', 'key.cardRequested': 'Request sent: pick up your card at the front desk.', 'key.cardRequestedToast': 'We told the front desk: pick up your card there.',
    'key.cardActiveDesc': 'Hold it near the door reader to get in.',
    'key.cardBlockedDesc': 'Your card is blocked. Ask the front desk for a new one.',
    'key.notifPhone': 'Your phone is already your key: hold it near the NFC tag on your door.',
    'key.notifPhoneBlocked': 'Your phone key is blocked. Tell the front desk.',
    'door.title': 'Door', 'door.room': 'Room', 'door.common': 'Common areas', 'door.open': 'Door open', 'door.denied': 'Could not open',
    'door.opening': 'Checking your key…', 'door.retry': 'Try again', 'door.backToStay': 'Go to my stay',
    'door.needLogin': 'To open the door with your phone, sign in first with your reservation code.', 'door.login': 'Sign in with my code',
    'door.openedMsg': 'Come in and enjoy your stay.', 'door.demoNote': 'Demo: no physical lock is connected; the system simulates the opening and logs it.',
    'door.r.blocked': 'Your key is blocked. Tell the front desk.', 'door.r.ended': 'Your stay has ended.', 'door.r.nostay': 'You have not completed check-in yet.',
    'door.r.wrongDoor': 'This is not your room\'s door.', 'door.r.wrongHotel': 'This door belongs to another hotel.',
    'door.r.unknown': 'We could not find your reservation.', 'door.r.error': 'We could not check your key. Check your connection.',
    'pay.title': 'Pay my bill', 'pay.total': 'Stay total', 'pay.paid': 'Paid', 'pay.pendingCash': 'Cash to hand in at the front desk', 'pay.balance': 'Balance due',
    'pay.settled': 'Your bill is settled. Thank you!', 'pay.nothing': 'You have no charges to pay yet.',
    'pay.chooseWay': 'Choose how to pay',
    'pay.optCard': 'Credit or debit card', 'pay.optCardDesc': 'Pay now, right here.', 'pay.optCash': 'Cash at the front desk', 'pay.optCashDesc': 'Pay when you stop by the desk.',
    'pay.phName': 'FIRST LAST NAME', 'pay.phExpiry': 'MM/YY', 'pay.cardNumber': 'Card number', 'pay.cardName': 'Name on card', 'pay.cardExpiry': 'Expiry (MM/YY)', 'pay.cardCvv': 'CVV',
    'pay.payNow': 'Pay', 'pay.processing': 'Processing payment…',
    'pay.cashBtn': 'I will pay cash at the front desk', 'pay.cashInfo': 'We record your payment as pending: come to the front desk with the amount and they confirm it when they receive it.',
    'pay.testNote': 'Test-mode payments: no real money is charged. Test card: 4242 4242 4242 4242, any future date and 3 digits. We only keep the brand and the last 4 digits.',
    'pay.history': 'Payments for this stay', 'pay.byCard': 'Card', 'pay.byCash': 'Cash', 'pay.st.paid': 'Paid', 'pay.st.pending': 'Pending', 'pay.st.canceled': 'Voided',
    'pay.errNumber': 'Check the card number.', 'pay.errName': 'Enter the name printed on the card.', 'pay.errExpiry': 'Check the expiry date (MM/YY).', 'pay.errExpired': 'The card has expired.', 'pay.errCvv': 'Check the security code (CVV).',
    'pay.declined': 'The card was declined. Try another one.', 'pay.funds': 'Insufficient funds. Try another card or pay cash.',
    'pay.errAmount': 'That amount is not valid for your current balance.', 'pay.errNetwork': 'We could not record the payment. Check your connection and try again.', 'pay.errStay': 'Your stay is not active.',
    'pay.okCard': 'Payment approved! Thank you.', 'pay.okCash': 'Done: we told the front desk. Pay at the desk.',
    'pay.receiptPaid': 'PAID', 'pay.receiptBalance': 'BALANCE',
    'ci.keyTitle': 'NFC digital key', 'ci.doneText': 'Your registration was successful. Your phone is now your key: hold it near the NFC tag on your door or tap "Open my room" in your stay. If your phone has no NFC, you can ask for a physical card (optional) at the front desk.',
  },
};
function getLanguage() {
  return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'es';
}
function t(key) {
  const lang = getLanguage();
  return (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key;
}
function applyI18n() {
  const lang = getLanguage();
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.getAttribute('data-i18n-placeholder')); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { const v = t(el.getAttribute('data-i18n-aria')); el.setAttribute('aria-label', v); el.setAttribute('title', v); });
  document.querySelectorAll('.lang-code').forEach(el => { el.textContent = lang.toUpperCase(); });
}
function setLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang === 'en' ? 'en' : 'es');
  applyI18n();
  window.dispatchEvent(new Event('ss:lang'));
}
function initLangSelectors() {
  document.querySelectorAll('.lang-select').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => setLanguage(getLanguage() === 'es' ? 'en' : 'es'));
  });
}
document.addEventListener('DOMContentLoaded', () => { applyI18n(); initLangSelectors(); });

// Toggles the collapsible nav-links dropdown shown at narrow widths
// (the .mobile-menu-btn lives next to .nav-links / .app-nav-links inside
// the same .navbar-inner / .app-nav container).
function toggleMobileNav(btn) {
  const nav = btn.closest('.navbar-inner, .app-nav');
  const links = nav && nav.querySelector('.nav-links, .app-nav-links');
  if (links) links.classList.toggle('mobile-nav-open');
}
document.addEventListener('click', (e) => {
  const openLinks = document.querySelector('.nav-links.mobile-nav-open, .app-nav-links.mobile-nav-open');
  if (!openLinks) return;
  if (openLinks.contains(e.target) || e.target.closest('.mobile-menu-btn')) return;
  openLinks.classList.remove('mobile-nav-open');
});

function toggleAccordion(trigger) {
  const item = trigger.closest('.accordion-item');
  const panel = item.querySelector('.accordion-panel');
  const isOpen = item.classList.contains('open');
  item.classList.toggle('open', !isOpen);
  panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
}

function showSettingsTab(btn, panelId) {
  const group = btn.closest('.settings-tabs') || document;
  group.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const container = document.querySelector('[data-settings-panels]') || document;
  container.querySelectorAll('.settings-panel').forEach(p => p.setAttribute('hidden', ''));
  const panel = document.getElementById(panelId);
  if (panel) panel.removeAttribute('hidden');
}

// =========================================================
// Money: everything is in Paraguayan guaraníes (Gs.). The guaraní has no
// decimals, so amounts are whole numbers shown with dots as thousands
// separators (Gs. 40.000). Price fields use <input class="money-input">,
// which formats as you type; read them with getMoneyInput().
// =========================================================
const CURRENCY_SYMBOL = 'Gs.';
function formatNumberPy(n) {
  const v = Math.round(Number(n) || 0);
  return (v < 0 ? '-' : '') + String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function formatMoney(n) { return CURRENCY_SYMBOL + ' ' + formatNumberPy(n); }
// "40.000", "40000", "Gs. 40.000" -> 40000 (a comma starts decimals, which Gs. doesn't use)
function parseMoney(raw) {
  const d = String(raw == null ? '' : raw).split(',')[0].replace(/\D/g, '');
  return d ? parseInt(d, 10) : 0;
}
function setMoneyInput(el, n) { el.value = n ? formatNumberPy(n) : ''; }
function getMoneyInput(el) { return parseMoney(el.value); }
document.addEventListener('input', (e) => {
  const el = e.target;
  if (!el || !el.classList || !el.classList.contains('money-input')) return;
  const caret = el.selectionStart;
  const digitsBefore = el.value.slice(0, caret == null ? el.value.length : caret).replace(/\D/g, '').length;
  const digits = el.value.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 12);
  el.value = digits ? formatNumberPy(digits) : '';
  let i = 0, c = 0;
  while (i < el.value.length && c < digitsBefore) { if (/\d/.test(el.value[i])) c++; i++; }
  try { el.setSelectionRange(i, i); } catch (err) {}
});
// Price text of a service: custom text wins; otherwise "Gs. 35.000 / pedido"
// ("Desde Gs. ..." when the service's price is a starting price).
function servicePriceLabel(item) {
  if (item.priceLabel) return item.priceLabel;
  if (item.price > 0) return (item.priceFrom ? 'Desde ' : '') + formatMoney(item.price) + (item.unit ? ' ' + item.unit : '');
  return 'Sin cargo';
}

// ---- Guest identity (captured during check-in, used across guest pages) ----
const GUEST_KEY = 'ss_guest';

function saveGuestInfo(data) {
  const current = getGuestInfo() || {};
  localStorage.setItem(GUEST_KEY, JSON.stringify({ ...current, ...data }));
}

function getGuestInfo() {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function getGuestFullName() {
  const g = getGuestInfo();
  if (!g || !g.firstName) return null;
  return (g.firstName + ' ' + (g.lastName || '')).trim();
}

// Used on hotel-staff (admin) pages to reflect the checked-in guest's real
// name in the room 204 demo record, falling back to the sample name.
function getGuestFullNameOrDefault(fallback) {
  return getGuestFullName() || fallback;
}

function getGuestInitials() {
  const g = getGuestInfo();
  if (!g || !g.firstName) return 'H';
  return (g.firstName[0] + (g.lastName ? g.lastName[0] : '')).toUpperCase();
}

// Applies the saved guest name/email to common elements found on guest pages,
// if present on the page. Safe to call on every page load.
function applyGuestInfo() {
  const g = getGuestInfo();
  if (!g || !g.firstName) return;
  const fullName = getGuestFullName();

  document.querySelectorAll('[data-guest="first-name"]').forEach(el => el.textContent = g.firstName);
  document.querySelectorAll('[data-guest="full-name"]').forEach(el => el.textContent = fullName);
  document.querySelectorAll('[data-guest="initials"]').forEach(el => el.textContent = getGuestInitials());
  document.querySelectorAll('[data-guest="email"]').forEach(el => {
    if (el.tagName === 'INPUT') el.value = g.email || el.value;
    else el.textContent = g.email || el.textContent;
  });
  document.querySelectorAll('[data-guest="phone"]').forEach(el => {
    if (el.tagName === 'INPUT') el.value = g.phone || el.value;
    else el.textContent = g.phone || el.textContent;
  });
  document.querySelectorAll('[data-guest-input="first-name"]').forEach(el => el.value = g.firstName || el.value);
  document.querySelectorAll('[data-guest-input="last-name"]').forEach(el => el.value = g.lastName || el.value);
}

document.addEventListener('DOMContentLoaded', applyGuestInfo);

// =========================================================
// Persistent registries (localStorage) — real people who
// registered on this browser, replacing static sample data.
// =========================================================

function _readList(key) {
  if (SS_CLOUD && SS_COLL[key]) {
    if (key === 'ss_hotels_registry') ssLoadPublicHotels();
    try { return JSON.parse(SS_CACHE[key] || '[]'); } catch (e) { return []; }
  }
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function _writeList(key, list) {
  if (SS_CLOUD && SS_COLL[key]) { ssCloudWrite(key, list); return; }
  localStorage.setItem(key, JSON.stringify(list));
}

// =========================================================
// Cloud data (Supabase). When assets/config.js carries the project's URL
// and public key, every registry in this file lives in the cloud database
// instead of localStorage: the CGO sees every hotel, each hotel's staff
// sees their own hotel, and a guest only their own stay (permissions are
// enforced by the database itself — see nube/schema.sql). Without that
// config the site keeps working fully local, exactly as before.
//
// How it fits the rest of this file: at page load the data the signed-in
// person may see is fetched once into SS_CACHE, so every getter below stays
// synchronous; every write goes straight to the cloud and only updates the
// cache once the cloud accepted it.
// =========================================================
const SS_CFG = (typeof window !== 'undefined' && window.SS_CONFIG) || {};
const SS_CLOUD = !!(SS_CFG.supabaseUrl && SS_CFG.supabaseKey);
const SS_AUTH_KEY = 'ss_auth';
// Heavy photos live in their own table and are only downloaded when needed
const SS_FILE_FIELDS = { documentPhotoFront: 'docFront', documentPhotoBack: 'docBack', signature: 'signature', avatarPhoto: 'avatar' };
const SS_COLL = {
  ss_hotels_registry:  { table: 'hotels',           snap: 'hotels',    id: r => r.id },
  ss_staff_registry:   { table: 'profiles',         snap: 'staff',     id: r => r.id, profile: true },
  ss_cgo_registry:     { table: 'profiles',         snap: 'cgo',       id: r => r.id, profile: true },
  ss_guests_registry:  { table: 'guests',           snap: 'guests',    id: r => r.id, hotel: true, files: true },
  ss_rooms:            { table: 'rooms',            snap: 'rooms',     id: r => r.hotelId + ':' + r.n, hotel: true },
  ss_service_catalog:  { table: 'service_catalog',  snap: 'catalog',   id: r => r.hotelId + ':' + r.id, hotel: true },
  ss_service_requests: { table: 'service_requests', snap: 'requests',  id: r => r.id, hotel: true },
  ss_access_log:       { table: 'access_log',       snap: 'accessLog', id: r => r.id, hotel: true },
};
let SS_MODE = 'anon';   // 'staff' | 'cgo' | 'guest' | 'anon' (nobody signed in)
let SS_PROFILE = null;  // the signed-in staff / CGO profile
const SS_CACHE = {};    // collection key -> JSON string of its array
const SS_FILES = {};    // guestId -> { kind: dataUrl } downloaded on demand
let SS_WRITES = 0;      // bumps on every write so a slow refresh can't overwrite newer data
let SS_PUBLIC_LOADED = false;

// Synchronous request: the page's own scripts run right after this file
// and expect their data to be there, so the data load can't be async.
function ssHttp(method, path, body, opts) {
  opts = opts || {};
  const xhr = new XMLHttpRequest();
  xhr.open(method, SS_CFG.supabaseUrl.replace(/\/+$/, '') + path, false);
  xhr.setRequestHeader('apikey', SS_CFG.supabaseKey);
  const token = opts.token !== undefined ? opts.token : (opts.anon ? '' : ssAccessToken());
  if (token) xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  else if (SS_CFG.supabaseKey.split('.').length === 3) xhr.setRequestHeader('Authorization', 'Bearer ' + SS_CFG.supabaseKey);
  if (body !== undefined) xhr.setRequestHeader('Content-Type', 'application/json');
  if (opts.prefer) xhr.setRequestHeader('Prefer', opts.prefer);
  try {
    xhr.send(body === undefined ? null : JSON.stringify(body));
  } catch (e) {
    return { ok: false, status: 0, data: null, message: 'network' };
  }
  let data = null;
  try { data = xhr.responseText ? JSON.parse(xhr.responseText) : null; } catch (e) {}
  const message = data && (data.message || data.msg || data.error_description || data.error) || '';
  const code = data && (data.error_code || data.code) || '';
  return { ok: xhr.status >= 200 && xhr.status < 300, status: xhr.status, data, message: String(message), code: String(code) };
}
function ssRpc(name, args, opts) { return ssHttp('POST', '/rest/v1/rpc/' + name, args || {}, opts); }

function ssAuthRead() {
  try { const raw = localStorage.getItem(SS_AUTH_KEY); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
}
function ssAuthSave(s) {
  localStorage.setItem(SS_AUTH_KEY, JSON.stringify({
    access_token: s.access_token,
    refresh_token: s.refresh_token,
    expires_at: s.expires_at || (Math.floor(Date.now() / 1000) + (s.expires_in || 3600)),
    email: (s.user && s.user.email) || (ssAuthRead() || {}).email || '',
  }));
}
function ssAuthClear() { localStorage.removeItem(SS_AUTH_KEY); }
function ssAccessToken() { const a = ssAuthRead(); return a ? a.access_token : ''; }
// Renews the access token shortly before it expires. false = no valid session.
function ssAuthRefresh() {
  const a = ssAuthRead();
  if (!a) return false;
  if (a.expires_at - Date.now() / 1000 > 90) return true;
  const r = ssHttp('POST', '/auth/v1/token?grant_type=refresh_token', { refresh_token: a.refresh_token }, { anon: true });
  if (r.ok && r.data && r.data.access_token) { ssAuthSave(r.data); return true; }
  if (r.status >= 400 && r.status < 500) ssAuthClear();
  return false;
}

function ssPutCollections(map) {
  Object.keys(SS_COLL).forEach(key => { const v = map[SS_COLL[key].snap]; if (v) SS_CACHE[key] = JSON.stringify(v); });
}
function ssApplyAccountSnapshot(snap) {
  SS_PROFILE = snap.profile;
  SS_MODE = snap.profile.kind === 'cgo' ? 'cgo' : 'staff';
  SS_CACHE['ss_hotels_registry'] = '[]';
  ssPutCollections(snap);
}
function ssApplyGuestSnapshot(snap) {
  SS_MODE = 'guest';
  ssPutCollections({ hotels: snap.hotels, guests: [snap.guest], catalog: snap.catalog, requests: snap.requests, rooms: [], staff: [], cgo: [], accessLog: [] });
}
function ssGuestToken() { const gi = getGuestInfo(); return gi && gi.token ? gi.token : ''; }
// (Re)loads the guest's own stay from the cloud. false = no valid guest session.
function ssGuestBoot() {
  const gi = getGuestInfo();
  if (!gi || !gi.registeredGuestId || !gi.token) return false;
  const r = ssRpc('guest_snapshot', { p_id: gi.registeredGuestId, p_token: gi.token }, { anon: true });
  if (r.ok && r.data) { ssApplyGuestSnapshot(r.data); return true; }
  if (r.status >= 400 && r.status < 500) {
    // the session is no longer valid (reservation removed, token revoked...)
    const rest = { ...gi }; delete rest.registeredGuestId; delete rest.token;
    localStorage.setItem(GUEST_KEY, JSON.stringify(rest));
  }
  return false;
}
function ssCloudBoot() {
  if (!SS_CLOUD) return;
  if (ssAuthRead() && ssAuthRefresh()) {
    const r = ssRpc('app_snapshot');
    if (r.ok && r.data && r.data.profile) { ssApplyAccountSnapshot(r.data); return; }
    if (r.status === 401 || r.status === 403) ssAuthClear();
  }
  ssGuestBoot();
}
// Visitors with no session only need the public hotel list (to pick a hotel
// when registering staff) — fetched lazily, never on pages that don't ask.
function ssLoadPublicHotels() {
  if (SS_MODE !== 'anon' || SS_PUBLIC_LOADED) return;
  SS_PUBLIC_LOADED = true;
  const r = ssRpc('public_hotels', {}, { anon: true });
  if (r.ok && Array.isArray(r.data)) SS_CACHE['ss_hotels_registry'] = JSON.stringify(r.data);
}

function ssNotifyError(msg) {
  try { showToast(msg); } catch (e) {}
  console.warn('[SmartStay cloud]', msg);
}
function ssRowBody(spec, r) {
  const data = { ...r };
  if (spec.table === 'hotels') delete data.staffCode;
  if (spec.profile) ['id', 'email', 'hotelId', 'kind', 'password', 'staffCode'].forEach(k => delete data[k]);
  const files = {};
  if (spec.files) {
    Object.keys(SS_FILE_FIELDS).forEach(f => {
      if (data[f] && data[f] !== '@file') files[SS_FILE_FIELDS[f]] = data[f];
      delete data[f];
    });
  }
  return { data, files };
}
function ssWithPlaceholders(spec, r, prev, files) {
  const out = { ...r };
  if (!spec.files) return out;
  Object.keys(SS_FILE_FIELDS).forEach(f => {
    if (files[SS_FILE_FIELDS[f]] || r[f] === '@file' || (prev && prev[f] === '@file' && r[f])) out[f] = '@file';
  });
  return out;
}
function ssEnc(v) { return encodeURIComponent(v); }

// Saves one added/changed row. Returns the record as stored, or null if the
// cloud refused it (no permission, no connection...).
function ssPersistRow(key, spec, r, prev) {
  if (SS_MODE === 'guest') return ssGuestPersist(key, r, prev);
  if (SS_MODE !== 'staff' && SS_MODE !== 'cgo') { ssNotifyError('Iniciá sesión para guardar los cambios.'); return null; }
  if (!ssAuthRefresh()) { ssNotifyError('Tu sesión expiró. Iniciá sesión de nuevo.'); return null; }
  const id = spec.id(r);
  const { data, files } = ssRowBody(spec, r);
  let res;
  // When this changes an existing row, only the fields THIS page changed are
  // sent on top of what the cloud holds right now. Otherwise a page with
  // slightly old data (e.g. reception's screen) would wipe what someone else
  // saved meanwhile — like a guest's payment or a blocked key.
  let merged = null;
  if (prev) {
    let body = data;
    const fresh = ssHttp('GET', '/rest/v1/' + spec.table + '?id=eq.' + ssEnc(id) + '&select=data');
    if (fresh.ok && Array.isArray(fresh.data) && fresh.data[0] && fresh.data[0].data) {
      const base = ssRowBody(spec, prev).data;
      body = { ...fresh.data[0].data };
      Object.keys(data).forEach(k => {
        if (JSON.stringify(data[k]) === JSON.stringify(base[k])) return;
        if (data[k] === undefined) delete body[k]; else body[k] = data[k];
      });
      Object.keys(base).forEach(k => { if (!(k in data)) delete body[k]; });
      merged = body;
    }
    res = ssHttp('PATCH', '/rest/v1/' + spec.table + '?id=eq.' + ssEnc(id), { data: body }, { prefer: 'return=representation' });
    if (res.ok && Array.isArray(res.data) && !res.data.length) res = { ok: false, status: 403, message: 'sin permiso' };
  } else if (spec.profile) {
    return null; // accounts are only created by registering (claim_staff / claim_cgo)
  } else {
    const row = { id, data };
    if (spec.hotel) {
      if (!r.hotelId) { ssNotifyError('Falta el hotel de este registro.'); return null; }
      row.hotel_id = r.hotelId;
    }
    res = ssHttp('POST', '/rest/v1/' + spec.table, row, { prefer: 'return=representation' });
  }
  if (!res.ok) { ssNotifyError('No se pudo guardar en la nube: ' + (res.message || 'error ' + res.status)); return null; }
  // photos go to their own table
  for (const kind of Object.keys(files)) {
    const fr = ssHttp('POST', '/rest/v1/guest_files?on_conflict=guest_id,kind', [{ guest_id: id, kind, content: files[kind] }], { prefer: 'resolution=merge-duplicates,return=minimal' });
    if (!fr.ok) { ssNotifyError('No se pudo guardar una foto: ' + (fr.message || fr.status)); continue; }
    (SS_FILES[id] = SS_FILES[id] || {})[kind] = files[kind];
  }
  if (spec.files) {
    Object.keys(SS_FILE_FIELDS).forEach(f => {
      if (prev && prev[f] && !r[f]) ssHttp('DELETE', '/rest/v1/guest_files?guest_id=eq.' + ssEnc(id) + '&kind=eq.' + SS_FILE_FIELDS[f]);
    });
  }
  let out = ssWithPlaceholders(spec, r, prev, files);
  if (merged) {
    const withPh = out;
    out = { ...merged };
    Object.keys(SS_FILE_FIELDS).forEach(f => { if (withPh[f]) out[f] = withPh[f]; else delete out[f]; });
  }
  if (spec.table === 'hotels') {
    const row = Array.isArray(res.data) && res.data[0];
    out.staffCode = (row && row.staff_code) || (prev && prev.staffCode) || '';
  }
  return out;
}
function ssRemoveRow(key, spec, prev) {
  if (SS_MODE !== 'staff' && SS_MODE !== 'cgo') { ssNotifyError('No tenés permiso para eliminar esto.'); return false; }
  if (!ssAuthRefresh()) { ssNotifyError('Tu sesión expiró. Iniciá sesión de nuevo.'); return false; }
  const res = ssHttp('DELETE', '/rest/v1/' + spec.table + '?id=eq.' + ssEnc(spec.id(prev)), undefined, { prefer: 'return=representation' });
  if (!res.ok || (Array.isArray(res.data) && !res.data.length)) {
    ssNotifyError('No se pudo eliminar: ' + (res.message || 'sin permiso'));
    return false;
  }
  return true;
}
// A guest has no database account: they can only edit their own record and
// add service requests, always through functions that check their token.
function ssGuestPersist(key, r, prev) {
  const info = getGuestInfo() || {};
  const token = ssGuestToken();
  if (key === 'ss_guests_registry' && prev && prev.id === info.registeredGuestId) {
    const changes = {};
    const files = {};
    Object.keys(r).forEach(k => {
      if (JSON.stringify(r[k]) === JSON.stringify(prev[k])) return;
      if (SS_FILE_FIELDS[k]) { if (r[k] && r[k] !== '@file') files[SS_FILE_FIELDS[k]] = r[k]; }
      else changes[k] = r[k];
    });
    let rec = prev;
    if (Object.keys(changes).length) {
      const res = ssRpc('guest_save', { p_id: prev.id, p_token: token, p_changes: changes }, { anon: true });
      if (!res.ok) { ssNotifyError('No se pudo guardar en la nube: ' + (res.message || 'error ' + res.status)); return null; }
      rec = res.data;
    }
    for (const kind of Object.keys(files)) {
      const fr = ssRpc('guest_save_file', { p_id: prev.id, p_token: token, p_kind: kind, p_content: files[kind] }, { anon: true });
      if (!fr.ok) { ssNotifyError('No se pudo guardar una foto: ' + (fr.message || fr.status)); continue; }
      (SS_FILES[prev.id] = SS_FILES[prev.id] || {})[kind] = files[kind];
      Object.keys(SS_FILE_FIELDS).forEach(f => { if (SS_FILE_FIELDS[f] === kind) rec = { ...rec, [f]: '@file' }; });
    }
    return rec;
  }
  if (key === 'ss_service_requests' && !prev) {
    const res = ssRpc('guest_add_request', { p_id: info.registeredGuestId, p_token: token, p_request: r }, { anon: true });
    if (!res.ok) { ssNotifyError('No se pudo enviar la solicitud: ' + (res.message || 'error ' + res.status)); return null; }
    return res.data;
  }
  return prev || null; // everything else is read-only for guests
}
function ssCloudWrite(key, list) {
  const spec = SS_COLL[key];
  const prev = JSON.parse(SS_CACHE[key] || '[]');
  const prevMap = new Map(prev.map(r => [spec.id(r), r]));
  const result = [];
  const seen = new Set();
  let changed = false;
  list.forEach(r => {
    const id = spec.id(r);
    if (seen.has(id)) return;
    seen.add(id);
    const p = prevMap.get(id);
    if (p && JSON.stringify(p) === JSON.stringify(r)) { result.push(r); return; }
    changed = true;
    const saved = ssPersistRow(key, spec, r, p);
    if (saved) result.push(saved); else if (p) result.push(p);
  });
  prevMap.forEach((p, id) => {
    if (seen.has(id)) return;
    changed = true;
    if (!ssRemoveRow(key, spec, p)) result.push(p);
  });
  SS_CACHE[key] = JSON.stringify(result);
  if (changed) SS_WRITES++;
}

// Puts a guest record that a database function just returned into the cache
function ssReplaceCachedGuest(rec) {
  const key = 'ss_guests_registry';
  const list = JSON.parse(SS_CACHE[key] || '[]');
  const i = list.findIndex(x => x.id === rec.id);
  if (i >= 0) list[i] = rec; else list.push(rec);
  SS_CACHE[key] = JSON.stringify(list);
  SS_WRITES++;
}
// Saves many rows at once (one request per table instead of one per row).
// New rows are added; with { upsert: true } rows that already exist are
// replaced, otherwise they are left alone. Returns how many were sent.
function ssBulkInsert(key, rows, opts) {
  const upsert = !!(opts && opts.upsert);
  const spec = SS_COLL[key];
  if (!rows.length) return 0;
  if (SS_MODE !== 'staff' && SS_MODE !== 'cgo') { ssNotifyError('Iniciá sesión para guardar los cambios.'); return 0; }
  if (!ssAuthRefresh()) { ssNotifyError('Tu sesión expiró. Iniciá sesión de nuevo.'); return 0; }
  const body = rows.map(r => {
    const row = { id: spec.id(r), data: ssRowBody(spec, r).data };
    if (spec.hotel) row.hotel_id = r.hotelId;
    return row;
  });
  const res = ssHttp('POST', '/rest/v1/' + spec.table + '?on_conflict=id', body, { prefer: 'resolution=' + (upsert ? 'merge-duplicates' : 'ignore-duplicates') + ',return=minimal' });
  if (!res.ok) { ssNotifyError('No se pudo guardar en la nube: ' + (res.message || 'error ' + res.status)); return 0; }
  const cached = JSON.parse(SS_CACHE[key] || '[]');
  const byId = new Map(rows.map(r => [spec.id(r), r]));
  const kept = cached.map(r => (upsert && byId.has(spec.id(r))) ? byId.get(spec.id(r)) : r);
  const ids = new Set(cached.map(spec.id));
  SS_CACHE[key] = JSON.stringify(kept.concat(rows.filter(r => !ids.has(spec.id(r)))));
  SS_WRITES++;
  return rows.length;
}

// Real photos for a guest record whose photo fields hold the "@file" marker
function ensureGuestFiles(g) {
  if (!SS_CLOUD || !g) return g;
  Object.keys(SS_FILE_FIELDS).forEach(f => {
    if (g[f] !== '@file') return;
    const kind = SS_FILE_FIELDS[f];
    let content = SS_FILES[g.id] && SS_FILES[g.id][kind];
    if (!content) {
      if (SS_MODE === 'guest') {
        const r = ssRpc('guest_get_file', { p_id: g.id, p_token: ssGuestToken(), p_kind: kind }, { anon: true });
        content = r.ok ? r.data : '';
      } else {
        const r = ssHttp('GET', '/rest/v1/guest_files?guest_id=eq.' + ssEnc(g.id) + '&kind=eq.' + kind + '&select=content');
        content = r.ok && r.data && r.data[0] ? r.data[0].content : '';
      }
      if (content) (SS_FILES[g.id] = SS_FILES[g.id] || {})[kind] = content;
    }
    g[f] = content || '';
  });
  return g;
}

// Keeps what's on screen current when someone else (a colleague, a guest,
// the CGO) changes data: re-checks the cloud every few seconds and, if
// anything differs, tells the page to redraw via window.ssRefreshPage().
// For pages without forms: reload to show fresh data, but never while
// someone is typing or a window is open (it would throw their work away).
function ssReloadIfIdle() {
  const a = document.activeElement;
  const typing = a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName);
  const modal = document.querySelector('.modal-overlay:not([hidden])');
  if (!typing && !modal) window.location.reload();
}
let ssPolling = false;
async function ssPollOnce() {
  if (!SS_CLOUD || ssPolling || document.hidden) return;
  if (SS_MODE === 'anon') return;
  ssPolling = true;
  const version = SS_WRITES;
  try {
    let url, body, token;
    if (SS_MODE === 'guest') {
      const info = getGuestInfo() || {};
      url = '/rest/v1/rpc/guest_snapshot'; body = { p_id: info.registeredGuestId, p_token: ssGuestToken() }; token = '';
    } else {
      if (!ssAuthRefresh()) return;
      url = '/rest/v1/rpc/app_snapshot'; body = {}; token = ssAccessToken();
    }
    const headers = { apikey: SS_CFG.supabaseKey, 'Content-Type': 'application/json' };
    if (token) headers.Authorization = 'Bearer ' + token;
    else if (SS_CFG.supabaseKey.split('.').length === 3) headers.Authorization = 'Bearer ' + SS_CFG.supabaseKey;
    const res = await fetch(SS_CFG.supabaseUrl.replace(/\/+$/, '') + url, { method: 'POST', headers, body: JSON.stringify(body) });
    if (!res.ok) return;
    const snap = await res.json();
    if (version !== SS_WRITES) return; // something was saved meanwhile: this answer may be older
    const before = JSON.stringify(SS_CACHE);
    if (SS_MODE === 'guest') ssApplyGuestSnapshot(snap); else if (snap.profile) ssApplyAccountSnapshot(snap);
    if (JSON.stringify(SS_CACHE) !== before) {
      if (typeof window.ssRefreshPage === 'function') { try { window.ssRefreshPage(); } catch (e) { console.warn(e); } }
      window.dispatchEvent(new CustomEvent('ss:data'));
    }
  } catch (e) { /* offline: try again at the next tick */ }
  finally { ssPolling = false; }
}
function ssStartPolling() {
  if (!SS_CLOUD || SS_MODE === 'anon') return;
  setInterval(ssPollOnce, 12000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) ssPollOnce(); });
}
function _newId(prefix) {
  return prefix + '_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

// ---- Hotels registry — affiliated hotels managed by SmartStay's own
// central (CGO) staff. Every hotel-scoped record below (guests, rooms,
// service requests, staff) carries a hotelId so each affiliated hotel's
// data stays completely isolated from every other hotel's. ----
const HOTELS_KEY = 'ss_hotels_registry';

function getHotelsRegistry() {
  const list = _readList(HOTELS_KEY);
  if (list.length || SS_CLOUD) return list;
  // Seeds the original demo hotel so existing flows (and a fresh visitor
  // who hasn't used the CGO panel yet) keep working out of the box.
  const seeded = [{ id: 'h_default', createdAt: new Date().toISOString(), active: true, gsMigrated: true, ...DEFAULT_HOTEL }];
  saveHotelsRegistry(seeded);
  return seeded;
}
function saveHotelsRegistry(list) {
  _writeList(HOTELS_KEY, list);
}
function registerHotel(data) {
  const list = getHotelsRegistry();
  // Gives every newly-affiliated hotel its own distinct Wi-Fi network by
  // default (instead of silently reusing the demo hotel's), even before
  // its own staff customize it from Configuración.
  const slug = (data.name || 'Hotel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const record = {
    id: _newId('h'),
    createdAt: new Date().toISOString(),
    active: true,
    gsMigrated: true, // born in guaraníes: nothing to convert
    wifiName: slug + '_Guest',
    wifiPassword: 'bienvenido' + Math.floor(1000 + Math.random() * 9000),
    ...data,
  };
  list.unshift(record);
  saveHotelsRegistry(list);
  return record;
}
function updateHotel(id, changes) {
  const list = getHotelsRegistry();
  const idx = list.findIndex(h => h.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...changes };
  saveHotelsRegistry(list);
  return list[idx];
}
function getHotelById(id) {
  return getHotelsRegistry().find(h => h.id === id) || null;
}

// Resolves which affiliated hotel the CURRENT session belongs to — the
// logged-in staff member's own hotel, or the hotel of the reservation the
// current guest matched during check-in. Every hotel-scoped getter/setter
// below filters through this so one hotel's data never leaks into another's.
function getActiveHotelId() {
  if (SS_CLOUD && SS_MODE === 'staff' && SS_PROFILE) return SS_PROFILE.hotelId || null;
  const staffEmail = SS_CLOUD ? null : localStorage.getItem(CURRENT_STAFF_KEY);
  if (staffEmail) {
    const staff = _readList(STAFF_KEY).find(s => (s.email || '').toLowerCase() === staffEmail.toLowerCase());
    if (staff && staff.hotelId) return staff.hotelId;
  }
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    const info = raw ? JSON.parse(raw) : null;
    if (info && info.registeredGuestId) {
      const g = _readList(GUESTS_KEY).find(x => x.id === info.registeredGuestId);
      if (g) return g.hotelId || null;
    }
  } catch (e) {}
  return null;
}

// ---- Guests registry (scoped to the active hotel) ----
const GUESTS_KEY = 'ss_guests_registry';

function getGuestsRegistry() {
  const hid = getActiveHotelId();
  return _readList(GUESTS_KEY).filter(g => g.hotelId === hid);
}
function saveGuestsRegistry(list) {
  const hid = getActiveHotelId();
  const others = _readList(GUESTS_KEY).filter(g => g.hotelId !== hid);
  _writeList(GUESTS_KEY, [...others, ...list]);
}
function _generateReservationCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous 0/O/1/I
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function registerGuest(data) {
  const all = _readList(GUESTS_KEY);
  const record = {
    id: _newId('g'),
    status: 'activo',
    createdAt: new Date().toISOString(),
    reservationCode: _generateReservationCode(),
    hotelId: getActiveHotelId(),
    ...data,
  };
  all.unshift(record);
  _writeList(GUESTS_KEY, all);
  return record;
}
function updateGuest(id, changes) {
  const all = _readList(GUESTS_KEY);
  const idx = all.findIndex(g => g.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...changes };
  _writeList(GUESTS_KEY, all);
  return all[idx];
}
// Cancels a still-pending reservation with a real reason, keeping the
// record (for history/audit) instead of deleting it outright. A canceled
// reservation's code stops matching in findPendingReservation, so it can
// no longer be used for check-in.
function cancelReservation(id, reason) {
  return updateGuest(id, { status: 'cancelada', cancelReason: reason || '', canceledAt: new Date().toISOString() });
}

// Looks up a real, still-pending reservation (created by staff via "Nuevo
// huésped") by reservation code, last name, or ID document number — this
// is what check-in step 1 matches against instead of accepting anything.
// Searches ACROSS every affiliated hotel (unscoped) since a guest doesn't
// know their hotel's internal id yet — the match itself is what tells us.
function findPendingReservation({ code, lastname, documentNumber } = {}) {
  if (SS_CLOUD) return ssFindReservation({ code, lastname, documentNumber });
  const norm = s => (s || '').trim().toLowerCase();
  const pending = _readList(GUESTS_KEY).filter(g => g.status === 'pendiente');
  if (code) {
    const m = pending.find(g => g.reservationCode && norm(g.reservationCode) === norm(code));
    if (m) return m;
  }
  if (lastname) {
    const m = pending.find(g => norm(g.lastName) === norm(lastname));
    if (m) return m;
  }
  if (documentNumber) {
    const m = pending.find(g => g.documentNumber && norm(g.documentNumber) === norm(documentNumber));
    if (m) return m;
  }
  return null;
}

// Parses a room string like "305 · Doble" into {n, type, floor}, using the
// real room inventory for type/floor when the number matches a known room.
function roomInfoFromString(roomStr) {
  const parts = (roomStr || '').split('·').map(s => s.trim());
  const n = parseInt(parts[0], 10);
  if (!n) return null;
  const inv = getRooms().find(r => r.n === n);
  return {
    n,
    type: inv ? inv.type : (parts[1] || ''),
    floor: inv ? inv.floor : Math.floor(n / 100),
  };
}
// Returns the full registry record for the guest currently using this
// browser session, or null if they haven't completed check-in yet.
function getMyGuestRecord() {
  const info = getGuestInfo() || {};
  if (!info.registeredGuestId) return null;
  return _readList(GUESTS_KEY).find(g => g.id === info.registeredGuestId) || null;
}

// Picks a real, currently-available room from the shared inventory so
// each guest gets assigned a distinct, actually-free room instead of a
// fixed placeholder. Returns null if the hotel is fully booked.
function assignAvailableRoom() {
  const free = getRoomsWithOccupancy().find(r => r.status === 'available');
  return free ? { n: free.n, type: free.type, floor: free.floor } : null;
}

function findGuestByRoom(roomPrefix) {
  return getGuestsRegistry().find(g => g.room && g.room.startsWith(roomPrefix) && g.status !== 'revocado');
}

// ---- Digital room key: the guest's phone, plus an optional physical card ----
// The phone IS the key. After digital check-in the guest's phone opens the
// room: they hold it near the NFC tag stuck on the door (or tap "Abrir mi
// habitación" in the app) and the system decides — by the stay it finds for
// that guest — whether the door opens. No app to install and no phone-side
// card emulation needed, so it works on any phone that can read an NFC tag
// (Android and iPhone alike).
// A physical NFC card is OPTIONAL, for guests whose phone has no NFC (or who
// simply prefer a card): the guest can ask for one from the portal and
// reception encodes it. Both keys live on the guest record:
//   phoneKeyStatus ('blocked' when lost; absent = active),
//   cardUid / cardStatus ('active' | 'blocked'; absent = no card),
//   cardRequested (the guest asked for a card), retiredCards (replaced UIDs).
// Every door read — granted or denied, phone or card — is kept in the log.
const ACCESS_LOG_KEY = 'ss_access_log';

function _generateCardUid() {
  // 7-byte UID like real NFC cards (first byte 04), shown as hex pairs
  const bytes = [0x04];
  for (let i = 0; i < 6; i++) bytes.push(Math.floor(Math.random() * 256));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join(':').toUpperCase();
}
// Last two bytes of a UID, enough for a guest to recognise their card.
function shortCardUid(uid) {
  return uid ? uid.split(':').slice(-2).join('') : '';
}
function _roomNumberOf(g) {
  return String((g && g.room) || '').split('·')[0].trim();
}
// A stay in progress is the only time any key works: pending reservations,
// canceled ones and checked-out stays have nothing to open.
function _stayInProgress(g) {
  return !!g && g.status !== 'pendiente' && g.status !== 'cancelada' && g.status !== 'checkout';
}
// State of the guest's PHONE key: 'none' (no stay in progress), 'active'
// (the default from check-in on) or 'blocked' (lost phone / reception).
function getPhoneKeyState(g) {
  if (!_stayInProgress(g)) return 'none';
  if (g.status === 'revocado' || g.phoneKeyStatus === 'blocked') return 'blocked';
  return 'active';
}
// State of the optional physical CARD: 'none' (no stay in progress),
// 'nocard' (stay in progress, no card — the normal case), 'active' or 'blocked'.
function getCardState(g) {
  if (!_stayInProgress(g)) return 'none';
  if (g.status === 'revocado') return 'blocked'; // older records from when the key was revoked per guest
  if (g.cardStatus === 'active' || g.cardStatus === 'blocked') return g.cardStatus;
  return 'nocard';
}
// reason: 'lost' (reported by the guest) or 'reception'
function blockPhoneKey(guestId, reason) {
  return updateGuest(guestId, { phoneKeyStatus: 'blocked', phoneKeyBlockReason: reason || 'reception', phoneKeyBlockedAt: new Date().toISOString() });
}
function unblockPhoneKey(guestId) {
  return updateGuest(guestId, { phoneKeyStatus: 'active', phoneKeyBlockReason: '' });
}
// The guest asks for a physical card (phone without NFC, or by preference).
function requestPhysicalCard(guestId) {
  return updateGuest(guestId, { cardRequested: true, cardRequestedAt: new Date().toISOString() });
}
// Who currently holds a card. Cards go back to reception at check-out and
// get reused, so several records can carry the same UID over time: the
// holder is the one it was issued to most recently.
function findCardOwner(uid) {
  return getGuestsRegistry()
    .filter(g => g.cardUid === uid)
    .sort((a, b) => (b.cardIssuedAt || '').localeCompare(a.cardIssuedAt || ''))[0] || null;
}
// Normalizes whatever reception types or a reader sends ("04:a2:3b...",
// "04-A2-3B...", "04A23B...") to "04:A2:3B:..."; '' if it isn't a UID.
function normalizeCardUid(raw) {
  const s = String(raw || '').trim();
  if (!/^[0-9a-f]+([:\-\s][0-9a-f]+)*$/i.test(s)) return '';
  const hex = s.replace(/[^0-9a-f]/gi, '').toUpperCase();
  if (hex.length < 8 || hex.length > 20 || hex.length % 2) return '';
  return hex.match(/.{2}/g).join(':');
}
// Links a physical card (by its UID) to a guest's stay and account. Returns
// { ok:true, guest } or { ok:false, error, owner }. If the guest already had
// a card, the old UID is retired so it stops opening doors (lost/replaced).
function assignCard(guestId, rawUid, method) {
  const uid = normalizeCardUid(rawUid);
  if (!uid) return { ok: false, error: 'invalid' };
  const g = _readList(GUESTS_KEY).find(x => x.id === guestId);
  if (!g) return { ok: false, error: 'noguest' };
  const owner = findCardOwner(uid);
  if (owner && owner.id !== guestId && getCardState(owner) !== 'none') return { ok: false, error: 'inuse', owner };
  const changes = {
    cardUid: uid,
    cardStatus: 'active',
    cardMethod: method || 'manual',
    cardIssuedAt: new Date().toISOString(),
    cardBlockReason: '',
    cardRequested: false,
    retiredCards: (g.retiredCards || []).filter(u => u !== uid).concat(g.cardUid && g.cardUid !== uid ? [g.cardUid] : []),
  };
  if (g.status === 'revocado') changes.status = 'activo';
  return { ok: true, guest: updateGuest(guestId, changes) };
}
// A card with a generated UID, for demos without a physical card.
function issueCard(guestId) {
  const r = assignCard(guestId, _generateCardUid(), 'virtual');
  return r.ok ? r.guest : null;
}
// reason: 'lost' (reported by the guest) or 'reception'
function blockCard(guestId, reason) {
  return updateGuest(guestId, { cardStatus: 'blocked', cardBlockReason: reason || 'reception', cardBlockedAt: new Date().toISOString() });
}

function getAccessLog() {
  const hid = getActiveHotelId();
  return _readList(ACCESS_LOG_KEY).filter(e => e.hotelId === hid).sort((a, b) => b.ts.localeCompare(a.ts));
}
// '' = the door opens; otherwise why it doesn't. credential: 'phone' | 'card'.
function _doorDenyReason(g, door, credential) {
  if (!g) return 'unknown';
  const state = credential === 'phone' ? getPhoneKeyState(g) : getCardState(g);
  if (state === 'blocked') return 'blocked';
  if (state === 'none') return g.status === 'checkout' ? 'ended' : 'nostay';
  if (state === 'nocard') return 'unknown';
  if (door !== 'common' && String(door) !== _roomNumberOf(g)) return 'wrongDoor';
  return '';
}
function _logDoorRead(entry) {
  const all = _readList(ACCESS_LOG_KEY);
  all.unshift({ id: _newId('a'), ts: new Date().toISOString(), hotelId: getActiveHotelId(), uid: '', guestId: '', guestName: '', ...entry });
  _writeList(ACCESS_LOG_KEY, all.slice(0, 1000));
}
// Simulates what a door's NFC reader + controller decide when a CARD is held
// against it. door is a room number, or 'common' for shared areas (gym,
// pool...). Every read — granted or denied — goes to the access log.
function tryDoorAccess(uid, door) {
  const guests = getGuestsRegistry();
  const owner = findCardOwner(uid);
  const previous = owner ? null : guests.find(g => (g.retiredCards || []).includes(uid));
  const g = owner || previous || null;
  const reason = previous ? 'replaced' : _doorDenyReason(g, String(door), 'card');
  const result = reason ? 'denied' : 'granted';
  _logDoorRead({
    uid, guestId: g ? g.id : '', guestName: g ? ((g.firstName || '') + ' ' + (g.lastName || '')).trim() : '',
    door: String(door), result, reason, credential: 'card',
  });
  return { result, reason, guest: g };
}
// The same decision for a guest's PHONE (used by reception's door test and
// by local mode). A guest's own phone goes through phoneDoorAccess().
function tryPhoneAccess(guestId, door) {
  const g = getGuestsRegistry().find(x => x.id === guestId) || null;
  const reason = _doorDenyReason(g, String(door), 'phone');
  const result = reason ? 'denied' : 'granted';
  _logDoorRead({
    guestId: g ? g.id : '', guestName: g ? ((g.firstName || '') + ' ' + (g.lastName || '')).trim() : '',
    door: String(door), result, reason, credential: 'phone',
  });
  return { result, reason, guest: g };
}
// The signed-in guest holds their phone against a door (the NFC tag / QR on
// it, or the "Abrir mi habitación" button). In the cloud the DATABASE decides
// from the guest's session and stay, and writes the access log itself.
// hotelId (from the door's tag) makes a tag of another hotel useless.
function phoneDoorAccess(door, hotelId) {
  door = String(door);
  const info = getGuestInfo() || {};
  if (SS_CLOUD && SS_MODE === 'guest') {
    const r = ssRpc('guest_door_open', { p_id: info.registeredGuestId, p_token: ssGuestToken(), p_door: door, p_hotel: hotelId || '' }, { anon: true });
    if (!r.ok || !r.data) {
      ssNotifyError('No se pudo comprobar la llave: ' + (r.message || 'error ' + r.status));
      return { result: 'denied', reason: 'error', guest: getMyGuestRecord() };
    }
    return { result: r.data.result, reason: r.data.reason, guest: getMyGuestRecord() };
  }
  const g = getMyGuestRecord();
  if (!g) return { result: 'denied', reason: 'nostay', guest: null };
  if (hotelId && g.hotelId && hotelId !== g.hotelId) {
    _logDoorRead({ guestId: g.id, guestName: ((g.firstName || '') + ' ' + (g.lastName || '')).trim(), door, result: 'denied', reason: 'wrongHotel', credential: 'phone' });
    return { result: 'denied', reason: 'wrongHotel', guest: g };
  }
  return tryPhoneAccess(g.id, door);
}
// Link that goes on each door's NFC sticker / QR: holding a phone to it opens
// this page, which asks the system to open that door for the signed-in guest.
function doorTagUrl(door, hotelId) {
  const base = location.origin + location.pathname.replace(/[^/]*$/, '');
  return base + 'puerta.html?h=' + encodeURIComponent(hotelId || getActiveHotelId() || '') + '&d=' + encodeURIComponent(door);
}

// ---- Reading and writing real NFC cards (Web NFC) ----
// Chrome on Android can read a tag's serial number and write NDEF data, but
// only over HTTPS and from a tap/click. Elsewhere (desktop, iPhone) reception
// types the card number or uses a USB reader that "types" it for them.
const NFC_SUPPORTED = typeof window !== 'undefined' && 'NDEFReader' in window;

// What gets written on the card: only a reference (reservation code + hotel),
// never the guest's name or room — a lost card must not reveal who sleeps
// where. The door's decision always comes from the UID looked up in the system.
function buildCardPayload(g) {
  const hotel = (getHotelInfo().name || 'Hotel').slice(0, 24);
  return ['SMARTSTAY', g.reservationCode || g.id, hotel].join('|');
}
function parseCardPayload(text) {
  if (!text || text.indexOf('SMARTSTAY|') !== 0) return null;
  const parts = text.split('|');
  return { code: parts[1] || '', hotel: parts[2] || '' };
}
// Waits for a card to be tapped and resolves { uid, text, written }. If
// writeText is given, it is written to the card as soon as it's read.
// Rejects with Error('unsupported' | 'timeout' | 'aborted' | 'readerror' |
// 'nouid') or the browser's own error (NotAllowedError, NotSupportedError).
function nfcTapCard({ timeoutMs = 30000, writeText = null, signal = null } = {}) {
  return new Promise((resolve, reject) => {
    if (!NFC_SUPPORTED) { reject(new Error('unsupported')); return; }
    const ctrl = new AbortController();
    let done = false;
    let timer = null;
    const finish = (fn, val) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try { ctrl.abort(); } catch (e) {}
      fn(val);
    };
    timer = setTimeout(() => finish(reject, new Error('timeout')), timeoutMs);
    if (signal) signal.addEventListener('abort', () => finish(reject, new Error('aborted')));
    const reader = new NDEFReader();
    reader.onreadingerror = () => finish(reject, new Error('readerror'));
    reader.onreading = async (e) => {
      if (done) return;
      const uid = normalizeCardUid(e.serialNumber);
      if (!uid) { finish(reject, new Error('nouid')); return; }
      let text = '';
      for (const rec of e.message.records) {
        if (rec.recordType === 'text') { text = new TextDecoder(rec.encoding || 'utf-8').decode(rec.data); break; }
      }
      let written = null;
      if (writeText) {
        const wctrl = new AbortController();
        const wtimer = setTimeout(() => wctrl.abort(), 10000);
        try {
          await reader.write({ records: [{ recordType: 'text', data: writeText }] }, { overwrite: true, signal: wctrl.signal });
          written = true;
        } catch (err) { written = false; }
        clearTimeout(wtimer);
      }
      finish(resolve, { uid, text, written });
    };
    reader.scan({ signal: ctrl.signal }).catch(err => finish(reject, err));
  });
}

// Everything the account holds for a stay, so a tapped card can show the
// guest's data: the services requested, the stay's running total and what
// has been paid so far.
function getGuestAccountSummary(g) {
  const hid = g.hotelId;
  const name = ((g.firstName || '') + ' ' + (g.lastName || '')).trim();
  const hotelInfo = { ...DEFAULT_HOTEL, ...(getHotelById(hid) || {}) };
  const total = _billingForGuestRecord(g, hid, hotelInfo);
  return {
    services: _servicesForGuestRecord(g, hid, name),
    total,
    ...paymentFigures(g, total),
  };
}

// =========================================================
// Payments. A guest settles the account from "Mi cuenta" with a bank card
// paid online (first option) or in cash at the front desk (second option).
// Payments live on the guest record: payments = [{ id, ts, method:'card'|'cash',
// amount, status:'paid'|'pending'|'canceled', brand, last4, ref, channel }].
//   • card  → 'paid' as soon as the payment gateway approves it.
//   • cash  → 'pending' until reception confirms it collected the money.
// The card number and CVV never leave the form: only brand + last 4 digits
// are stored. The gateway here (ssGatewayCharge) is a TEST-MODE stand-in; to
// charge real money, replace that one function with a call to a real
// provider (Bancard, Pagopar, Stripe...) — everything around it stays.
// =========================================================
function getPayments(g) {
  return Array.isArray(g && g.payments) ? g.payments : [];
}
// total: the stay's charges. paid = money already received, pendingCash =
// cash the guest promised to bring to reception, due = still to be received,
// toPay = what is still open for the guest to choose a way to pay.
function paymentFigures(g, total) {
  const pays = getPayments(g);
  const sum = st => pays.filter(p => p.status === st).reduce((a, p) => a + (p.amount || 0), 0);
  const paid = sum('paid');
  const pendingCash = sum('pending');
  return {
    payments: pays,
    paid,
    pendingCash,
    due: Math.max(0, total - paid),
    toPay: Math.max(0, total - paid - pendingCash),
  };
}

// ---- card form helpers (also used for live formatting in the page) ----
function luhnValid(digits) {
  const d = String(digits || '').replace(/\D/g, '');
  if (d.length < 12) return false;
  let sum = 0, dbl = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = d.charCodeAt(i) - 48;
    if (dbl) { n *= 2; if (n > 9) n -= 9; }
    sum += n; dbl = !dbl;
  }
  return sum % 10 === 0;
}
function detectCardBrand(digits) {
  const d = String(digits || '').replace(/\D/g, '');
  if (/^4/.test(d)) return 'Visa';
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(d)) return 'Mastercard';
  if (/^3[47]/.test(d)) return 'American Express';
  if (/^(6011|65|64[4-9])/.test(d)) return 'Discover';
  return '';
}
function formatCardNumber(raw) {
  const d = String(raw || '').replace(/\D/g, '').slice(0, 19);
  return (/^3[47]/.test(d) ? [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)] : (d.match(/.{1,4}/g) || [])).filter(Boolean).join(' ');
}
function formatCardExpiry(raw) {
  const d = String(raw || '').replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
}
// Returns { ok, errors: { number, name, expiry, cvv }, brand, last4 }.
function validateCardInput({ number, name, expiry, cvv }) {
  const errors = {};
  const digits = String(number || '').replace(/\D/g, '');
  const brand = detectCardBrand(digits);
  if (!luhnValid(digits) || digits.length < 13 || digits.length > 19) errors.number = 'invalid';
  if (!String(name || '').trim() || String(name).trim().length < 3) errors.name = 'invalid';
  const m = /^(\d{2})\/(\d{2})$/.exec(String(expiry || '').trim());
  if (!m || +m[1] < 1 || +m[1] > 12) errors.expiry = 'invalid';
  else {
    const now = new Date();
    const yy = now.getFullYear() % 100, mm = now.getMonth() + 1;
    if (+m[2] < yy || (+m[2] === yy && +m[1] < mm)) errors.expiry = 'expired';
  }
  const cvvLen = brand === 'American Express' ? 4 : 3;
  if (!new RegExp('^\\d{' + cvvLen + '}$').test(String(cvv || '').trim())) errors.cvv = 'invalid';
  return { ok: !Object.keys(errors).length, errors, brand, last4: digits.slice(-4) };
}
// TEST-MODE payment gateway. Resolves { approved, ref, reason }.
// Test cards (like any gateway's sandbox): 4242 4242 4242 4242 is approved,
// 4000 0000 0000 0002 is declined, 4000 0000 0000 9995 has no funds.
function ssGatewayCharge(card, amount) {
  return new Promise(resolve => {
    setTimeout(() => {
      const d = String(card.number || '').replace(/\D/g, '');
      if (d === '4000000000000002') return resolve({ approved: false, reason: 'declined' });
      if (d === '4000000000009995') return resolve({ approved: false, reason: 'funds' });
      const ref = 'TEST-' + Math.random().toString(36).slice(2, 8).toUpperCase();
      resolve({ approved: true, ref });
    }, 1400);
  });
}

function _newPaymentRecord(p) {
  return { id: _newId('p'), ts: new Date().toISOString(), status: 'paid', ...p };
}
// Adds a payment to the signed-in guest's own account. In the cloud this goes
// through guest_pay, which re-checks the amount against the real bill.
function _addMyPayment(payment) {
  const g = getMyGuestRecord();
  if (!g) return { ok: false, error: 'nostay' };
  if (SS_CLOUD && SS_MODE === 'guest') {
    const info = getGuestInfo() || {};
    const r = ssRpc('guest_pay', { p_id: info.registeredGuestId, p_token: ssGuestToken(), p_payment: payment }, { anon: true });
    if (!r.ok || !r.data) {
      return { ok: false, error: /bad_amount/.test(r.message) ? 'amount' : /stay_not_active/.test(r.message) ? 'nostay' : 'network', message: r.message };
    }
    ssReplaceCachedGuest(r.data);
    return { ok: true, guest: r.data };
  }
  const rec = _newPaymentRecord(payment);
  const updated = updateGuest(g.id, { payments: [...getPayments(g), rec] });
  return updated ? { ok: true, guest: updated, payment: rec } : { ok: false, error: 'network' };
}
// Pays (part of) the open balance by card. Resolves { ok, payment? , error? }
// where error is 'invalid' (with .errors), 'declined', 'funds', 'amount' or 'network'.
async function payMyAccountWithCard(card, amount) {
  const g = getMyGuestRecord();
  const { total } = getMyBilling();
  const open = paymentFigures(g, total).toPay;
  amount = Math.round(amount || open);
  if (amount <= 0 || amount > open) return { ok: false, error: 'amount' };
  const v = validateCardInput(card);
  if (!v.ok) return { ok: false, error: 'invalid', errors: v.errors };
  const charge = await ssGatewayCharge(card, amount);
  if (!charge.approved) return { ok: false, error: charge.reason };
  const r = _addMyPayment({ method: 'card', amount, brand: v.brand, last4: v.last4, ref: charge.ref });
  return r.ok ? { ok: true, guest: r.guest } : r;
}
// The guest says they will pay in cash at the front desk.
function payMyAccountCash(amount) {
  const g = getMyGuestRecord();
  const { total } = getMyBilling();
  const open = paymentFigures(g, total).toPay;
  amount = Math.round(amount || open);
  if (amount <= 0 || amount > open) return { ok: false, error: 'amount' };
  return _addMyPayment({ method: 'cash', amount, status: 'pending' });
}
// ---- reception side ----
// Reception received the cash a guest had promised.
function confirmCashPayment(guestId, paymentId) {
  const g = _readList(GUESTS_KEY).find(x => x.id === guestId);
  if (!g) return null;
  const staff = getCurrentStaff();
  const who = staff ? ((staff.firstName || '') + ' ' + (staff.lastName || '')).trim() : '';
  const list = getPayments(g).map(p => p.id === paymentId && p.status === 'pending'
    ? { ...p, status: 'paid', confirmedAt: new Date().toISOString(), confirmedBy: who } : p);
  return updateGuest(guestId, { payments: list });
}
// Reception registers money it collected itself ('cash' or 'card' at its own terminal).
function recordStaffPayment(guestId, { method, amount, note }) {
  const g = _readList(GUESTS_KEY).find(x => x.id === guestId);
  amount = Math.round(amount || 0);
  if (!g || amount <= 0) return null;
  const staff = getCurrentStaff();
  const who = staff ? ((staff.firstName || '') + ' ' + (staff.lastName || '')).trim() : '';
  const rec = _newPaymentRecord({ method: method === 'card' ? 'card' : 'cash', amount, channel: 'reception', confirmedBy: who, confirmedAt: new Date().toISOString(), note: note || '' });
  return updateGuest(guestId, { payments: [...getPayments(g), rec] });
}
function cancelPayment(guestId, paymentId) {
  const g = _readList(GUESTS_KEY).find(x => x.id === guestId);
  if (!g) return null;
  return updateGuest(guestId, { payments: getPayments(g).map(p => p.id === paymentId && p.status !== 'canceled' ? { ...p, status: 'canceled' } : p) });
}

// ---- Staff registry ----
const STAFF_KEY = 'ss_staff_registry';
const CURRENT_STAFF_KEY = 'ss_current_staff_email';

function getStaffRegistry() {
  return _readList(STAFF_KEY);
}
function saveStaffRegistry(list) {
  _writeList(STAFF_KEY, list);
}
function registerStaff(data) {
  if (SS_CLOUD) return ssRegisterAccount('staff', data);
  const list = getStaffRegistry();
  const record = { id: _newId('s'), createdAt: new Date().toISOString(), ...data };
  list.unshift(record);
  saveStaffRegistry(list);
  setCurrentStaffEmail(data.email);
  return record;
}
function findStaffByEmail(email) {
  if (!email) return null;
  return getStaffRegistry().find(s => (s.email || '').toLowerCase() === email.toLowerCase()) || null;
}
// Checks a login attempt against the real registered account.
// Returns: null = no account with that email, false = wrong password,
// otherwise the staff record on success.
function verifyStaffLogin(email, password) {
  if (SS_CLOUD) return ssLogin('staff', email, password);
  const staff = findStaffByEmail(email);
  if (!staff) return null;
  if (staff.password !== password) return false;
  return staff;
}
// Changes the logged-in staff member's real stored password. Returns:
// 'no-session' (nobody logged in), 'wrong-current' (current password
// didn't match), or 'ok' (updated).
function changeCurrentStaffPassword(currentPassword, newPassword) {
  if (SS_CLOUD) return ssChangePassword(currentPassword, newPassword);
  const staff = getCurrentStaff();
  if (!staff) return 'no-session';
  if (staff.password !== currentPassword) return 'wrong-current';
  const list = getStaffRegistry();
  const idx = list.findIndex(s => s.id === staff.id);
  if (idx === -1) return 'no-session';
  list[idx] = { ...list[idx], password: newPassword };
  saveStaffRegistry(list);
  return 'ok';
}

// Real, token-based password recovery. This is a static site with no mail
// server of its own, so an automated "silent" email can't honestly be
// sent — instead the reset link is opened as a mailto: draft addressed to
// the account's own real email, through the user's own real mail client.
// If they hit send, a genuine email carrying a genuine working link goes
// out; the token itself is real (random, single-use, time-limited) and
// actually changes the stored password on redemption.
const PASSWORD_RESETS_KEY = 'ss_password_resets';
// kind: 'staff' (default) or 'cgo' — which account registry the email
// belongs to. The kind is stamped onto the token itself, so the page that
// redeems it doesn't need to know in advance which kind it's handling.
function requestPasswordReset(email, kind) {
  kind = kind === 'cgo' ? 'cgo' : 'staff';
  if (SS_CLOUD) return ssRequestPasswordReset(email, kind);
  const account = kind === 'cgo' ? findCGOByEmail(email) : findStaffByEmail(email);
  if (!account) return { found: false };
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const resets = _readList(PASSWORD_RESETS_KEY).filter(r => r.email.toLowerCase() !== email.toLowerCase());
  resets.push({ email: account.email, token, kind, expiresAt: Date.now() + 30 * 60 * 1000 });
  _writeList(PASSWORD_RESETS_KEY, resets);
  const resetUrl = location.origin + location.pathname.replace(/[^/]*$/, '') + 'resetear-password.html?email=' + encodeURIComponent(account.email) + '&token=' + token;
  return { found: true, resetUrl, firstName: account.firstName };
}
// Checks a reset link without using it: 'ok' | 'invalid' | 'expired'
function checkPasswordReset(email, token) {
  const m = _readList(PASSWORD_RESETS_KEY).find(r => r.token === token && r.email.toLowerCase() === (email || '').toLowerCase());
  if (!m) return 'invalid';
  return Date.now() > m.expiresAt ? 'expired' : 'ok';
}
// Redeems a reset token: 'invalid' (unknown/mismatched token), 'expired',
// or 'ok' (password changed and the token burned so it can't be reused).
function consumePasswordReset(email, token, newPassword) {
  const resets = _readList(PASSWORD_RESETS_KEY);
  const match = resets.find(r => r.token === token && r.email.toLowerCase() === (email || '').toLowerCase());
  if (!match) return 'invalid';
  if (Date.now() > match.expiresAt) return 'expired';
  const kind = match.kind === 'cgo' ? 'cgo' : 'staff';
  const account = kind === 'cgo' ? findCGOByEmail(email) : findStaffByEmail(email);
  if (!account) return 'invalid';
  const list = kind === 'cgo' ? getCGORegistry() : getStaffRegistry();
  const idx = list.findIndex(s => s.id === account.id);
  list[idx] = { ...list[idx], password: newPassword };
  kind === 'cgo' ? saveCGORegistry(list) : saveStaffRegistry(list);
  _writeList(PASSWORD_RESETS_KEY, resets.filter(r => r.token !== match.token));
  return 'ok';
}
// Whether an email belongs to any known account (staff or CGO) — used by
// resetear-password.html to validate a reset link before showing the form.
function findAnyAccountByEmail(email) {
  return findStaffByEmail(email) || findCGOByEmail(email);
}

// =========================================================
// Changing a password WITHOUT email.
//  • Recovery key: every staff / CGO account can have one (shown once, only its
//    hash is stored in the cloud). With the account's email + that key a new
//    password is chosen on recuperar-con-clave.html; using it issues a NEW key.
//  • The CGO can reset the password of any hotel staff member.
// In the cloud these run as database functions (nube/schema.sql); in local
// mode they work on the browser's own account records.
// =========================================================
const RECOVERY_ATTEMPTS_KEY = 'ss_recovery_attempts';
function normalizeRecoveryKey(k) { return String(k || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase(); }
function _newLocalRecoveryKey() {
  const bytes = new Uint8Array(10);
  (window.crypto || window.msCrypto).getRandomValues(bytes);
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return [hex.slice(0, 5), hex.slice(5, 10), hex.slice(10, 15), hex.slice(15, 20)].join('-');
}
// A random temporary password (no look-alike characters) for the CGO to hand over.
function generateTempPassword() {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(10);
  (window.crypto || window.msCrypto).getRandomValues(bytes);
  return Array.from(bytes).map(b => chars[b % chars.length]).join('');
}
// The signed-in staff / CGO creates (or renews) their recovery key. Returns the
// key — the only time it can be seen — or '' if it couldn't be created.
function createRecoveryKey(kind) {
  if (SS_CLOUD) {
    if ((SS_MODE !== 'staff' && SS_MODE !== 'cgo') || !ssAuthRefresh()) return '';
    const r = ssRpc('create_recovery_key');
    return r.ok && typeof r.data === 'string' ? r.data : '';
  }
  // (local mode can hold a staff and a CGO session at once: kind says which one)
  const cgo = kind === 'staff' ? null : getCurrentCGO();
  const acct = cgo || (kind === 'cgo' ? null : getCurrentStaff());
  if (!acct) return '';
  const key = _newLocalRecoveryKey();
  const list = cgo ? getCGORegistry() : getStaffRegistry();
  const idx = list.findIndex(a => a.id === acct.id);
  if (idx === -1) return '';
  list[idx] = { ...list[idx], recoveryKey: normalizeRecoveryKey(key) };
  cgo ? saveCGORegistry(list) : saveStaffRegistry(list);
  return key;
}
// Chooses a new password with the account's email + recovery key (nobody
// signed in). Returns { ok: true, newKey, kind } or { ok: false, error } where
// error is 'invalid' (wrong key/email, or too many attempts), 'weak',
// 'network' or 'unavailable' (the cloud update hasn't been installed).
function resetPasswordWithKey(email, key, newPassword) {
  if (String(newPassword || '').length < 6) return { ok: false, error: 'weak' };
  email = String(email || '').trim();
  if (SS_CLOUD) {
    const r = ssRpc('reset_password_with_key', { p_email: email, p_key: key || '', p_new_password: newPassword }, { anon: true });
    if (r.status === 0) return { ok: false, error: 'network' };
    if (!r.ok) {
      if (/weak_password/.test(r.message + r.code)) return { ok: false, error: 'weak' };
      if (r.status === 404 || /could not find the function|schema cache/i.test(r.message)) return { ok: false, error: 'unavailable' };
      return { ok: false, error: 'invalid' };
    }
    return r.data && r.data.ok ? { ok: true, newKey: r.data.newKey, kind: r.data.kind } : { ok: false, error: 'invalid' };
  }
  // local mode: 5 wrong tries lock that email for 15 minutes
  let tries = {};
  try { tries = JSON.parse(localStorage.getItem(RECOVERY_ATTEMPTS_KEY) || '{}'); } catch (e) {}
  const id = email.toLowerCase();
  if (tries[id] && tries[id].until > Date.now()) return { ok: false, error: 'invalid' };
  const staff = findStaffByEmail(email);
  const cgo = staff ? null : findCGOByEmail(email);
  const acct = staff || cgo;
  if (!acct || !acct.recoveryKey || acct.recoveryKey !== normalizeRecoveryKey(key)) {
    const t = tries[id] || { n: 0, until: 0 };
    t.n = (t.n || 0) + 1;
    if (t.n >= 5) { t.n = 0; t.until = Date.now() + 15 * 60 * 1000; }
    tries[id] = t;
    localStorage.setItem(RECOVERY_ATTEMPTS_KEY, JSON.stringify(tries));
    return { ok: false, error: 'invalid' };
  }
  const newKey = _newLocalRecoveryKey();
  const list = cgo ? getCGORegistry() : getStaffRegistry();
  const idx = list.findIndex(a => a.id === acct.id);
  list[idx] = { ...list[idx], password: newPassword, recoveryKey: normalizeRecoveryKey(newKey) };
  cgo ? saveCGORegistry(list) : saveStaffRegistry(list);
  delete tries[id];
  localStorage.setItem(RECOVERY_ATTEMPTS_KEY, JSON.stringify(tries));
  return { ok: true, newKey, kind: cgo ? 'cgo' : 'staff' };
}
// The CGO sets a new password for a hotel staff member (any hotel).
function cgoResetStaffPassword(staffId, newPassword) {
  if (!getCurrentCGO()) return { ok: false, error: 'forbidden' };
  if (String(newPassword || '').length < 6) return { ok: false, error: 'weak' };
  if (SS_CLOUD) {
    if (!ssAuthRefresh()) return { ok: false, error: 'session' };
    const r = ssRpc('admin_reset_password', { p_user_id: staffId, p_new_password: newPassword });
    if (r.status === 0) return { ok: false, error: 'network' };
    if (!r.ok) return { ok: false, error: (r.status === 404 || /could not find the function/i.test(r.message)) ? 'unavailable' : 'failed' };
    return { ok: true };
  }
  const list = getStaffRegistry();
  const idx = list.findIndex(a => a.id === staffId);
  if (idx === -1) return { ok: false, error: 'failed' };
  list[idx] = { ...list[idx], password: newPassword };
  saveStaffRegistry(list);
  return { ok: true };
}
// Changes the signed-in account's own password (staff or CGO), checking the current one.
// 'ok' | 'no-session' | 'wrong-current' | 'weak' | 'error'
function changeCurrentAccountPassword(currentPassword, newPassword) {
  if (SS_CLOUD) {
    const r = ssChangePassword(currentPassword, newPassword);
    return r;
  }
  const cgo = getCurrentCGO();
  if (!cgo) return changeCurrentStaffPassword(currentPassword, newPassword);
  if (cgo.password !== currentPassword) return 'wrong-current';
  const list = getCGORegistry();
  const idx = list.findIndex(a => a.id === cgo.id);
  if (idx === -1) return 'no-session';
  list[idx] = { ...list[idx], password: newPassword };
  saveCGORegistry(list);
  return 'ok';
}

// ---- how a recovery key is shown (always with the warning that it's shown once) ----
function recoveryKeyHtml(key) {
  return `<div class="rk-box">
    <div class="rk-label">Tu clave de recuperación</div>
    <div class="rk-key" data-rk="${key}">${key}</div>
    <div class="rk-actions">
      <button type="button" class="btn btn-outline btn-sm" onclick="copyToClipboard('${key}', this)">Copiar</button>
      <button type="button" class="btn btn-outline btn-sm" onclick="downloadRecoveryKey('${key}')">Descargar .txt</button>
    </div>
    <p class="rk-note"><strong>Guardala ahora</strong> (foto, papel o archivo): se muestra una sola vez. Si algún día olvidás tu contraseña y no te llega el correo, con esta clave elegís una nueva en "¿Olvidaste tu contraseña?".</p>
  </div>`;
}
function downloadRecoveryKey(key) {
  const text = 'SmartStay Hospitality S.A. — clave de recuperación\n\n' + key + '\n\nGuardala en un lugar seguro. Sirve para elegir una contraseña nueva sin correo: ' +
    location.origin + location.pathname.replace(/[^/]*$/, '') + 'recuperar-con-clave.html\nCuando la usás se genera una clave nueva y esta deja de servir.\n';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.download = 'smartstay-clave-de-recuperacion.txt';
  document.body.appendChild(a); a.click(); a.remove();
}

// ---- CGO: "Mi cuenta" window (change password + recovery key) from the top bar ----
function initAccountSecurityUi() {
  if (!getCurrentCGO()) return;
  const trigger = document.querySelector('.admin-user');
  if (!trigger || document.getElementById('accountSecurityModal')) return;
  trigger.style.cursor = 'pointer';
  trigger.setAttribute('title', 'Mi cuenta: contraseña y clave de recuperación');
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('tabindex', '0');
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'accountSecurityModal';
  modal.hidden = true;
  modal.innerHTML = `<div class="modal-card">
    <button class="modal-close" onclick="closeModal('accountSecurityModal')" aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    <h3>Mi cuenta · seguridad</h3>
    <p class="modal-sub" id="acctEmail"></p>
    <h4 style="font-size:14px; margin-bottom:10px;">Cambiar contraseña</h4>
    <form id="acctPassForm" autocomplete="off">
      <div class="form-group"><label class="form-label" for="acct-cur">Contraseña actual</label><input class="form-input" id="acct-cur" type="password" style="padding-left:14px;" required></div>
      <div class="form-group"><label class="form-label" for="acct-new">Nueva contraseña</label><input class="form-input" id="acct-new" type="password" style="padding-left:14px;" minlength="6" required></div>
      <div class="form-group"><label class="form-label" for="acct-new2">Repetir nueva contraseña</label><input class="form-input" id="acct-new2" type="password" style="padding-left:14px;" minlength="6" required></div>
      <button class="btn btn-primary btn-block" type="submit">Actualizar contraseña</button>
    </form>
    <div style="border-top:1px solid var(--border-color); margin-top:20px; padding-top:16px;">
      <h4 style="font-size:14px; margin-bottom:6px;">Clave de recuperación</h4>
      <p style="font-size:12.5px; margin-bottom:12px;">Sirve para elegir una contraseña nueva <strong>sin recibir correos</strong>. Al generar una nueva, la anterior deja de servir.</p>
      <button class="btn btn-outline btn-block" id="acctKeyBtn" type="button">Generar clave de recuperación</button>
      <div id="acctKeySlot"></div>
    </div>
  </div>`;
  document.body.appendChild(modal);
  const open = () => {
    const c = getCurrentCGO();
    document.getElementById('acctEmail').textContent = c ? c.email : '';
    document.getElementById('acctKeySlot').innerHTML = '';
    document.getElementById('acctPassForm').reset();
    openModal('accountSecurityModal');
  };
  trigger.addEventListener('click', open);
  trigger.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  document.getElementById('acctPassForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const cur = document.getElementById('acct-cur').value;
    const nw = document.getElementById('acct-new').value;
    if (nw !== document.getElementById('acct-new2').value) { showToast('Las contraseñas nuevas no coinciden'); return; }
    const r = changeCurrentAccountPassword(cur, nw);
    const msg = { ok: 'Contraseña actualizada correctamente', 'wrong-current': 'La contraseña actual es incorrecta', 'no-session': 'Tu sesión expiró: iniciá sesión de nuevo', weak: 'La contraseña nueva es muy corta: usá al menos 6 caracteres', error: 'No se pudo cambiar la contraseña. Intentá de nuevo.' };
    showToast(msg[r] || msg.error);
    if (r === 'ok') e.target.reset();
  });
  document.getElementById('acctKeyBtn').addEventListener('click', () => {
    const key = createRecoveryKey('cgo');
    document.getElementById('acctKeySlot').innerHTML = key ? recoveryKeyHtml(key)
      : '<p class="rk-note" style="color:#b91c1c;">No se pudo crear la clave. Si usás la nube, falta correr la actualización de la base (guía de la nube, "Clave de recuperación").</p>';
  });
}
document.addEventListener('DOMContentLoaded', initAccountSecurityUi);

function setCurrentStaffEmail(email) {
  if (SS_CLOUD) return; // the cloud session was already set when logging in
  localStorage.setItem(CURRENT_STAFF_KEY, email);
}
function getCurrentStaff() {
  if (SS_CLOUD) return SS_MODE === 'staff' ? SS_PROFILE : null;
  const email = localStorage.getItem(CURRENT_STAFF_KEY);
  return email ? findStaffByEmail(email) : null;
}

// Ends the current session and sends the browser to `redirectTo`. Used by
// every "Cerrar sesión" link/button across guest and staff pages so the
// stored identity doesn't silently persist after logout.
// Each side logs out independently — ending a guest session must never
// kick out a staff member (or vice versa) sharing the same browser.
function logoutGuest(redirectTo) {
  localStorage.removeItem(GUEST_KEY);
  window.location.href = redirectTo || 'index.html';
}
function logoutStaff(redirectTo) {
  if (SS_CLOUD) ssSignOut();
  localStorage.removeItem(CURRENT_STAFF_KEY);
  window.location.href = redirectTo || 'index.html';
}

// Route guards: call at the very top of a protected page (before the rest
// of the page renders) so someone can't reach admin/guest screens just by
// typing the URL without an active session.
function requireStaffSession() {
  if (!getCurrentStaff()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}
function requireGuestSession() {
  const g = getMyGuestRecord();
  if (!g || g.status === 'revocado' || g.status === 'checkout') {
    window.location.href = 'checkin.html';
    return false;
  }
  return true;
}

// ---- CGO registry — SmartStay's OWN central/corporate staff. Separate
// from hotel staff: a CGO account isn't tied to any single hotel and is
// the only account type that can see and manage the full hotel directory. ----
const CGO_KEY = 'ss_cgo_registry';
const CURRENT_CGO_KEY = 'ss_current_cgo_email';

function getCGORegistry() { return _readList(CGO_KEY); }
function saveCGORegistry(list) { _writeList(CGO_KEY, list); }
function registerCGO(data) {
  if (SS_CLOUD) return ssRegisterAccount('cgo', data);
  const list = getCGORegistry();
  const record = { id: _newId('cgo'), createdAt: new Date().toISOString(), ...data };
  list.unshift(record);
  saveCGORegistry(list);
  setCurrentCGOEmail(data.email);
  return record;
}
function findCGOByEmail(email) {
  if (!email) return null;
  return getCGORegistry().find(c => (c.email || '').toLowerCase() === email.toLowerCase()) || null;
}
function verifyCGOLogin(email, password) {
  if (SS_CLOUD) return ssLogin('cgo', email, password);
  const c = findCGOByEmail(email);
  if (!c) return null;
  if (c.password !== password) return false;
  return c;
}
function setCurrentCGOEmail(email) { if (!SS_CLOUD) localStorage.setItem(CURRENT_CGO_KEY, email); }
function getCurrentCGO() {
  if (SS_CLOUD) return SS_MODE === 'cgo' ? SS_PROFILE : null;
  const email = localStorage.getItem(CURRENT_CGO_KEY);
  return email ? findCGOByEmail(email) : null;
}
function logoutCGO(redirectTo) {
  if (SS_CLOUD) ssSignOut();
  localStorage.removeItem(CURRENT_CGO_KEY);
  window.location.href = redirectTo || 'index.html';
}
function requireCGOSession() {
  if (!getCurrentCGO()) {
    window.location.href = 'login-cgo.html';
    return false;
  }
  return true;
}
function getCurrentCGOInitials() {
  const c = getCurrentCGO();
  if (!c) return 'CG';
  return (c.firstName[0] + (c.lastName ? c.lastName[0] : '')).toUpperCase();
}
function applyCGOInfo() {
  const c = getCurrentCGO();
  if (!c) return;
  document.querySelectorAll('[data-cgo="name"]').forEach(el => el.textContent = (c.firstName + ' ' + (c.lastName || '')).trim());
  document.querySelectorAll('[data-cgo="initials"]').forEach(el => el.textContent = getCurrentCGOInitials());
}
document.addEventListener('DOMContentLoaded', applyCGOInfo);

// =========================================================
// CGO cross-hotel reports — a CGO session has no hotelId of its own, so
// these read every collection RAW (unscoped) and group by hotelId
// themselves, instead of using the hotel-scoped getters above.
// =========================================================

// Real billing total for one guest record, computed the same way
// getMyBilling() does for the guest's own session (room rate × real
// nights, plus their requested services), but for an arbitrary guest in
// an arbitrary hotel — needed since CGO has no "current guest".
function _billingForGuestRecord(g, hotelId, hotelInfo) {
  const rates = (hotelInfo && hotelInfo.roomRates) || DEFAULT_HOTEL.roomRates;
  const roomType = (g.room || '').split('·')[1] ? g.room.split('·')[1].trim() : '';
  const rate = rates[roomType] || 0;
  const roomTotal = rate ? rate * getNightsCount(g.checkinDate, g.checkoutDate) : 0;
  const guestName = (g.firstName + ' ' + (g.lastName || '')).trim();
  const serviceTotal = _servicesForGuestRecord(g, hotelId, guestName)
    .reduce((sum, r) => sum + (r.price || 0), 0);
  return roomTotal + serviceTotal;
}
// Service requests that belong to one specific stay. A request carrying a
// real guestId is matched precisely to that stay; a request with no
// guestId (created before this field existed) falls back to matching by
// guest name, same as before — so a returning guest's past-stay services
// never bleed into a later stay's bill just because the name matches.
function _servicesForGuestRecord(g, hotelId, guestName) {
  return _readList(REQUESTS_KEY).filter(r => {
    if (r.hotelId !== hotelId) return false;
    return r.guestId ? r.guestId === g.id : r.guest === guestName;
  });
}

// Aggregated stats for one affiliated hotel: real revenue (room charges
// plus requested services), occupancy, and guest/staff activity — all
// derived from that hotel's own slice of the shared registries.
function getCGOHotelStats(hotelId) {
  const hotel = getHotelById(hotelId) || {};
  const hotelInfo = { ...DEFAULT_HOTEL, ...hotel };
  const guests = _readList(GUESTS_KEY).filter(g => g.hotelId === hotelId);
  const rooms = _readList(ROOMS_KEY).filter(r => r.hotelId === hotelId);
  const staff = _readList(STAFF_KEY).filter(s => s.hotelId === hotelId);
  const requests = _readList(REQUESTS_KEY).filter(r => r.hotelId === hotelId);
  const billableGuests = guests.filter(g => g.status === 'activo' || g.status === 'checkout');
  const revenue = billableGuests.reduce((sum, g) => sum + _billingForGuestRecord(g, hotelId, hotelInfo), 0);
  // money actually received (card or confirmed cash) and cash still to be collected
  const payFigs = billableGuests.map(g => paymentFigures(g, _billingForGuestRecord(g, hotelId, hotelInfo)));
  const collected = payFigs.reduce((sum, f) => sum + f.paid, 0);
  const pendingCash = payFigs.reduce((sum, f) => sum + f.pendingCash, 0);
  const occupiedRooms = rooms.filter(r => r.status === 'occupied' || guests.some(g => g.status === 'activo' && (g.room || '').split('·')[0].trim() === String(r.n))).length;
  return {
    hotelId,
    name: hotel.name || 'Hotel',
    active: hotel.active !== false,
    revenue,
    collected,
    pendingCash,
    totalRooms: rooms.length,
    occupiedRooms,
    occupancyPct: rooms.length ? Math.round((occupiedRooms / rooms.length) * 100) : 0,
    activeGuests: guests.filter(g => g.status === 'activo').length,
    pendingGuests: guests.filter(g => g.status === 'pendiente').length,
    totalGuests: guests.length,
    staffCount: staff.length,
    serviceRequestCount: requests.length,
  };
}

// The same stats for every affiliated hotel, plus SmartStay-wide totals —
// this is what powers the CGO "Reportes" panel.
function getCGOAggregateReport() {
  const hotels = getHotelsRegistry().map(h => getCGOHotelStats(h.id));
  const totals = hotels.reduce((acc, h) => ({
    revenue: acc.revenue + h.revenue,
    collected: acc.collected + h.collected,
    pendingCash: acc.pendingCash + h.pendingCash,
    totalRooms: acc.totalRooms + h.totalRooms,
    occupiedRooms: acc.occupiedRooms + h.occupiedRooms,
    activeGuests: acc.activeGuests + h.activeGuests,
    totalGuests: acc.totalGuests + h.totalGuests,
    staffCount: acc.staffCount + h.staffCount,
    serviceRequestCount: acc.serviceRequestCount + h.serviceRequestCount,
  }), { revenue: 0, collected: 0, pendingCash: 0, totalRooms: 0, occupiedRooms: 0, activeGuests: 0, totalGuests: 0, staffCount: 0, serviceRequestCount: 0 });
  totals.occupancyPct = totals.totalRooms ? Math.round((totals.occupiedRooms / totals.totalRooms) * 100) : 0;
  totals.hotelCount = hotels.length;
  totals.activeHotelCount = hotels.filter(h => h.active).length;
  return { hotels, totals };
}

function getCurrentStaffName() {
  const s = getCurrentStaff();
  return s ? (s.firstName + ' ' + (s.lastName || '')).trim() : null;
}
function getCurrentStaffInitials() {
  const s = getCurrentStaff();
  if (!s) return 'PH';
  return (s.firstName[0] + (s.lastName ? s.lastName[0] : '')).toUpperCase();
}

// Applies the logged-in staff member's real name/role to the admin topbar,
// if a session is present. Safe no-op otherwise (keeps static markup).
function applyStaffInfo() {
  const s = getCurrentStaff();
  if (!s) return;
  document.querySelectorAll('[data-staff="name"]').forEach(el => el.textContent = (s.firstName + ' ' + (s.lastName || '')).trim());
  document.querySelectorAll('[data-staff="role"]').forEach(el => el.textContent = s.role || 'Personal del hotel');
  document.querySelectorAll('[data-staff="initials"]').forEach(el => el.textContent = getCurrentStaffInitials());
}
document.addEventListener('DOMContentLoaded', applyStaffInfo);

// =========================================================
// Service catalog — what a hotel actually offers to request. Only the
// original demo hotel is seeded with the sample catalog below; a newly
// affiliated real hotel starts with none, so its own staff build their
// real service menu (own names, prices, categories) from scratch.
// =========================================================
const CATALOG_KEY = 'ss_service_catalog';
// Prices the demo catalog and rates had before the switch to guaraníes. The demo
// loader only replaces a price that still equals one of these (i.e. nobody edited it).
const LEGACY_DEMO_PRICES = {svc1: 3200, svc2: 4200, svc3: 0, svc12: 18500, svc13: 2800, svc14: 2400, svc4: 9500, svc5: 0, svc6: 6800, svc15: 4500, svc16: 7800, svc17: 0, svc7: 2500, svc8: 4100, svc18: 3600, svc9: 0, svc10: 0, svc19: 6500, svc20: 0, svc11: 8900, svc21: 38000, svc22: 0, svc23: 14500, svc24: 9800, svc25: 22000, svc26: 300, svc27: 0, svc28: 1800, svc29: 12000, svc30: 3500, svc31: 8500, svc32: 4000};
const LEGACY_DEMO_RATES = { Individual: 45000, Doble: 58000, 'Doble Superior': 72000, Familiar: 85000, Suite: 98000, 'Suite Presidencial': 150000 };
const DEFAULT_CATALOG = [
  // Room service
  { id: 'svc1', category: 'Room service', icon: 'food', title: 'Desayuno a la habitación', desc: 'Selección de desayuno continental o americano servido en tu habitación.', price: 35000, unit: '/ pedido', badge: '24/7' },
  { id: 'svc2', category: 'Room service', icon: 'restaurant', title: 'Carta de almuerzo y cena', desc: 'Platos principales, entradas y postres del restaurante del hotel.', price: 45000, priceFrom: true, unit: '/ plato', badge: '30 min' },
  { id: 'svc3', category: 'Room service', icon: 'minibar', title: 'Reposición de minibar', desc: 'Solicita la reposición de bebidas y snacks de tu minibar.', price: 0, priceLabel: 'Según consumo', badge: 'Incluido' },
  { id: 'svc12', category: 'Room service', icon: 'restaurant', title: 'Cena romántica en la habitación', desc: 'Menú de tres pasos para dos, con copa de espumante y decoración.', price: 280000, unit: '/ pareja', badge: 'Reserva previa' },
  { id: 'svc13', category: 'Room service', icon: 'cocktail', title: 'Bar nocturno y coctelería', desc: 'Tragos de autor y bebidas servidos en tu habitación por la noche.', price: 25000, priceFrom: true, unit: '/ bebida', badge: '18:00 a 00:00' },
  { id: 'svc14', category: 'Room service', icon: 'food', title: 'Menú infantil', desc: 'Platos pensados para los más chicos, listos en pocos minutos.', price: 30000, unit: '/ plato', badge: '30 min' },
  // Spa & bienestar
  { id: 'svc4', category: 'Spa & bienestar', icon: 'spa', title: 'Masaje relajante', desc: 'Sesión de masaje corporal completo en nuestro spa.', price: 180000, unit: '/ sesión', badge: '60 min' },
  { id: 'svc5', category: 'Spa & bienestar', icon: 'pool', title: 'Acceso a piscina climatizada', desc: 'Uso exclusivo de la piscina y área de descanso del spa.', price: 0, priceLabel: 'Incluido', badge: 'Todo el día' },
  { id: 'svc6', category: 'Spa & bienestar', icon: 'yoga', title: 'Sesión de yoga privada', desc: 'Clase individual guiada por un instructor certificado.', price: 120000, unit: '/ sesión', badge: '45 min' },
  { id: 'svc15', category: 'Spa & bienestar', icon: 'sauna', title: 'Sauna y vapor', desc: 'Circuito de sauna seco y baño de vapor, con toalla y bebida de cortesía.', price: 80000, unit: '/ sesión', badge: '45 min' },
  { id: 'svc16', category: 'Spa & bienestar', icon: 'facial', title: 'Tratamiento facial', desc: 'Limpieza e hidratación profunda con productos de cosmética natural.', price: 150000, unit: '/ sesión', badge: '50 min' },
  { id: 'svc17', category: 'Spa & bienestar', icon: 'gym', title: 'Gimnasio 24 horas', desc: 'Equipos de cardio y musculación, abierto todo el día para huéspedes.', price: 0, priceLabel: 'Incluido', badge: '24/7' },
  // Lavandería
  { id: 'svc7', category: 'Lavandería', icon: 'laundry', title: 'Lavado y planchado', desc: 'Servicio completo de lavado y planchado de tu ropa.', price: 60000, unit: '/ bolsa', badge: '24 hs' },
  { id: 'svc8', category: 'Lavandería', icon: 'laundry-express', title: 'Lavado exprés', desc: 'Servicio urgente de lavado listo en pocas horas.', price: 95000, unit: '/ bolsa', badge: 'Express · 4 hs' },
  { id: 'svc18', category: 'Lavandería', icon: 'dryclean', title: 'Lavado en seco', desc: 'Trajes, vestidos y prendas delicadas, entregadas en percha.', price: 45000, unit: '/ prenda', badge: '48 hs' },
  // Limpieza
  { id: 'svc9', category: 'Limpieza', icon: 'cleaning', title: 'Limpieza extra de habitación', desc: 'Servicio de limpieza adicional fuera del horario habitual.', price: 0, priceLabel: 'Sin cargo', badge: '30 min' },
  { id: 'svc10', category: 'Limpieza', icon: 'amenities', title: 'Amenities adicionales', desc: 'Toallas, almohadas y artículos de aseo extra para tu habitación.', price: 0, priceLabel: 'Sin cargo', badge: 'A pedido' },
  { id: 'svc19', category: 'Limpieza', icon: 'bed', title: 'Cama extra', desc: 'Una cama adicional armada en tu habitación, con ropa de cama completa.', price: 90000, unit: '/ noche', badge: 'A pedido' },
  { id: 'svc20', category: 'Limpieza', icon: 'bed', title: 'Cuna para bebé', desc: 'Cuna segura con colchón y sábanas, sin costo para huéspedes con bebés.', price: 0, priceLabel: 'Sin cargo', badge: 'A pedido' },
  // Transporte
  { id: 'svc11', category: 'Transporte', icon: 'transport', title: 'Traslado al aeropuerto', desc: 'Servicio de traslado privado desde y hacia el aeropuerto.', price: 150000, unit: '/ trayecto', badge: 'Reserva previa' },
  { id: 'svc21', category: 'Transporte', icon: 'car', title: 'Alquiler de auto', desc: 'Vehículo compacto con seguro incluido, entregado en el hotel.', price: 450000, unit: '/ día', badge: 'Reserva previa' },
  { id: 'svc22', category: 'Transporte', icon: 'transport', title: 'Taxi o remís a pedido', desc: 'Pedimos un taxi de confianza y te avisamos cuando llegue a la puerta.', price: 0, priceLabel: 'Según trayecto', badge: '15 min' },
  // Tours y excursiones
  { id: 'svc23', category: 'Tours y excursiones', icon: 'tour', title: 'City tour por Asunción', desc: 'Recorrido guiado por el centro histórico, museos y la costanera.', price: 200000, unit: '/ persona', badge: '4 hs' },
  { id: 'svc24', category: 'Tours y excursiones', icon: 'tour', title: 'Paseo al Cerro Lambaré', desc: 'Salida guiada al mirador del cerro, con vista panorámica de la ciudad.', price: 120000, unit: '/ persona', badge: '3 hs' },
  // Negocios y conserjería
  { id: 'svc25', category: 'Negocios y conserjería', icon: 'meeting', title: 'Sala de reuniones', desc: 'Sala equipada con proyector, pizarra y café para hasta 10 personas.', price: 250000, unit: '/ hora', badge: 'Reserva previa' },
  { id: 'svc26', category: 'Negocios y conserjería', icon: 'printer', title: 'Impresiones y escaneo', desc: 'Imprimimos o escaneamos tus documentos en recepción.', price: 1000, unit: '/ hoja', badge: 'En el día' },
  { id: 'svc27', category: 'Negocios y conserjería', icon: 'clock', title: 'Servicio de despertador', desc: 'Te llamamos a la hora que indiques para que no pierdas tu vuelo.', price: 0, priceLabel: 'Sin cargo', badge: 'A pedido' },
  { id: 'svc28', category: 'Negocios y conserjería', icon: 'wifi', title: 'Wi-Fi premium', desc: 'Conexión de alta velocidad para videollamadas y trabajo remoto.', price: 25000, unit: '/ día', badge: 'Alta velocidad' },
  // Extras de la estadía
  { id: 'svc29', category: 'Extras de la estadía', icon: 'clock', title: 'Late check-out', desc: 'Quedate en la habitación hasta las 16:00, sujeto a disponibilidad.', price: 120000, unit: '/ pedido', badge: 'Hasta 16:00' },
  { id: 'svc30', category: 'Extras de la estadía', icon: 'parking', title: 'Estacionamiento privado', desc: 'Cochera techada y vigilada dentro del hotel.', price: 30000, unit: '/ día', badge: 'Todo el día' },
  { id: 'svc31', category: 'Extras de la estadía', icon: 'gift', title: 'Detalle de bienvenida', desc: 'Ramo de flores y una sorpresa en la habitación para una ocasión especial.', price: 150000, unit: '/ pedido', badge: 'Reserva previa' },
  { id: 'svc32', category: 'Extras de la estadía', icon: 'pet', title: 'Mascotas bienvenidas', desc: 'Cama, comedero y paseo corto para tu mascota durante la estadía.', price: 50000, unit: '/ noche', badge: 'A pedido' },
];
const SERVICE_ICONS = {
  food: '<path d="M3 17h18M4 17c0-4 2-6 2-6h12s2 2 2 6"/>',
  restaurant: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20zM8 12h8M12 8v8"/>',
  minibar: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h3"/>',
  spa: '<path d="M12 2c-3 3-3 6-1 8s6-1 6-4c2 2 2 5 0 7a6 6 0 0 1-10 0c-2-3-1-7 5-11z"/>',
  pool: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  yoga: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  laundry: '<path d="M5 3h14l1 7H4l1-7zM4 10v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10"/>',
  'laundry-express': '<path d="M12 2v20M4 8l8-6 8 6M4 8v13h16V8"/>',
  cleaning: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  amenities: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 6h6M9 10h6"/>',
  transport: '<path d="M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 17l1.5-6h11L19 17M8 11V7h8v4"/>',
  wifi: '<path d="M5 12.5a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/>',
  gym: '<path d="M6.5 6.5l11 11M4 4l4 4M16 16l4 4M2.5 9.5l3-3M14.5 21.5l3-3M7 13l6-6"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 6.5H4.5C4.5 13.5 6 12 6 8z"/><path d="M9.5 18a2.5 2.5 0 0 0 5 0"/>',
  cocktail: '<path d="M5 4h14l-7 8zM12 12v8M8 20h8"/>',
  sauna: '<path d="M8 3c-1.5 2 1.5 3 0 5M12 3c-1.5 2 1.5 3 0 5M16 3c-1.5 2 1.5 3 0 5M4 13h16l-1 7H5z"/>',
  facial: '<circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.5 2.3 2 4 2s3-.5 4-2M9 9.5h.01M15 9.5h.01"/>',
  dryclean: '<path d="M12 4a2 2 0 1 1 2 2c-1 .5-2 1-2 2v1M3 18l9-8 9 8z"/>',
  bed: '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11.5h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  car: '<path d="M4 16v-3l2-5h12l2 5v3zM4 16v2M20 16v2M7.5 13h.01M16.5 13h.01"/>',
  tour: '<path d="M9 3l-6 3v15l6-3 6 3 6-3V3l-6 3zM9 3v15M15 6v15"/>',
  meeting: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  printer: '<path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z"/>',
  parking: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M10 17V8h3a2.5 2.5 0 0 1 0 5h-3"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9M12 8c-3 0-4-4-1.5-4S12 8 12 8zM12 8c3 0 4-4 1.5-4S12 8 12 8z"/>',
  pet: '<circle cx="7" cy="9" r="1.6"/><circle cx="12" cy="6.5" r="1.6"/><circle cx="17" cy="9" r="1.6"/><path d="M8 17c0-3 2-5 4-5s4 2 4 5c0 1.5-1.5 2-4 2s-4-.5-4-2z"/>',
};
function serviceIconSvg(key) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (SERVICE_ICONS[key] || SERVICE_ICONS.bell) + '</svg>';
}
function getServiceCatalog() {
  const hid = getActiveHotelId();
  const all = _readList(CATALOG_KEY);
  const mine = all.filter(s => s.hotelId === hid);
  if (mine.length) return mine;
  if (hid !== 'h_default') return [];
  const seeded = DEFAULT_CATALOG.map(s => ({ ...s, hotelId: hid }));
  const others = all.filter(s => s.hotelId !== hid);
  _writeList(CATALOG_KEY, [...others, ...seeded]);
  return seeded;
}
function saveServiceCatalog(list) {
  const hid = getActiveHotelId();
  const others = _readList(CATALOG_KEY).filter(s => s.hotelId !== hid);
  _writeList(CATALOG_KEY, [...others, ...list]);
}
function addCatalogItem(data) {
  const list = getServiceCatalog();
  const record = { id: _newId('svc'), hotelId: getActiveHotelId(), ...data };
  list.push(record);
  saveServiceCatalog(list);
  return record;
}
function updateCatalogItem(id, changes) {
  const list = getServiceCatalog();
  const idx = list.findIndex(s => s.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...changes };
  saveServiceCatalog(list);
  return list[idx];
}
function deleteCatalogItem(id) {
  saveServiceCatalog(getServiceCatalog().filter(s => s.id !== id));
}
// Every distinct category this hotel's catalog currently uses — powers
// the guest-facing filter tabs and the category suggestions in the admin
// catalog editor.
function getCatalogCategories() {
  return [...new Set(getServiceCatalog().map(s => s.category).filter(Boolean))];
}

// ---- Service requests registry (created from the guest "Solicitar" flow) ----
const REQUESTS_KEY = 'ss_service_requests';

function getServiceRequests() {
  const hid = getActiveHotelId();
  return _readList(REQUESTS_KEY).filter(r => r.hotelId === hid);
}
function saveServiceRequests(list) {
  const hid = getActiveHotelId();
  const others = _readList(REQUESTS_KEY).filter(r => r.hotelId !== hid);
  _writeList(REQUESTS_KEY, [...others, ...list]);
}
function addServiceRequest(data) {
  const list = getServiceRequests();
  const record = { id: _newId('r'), status: 'pending', createdAt: new Date().toISOString(), hotelId: getActiveHotelId(), ...data };
  list.unshift(record);
  saveServiceRequests(list);
  return record;
}
function updateServiceRequest(id, changes) {
  const list = getServiceRequests();
  const idx = list.findIndex(r => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...changes };
  saveServiceRequests(list);
  return list[idx];
}

// Updates the guest's own session AND, if they've already completed
// check-in, their entry in the staff-visible registry — so an edit made
// from "Mi perfil"/"Mi cuenta" shows up for staff immediately, the same
// way a staff edit already reflects back to the guest.
function saveGuestInfoAndSync(data) {
  saveGuestInfo(data);
  const info = getGuestInfo() || {};
  if (info.registeredGuestId) updateGuest(info.registeredGuestId, data);
}

// Number of nights between two ISO dates (yyyy-mm-dd), minimum 1 so a
// same-day or malformed reservation still bills at least one night.
function getNightsCount(checkinDate, checkoutDate) {
  if (!checkinDate || !checkoutDate) return 1;
  const inD = new Date(checkinDate + 'T00:00:00');
  const outD = new Date(checkoutDate + 'T00:00:00');
  const diff = Math.round((outD - inD) / 86400000);
  return diff > 0 ? diff : 1;
}

// Real billing for the guest currently using this browser session: the
// room charge for their actual length of stay (rate × nights), plus every
// service they actually requested, with its real price, plus the total.
function getMyBilling() {
  const name = getGuestFullName();
  const g = getMyGuestRecord();
  const serviceItems = (name && g) ? _servicesForGuestRecord(g, getActiveHotelId(), name) : [];
  let roomItem = null;
  if (g && g.room) {
    const roomType = (g.room.split('·')[1] || '').trim();
    const rate = (getHotelInfo().roomRates || {})[roomType] || 0;
    if (rate > 0) {
      const nights = getNightsCount(g.checkinDate, g.checkoutDate);
      roomItem = {
        title: `${t('billing.room')} ${g.room} · ${nights} ${nights === 1 ? t('billing.night') : t('billing.nights')}`,
        price: rate * nights,
        nights,
      };
    }
  }
  const items = roomItem ? [roomItem, ...serviceItems] : serviceItems;
  const total = items.reduce((sum, r) => sum + (r.price || 0), 0);
  return { items, total, roomItem, serviceItems, ...paymentFigures(g, total) };
}

// Past, already-checked-out stays at this hotel that belong to the same
// real person as the current guest session (matched by email) — lets a
// returning guest see their stay history instead of losing it the moment
// they check out. Excludes the guest's own current record, if any.
function getMyStayHistory() {
  const info = getGuestInfo() || {};
  const email = (info.email || '').trim().toLowerCase();
  if (!email) return [];
  const hid = getActiveHotelId();
  const hotelInfo = getHotelInfo();
  return _readList(GUESTS_KEY)
    .filter(g => g.hotelId === hid && g.status === 'checkout' && g.id !== info.registeredGuestId && (g.email || '').trim().toLowerCase() === email)
    .map(g => ({
      id: g.id,
      room: g.room,
      checkin: g.checkin,
      checkout: g.checkout,
      checkoutDate: g.checkoutDate || '',
      total: _billingForGuestRecord(g, hid, hotelInfo),
    }))
    .sort((a, b) => b.checkoutDate.localeCompare(a.checkoutDate));
}

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'recién';
  if (mins < 60) return 'hace ' + mins + ' min';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return 'hace ' + hrs + ' h';
  return 'hace ' + Math.floor(hrs / 24) + ' d';
}

// =========================================================
// Rooms inventory — persisted so staff edits (status changes)
// survive reloads, and real occupancy can be computed from it.
// =========================================================
const ROOMS_KEY = 'ss_rooms';
const DEFAULT_ROOMS = [
  {n:101,type:"Individual",floor:1,status:"available"}, {n:102,type:"Individual",floor:1,status:"available"},
  {n:103,type:"Doble",floor:1,status:"cleaning"}, {n:104,type:"Doble",floor:1,status:"available"},
  {n:105,type:"Doble Superior",floor:1,status:"available"}, {n:106,type:"Individual",floor:1,status:"maintenance"},
  {n:201,type:"Doble",floor:2,status:"available"}, {n:202,type:"Doble Superior",floor:2,status:"available"},
  {n:203,type:"Suite",floor:2,status:"available"}, {n:204,type:"Doble Superior",floor:2,status:"available"},
  {n:205,type:"Individual",floor:2,status:"cleaning"}, {n:206,type:"Doble Superior",floor:2,status:"available"},
  {n:301,type:"Suite",floor:3,status:"available"}, {n:302,type:"Doble",floor:3,status:"available"},
  {n:303,type:"Doble",floor:3,status:"available"}, {n:304,type:"Doble Superior",floor:3,status:"maintenance"},
  {n:305,type:"Individual",floor:3,status:"available"}, {n:306,type:"Suite",floor:3,status:"available"},
  {n:401,type:"Doble",floor:4,status:"cleaning"}, {n:402,type:"Doble",floor:4,status:"available"},
  {n:403,type:"Suite",floor:4,status:"available"}, {n:404,type:"Doble Superior",floor:4,status:"available"},
  {n:405,type:"Familiar",floor:4,status:"available"}, {n:406,type:"Familiar",floor:4,status:"available"},
  {n:501,type:"Familiar",floor:5,status:"available"}, {n:502,type:"Familiar",floor:5,status:"cleaning"},
  {n:503,type:"Doble Superior",floor:5,status:"available"}, {n:504,type:"Suite",floor:5,status:"maintenance"},
  {n:505,type:"Suite",floor:5,status:"available"}, {n:506,type:"Suite Presidencial",floor:5,status:"available"},
];

function getRooms() {
  const hid = getActiveHotelId();
  const all = _readList(ROOMS_KEY);
  const mine = all.filter(r => r.hotelId === hid);
  if (mine.length) return mine;
  // Only the original demo hotel gets the sample 22-room inventory, so
  // the existing demo keeps working out of the box. A newly affiliated
  // real hotel starts with a real, empty inventory — its own staff build
  // their actual rooms from scratch via "Nueva habitación" instead of
  // inheriting fake demo data they'd have to delete first.
  if (hid !== 'h_default') return [];
  const seeded = DEFAULT_ROOMS.map(r => ({ ...r, hotelId: hid }));
  const others = all.filter(r => r.hotelId !== hid);
  _writeList(ROOMS_KEY, [...others, ...seeded]);
  return seeded;
}
function saveRooms(list) {
  const hid = getActiveHotelId();
  const others = _readList(ROOMS_KEY).filter(r => r.hotelId !== hid);
  _writeList(ROOMS_KEY, [...others, ...list]);
}
function updateRoomStatus(n, changes) {
  const rooms = getRooms();
  const idx = rooms.findIndex(r => r.n === n);
  if (idx === -1) return null;
  rooms[idx] = { ...rooms[idx], ...changes };
  saveRooms(rooms);
  return rooms[idx];
}

// Real room inventory management — every hotel starts with the same 22
// demo rooms, but a real affiliated hotel has its own room count, numbers
// and types (whatever they call them: Matrimonial, Simple, Suite...).
// These let staff shape their own inventory instead of being stuck with
// the seeded default.
function addRoom(data) {
  const rooms = getRooms();
  if (rooms.some(r => r.n === data.n)) return 'duplicate';
  const record = { status: 'available', floor: Math.floor(data.n / 100), ...data, hotelId: getActiveHotelId() };
  rooms.push(record);
  saveRooms(rooms);
  return record;
}
function updateRoom(n, changes) {
  const rooms = getRooms();
  const idx = rooms.findIndex(r => r.n === n);
  if (idx === -1) return null;
  if (changes.n && changes.n !== n && rooms.some(r => r.n === changes.n)) return 'duplicate';
  rooms[idx] = { ...rooms[idx], ...changes };
  saveRooms(rooms);
  return rooms[idx];
}
function deleteRoom(n) {
  saveRooms(getRooms().filter(r => r.n !== n));
}
// Every distinct room type this hotel actually uses right now — powers
// the type suggestions when adding/editing a room and the nightly-rate
// list in Configuración, so it always matches the hotel's real inventory.
function getRoomTypes() {
  return [...new Set(getRooms().map(r => r.type).filter(Boolean))].sort();
}

// Merges the persisted room inventory with real, currently-checked-in
// guests — a room only shows as occupied (with a real name) if an active
// guest record actually points to it.
function getRoomsWithOccupancy() {
  const rooms = getRooms().map(r => ({ ...r }));
  getGuestsRegistry().forEach(g => {
    if (!g.room || g.status !== 'activo') return;
    const roomNum = parseInt(g.room, 10);
    const room = rooms.find(r => r.n === roomNum);
    if (room) {
      room.status = 'occupied';
      room.guest = (g.firstName + ' ' + (g.lastName || '')).trim();
    }
  });
  return rooms;
}

// =========================================================
// Demo hotel. Fills a hotel with a complete, realistic setup so the whole
// site can be shown working: 30 rooms across 5 floors (available, cleaning
// and maintenance), a full service menu (32 services in 8 categories),
// nightly rates for every room type and the hotel's contact + Wi-Fi details.
// It only ADDS what is missing — nothing the hotel already has is replaced
// or removed — and it never creates guests or reservations.
// Returns { rooms, services, info } with what was added.
// =========================================================
// What a hotel is missing compared with the demo setup (rooms by number,
// services by id or title — so a service created by hand isn't duplicated).
// stale* = demo prices that still have their old pre-guaraní value (nobody
// edited them), which the loader brings up to the real guaraní amounts.
function getHotelDemoGap(hotelId) {
  const hotel = getHotelById(hotelId) || {};
  const rooms = _readList(ROOMS_KEY).filter(r => r.hotelId === hotelId);
  const catalog = _readList(CATALOG_KEY).filter(s => s.hotelId === hotelId);
  const haveRooms = new Set(rooms.map(r => r.n));
  const haveIds = new Set(catalog.map(s => s.id));
  const haveTitles = new Set(catalog.map(s => String(s.title || '').trim().toLowerCase()));
  const migrated = !!hotel.gsMigrated;
  const staleServices = migrated ? [] : catalog.filter(sv => {
    const legacy = LEGACY_DEMO_PRICES[sv.id];
    const def = DEFAULT_CATALOG.find(x => x.id === sv.id);
    return def && legacy > 0 && sv.price === legacy && def.price !== legacy;
  });
  const rates = hotel.roomRates || {};
  const staleRates = migrated ? [] : Object.keys(LEGACY_DEMO_RATES).filter(t => rates[t] === LEGACY_DEMO_RATES[t] && DEFAULT_HOTEL.roomRates[t] !== LEGACY_DEMO_RATES[t]);
  return {
    rooms: rooms.length,
    services: catalog.length,
    missingRooms: DEFAULT_ROOMS.filter(r => !haveRooms.has(r.n)).map(r => ({ ...r, hotelId })),
    missingServices: DEFAULT_CATALOG.filter(s => !haveIds.has(s.id) && !haveTitles.has(s.title.toLowerCase())).map(s => ({ ...s, hotelId })),
    staleServices,
    staleRates,
  };
}
function demoGapCount(gap) {
  return gap.missingRooms.length + gap.missingServices.length + gap.staleServices.length + gap.staleRates.length;
}
// The site used to show unit-less prices ("$"); everything is now in guaraníes.
// A hotel's old DEMO prices — the ones that still equal the old default of
// that service or room type, i.e. nobody edited them — are converted once,
// and the hotel is stamped (gsMigrated) so a price someone types later is
// never touched. This also covers the charges already placed for those same
// demo services. Returns how many prices were converted.
function migrateHotelPricesToGs(hotelId) {
  const hotel = hotelId && getHotelById(hotelId);
  if (!hotel || hotel.gsMigrated) return 0;
  let n = 0;
  const gap = getHotelDemoGap(hotelId);

  if (gap.staleRates.length) {
    const rates = { ...(hotel.roomRates || {}) };
    gap.staleRates.forEach(t => { rates[t] = DEFAULT_HOTEL.roomRates[t]; });
    updateHotel(hotelId, { roomRates: rates });
    n += gap.staleRates.length;
  }
  if (gap.staleServices.length) {
    const stale = new Set(gap.staleServices.map(sv => sv.id));
    const all = _readList(CATALOG_KEY).map(sv => {
      if (sv.hotelId !== hotelId || !stale.has(sv.id)) return sv;
      const def = DEFAULT_CATALOG.find(x => x.id === sv.id);
      const next = { ...sv, price: def.price };
      if (def.priceFrom) { next.priceFrom = true; if (/^Desde \$/.test(next.priceLabel || '')) delete next.priceLabel; }
      return next;
    });
    if (SS_CLOUD) ssBulkInsert(CATALOG_KEY, all.filter(sv => sv.hotelId === hotelId && stale.has(sv.id)), { upsert: true });
    else _writeList(CATALOG_KEY, all);
    n += gap.staleServices.length;
  }
  // charges already placed for those demo services
  const reqs = _readList(REQUESTS_KEY);
  let reqChanged = 0;
  const nextReqs = reqs.map(r => {
    const legacy = LEGACY_DEMO_PRICES[r.serviceId];
    const def = r.hotelId === hotelId && DEFAULT_CATALOG.find(x => x.id === r.serviceId);
    if (!def || !(legacy > 0) || r.price !== legacy || def.price === legacy) return r;
    reqChanged++;
    return { ...r, price: def.price };
  });
  if (reqChanged) { _writeList(REQUESTS_KEY, nextReqs); n += reqChanged; }

  updateHotel(hotelId, { gsMigrated: true });
  return n;
}
// Runs for whoever signs in as hotel staff (their hotel) or CGO (every hotel).
function migrateAllPricesToGs() {
  const cgo = getCurrentCGO();
  const staff = cgo ? null : getCurrentStaff();
  const ids = cgo ? getHotelsRegistry().map(h => h.id) : (staff && staff.hotelId ? [staff.hotelId] : []);
  return ids.reduce((sum, id) => sum + migrateHotelPricesToGs(id), 0);
}
function loadDemoDataForHotel(hotelId) {
  const hotel = hotelId && getHotelById(hotelId);
  if (!hotel) return null;
  const added = { rooms: 0, services: 0, info: false, updated: 0 };

  // hotel details: fill blanks and add rates for room types that have none
  const info = {};
  ['address', 'phone', 'email', 'wifiName', 'wifiPassword'].forEach(k => {
    if (!hotel[k]) info[k] = k === 'wifiName' ? (String(hotel.name || 'Hotel').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '') + '_Guest') : DEFAULT_HOTEL[k];
  });
  const rates = { ...(hotel.roomRates || {}) };
  Object.keys(DEFAULT_HOTEL.roomRates).forEach(type => { if (!rates[type]) rates[type] = DEFAULT_HOTEL.roomRates[type]; });
  if (JSON.stringify(rates) !== JSON.stringify(hotel.roomRates || {})) info.roomRates = rates;
  if (Object.keys(info).length) { updateHotel(hotelId, info); added.info = true; }
  // old demo prices (nobody edited them) -> guaraníes
  added.updated += migrateHotelPricesToGs(hotelId);

  const fresh = getHotelDemoGap(hotelId);
  if (SS_CLOUD) {
    added.rooms = ssBulkInsert(ROOMS_KEY, fresh.missingRooms);
    added.services = ssBulkInsert(CATALOG_KEY, fresh.missingServices);
  } else {
    if (fresh.missingRooms.length) _writeList(ROOMS_KEY, [..._readList(ROOMS_KEY), ...fresh.missingRooms]);
    if (fresh.missingServices.length) _writeList(CATALOG_KEY, [..._readList(CATALOG_KEY), ...fresh.missingServices]);
    added.rooms = fresh.missingRooms.length;
    added.services = fresh.missingServices.length;
  }
  return added;
}

function getOccupancyStats() {
  const rooms = getRoomsWithOccupancy();
  const total = rooms.length;
  const occupied = rooms.filter(r => r.status === 'occupied').length;
  const byFloor = {};
  rooms.forEach(r => {
    byFloor[r.floor] = byFloor[r.floor] || { total: 0, occupied: 0 };
    byFloor[r.floor].total++;
    if (r.status === 'occupied') byFloor[r.floor].occupied++;
  });
  return {
    total,
    occupied,
    pct: total ? Math.round((occupied / total) * 100) : 0,
    byFloor,
  };
}

// =========================================================
// Hotel info — edited by staff in Configuración, read by
// guest-facing pages (footer contact, Información del hotel).
// =========================================================
const DEFAULT_HOTEL = {
  name: 'SmartStay Hospitality',
  address: 'Calle Teniente Chirife c/ Mercedes Grau, Lambaré, Paraguay',
  phone: '0985 754 063',
  email: 'soporte.smartstay@gmail.com',
  wifiName: 'SmartStay_Guest',
  wifiPassword: 'stay2025',
  // nightly rates in guaraníes
  roomRates: { Individual: 180000, Doble: 250000, 'Doble Superior': 320000, Familiar: 380000, Suite: 480000, 'Suite Presidencial': 850000 },
};

// Resolves to the ACTIVE hotel's own info (the logged-in staff's hotel, or
// the hotel of the guest's matched reservation). Falls back to SmartStay's
// own default contact when there's no hotel context yet (e.g. the public
// marketing site) so index.html's footer keeps showing SmartStay's number,
// not any single affiliated hotel's.
function getHotelInfo() {
  const hid = getActiveHotelId();
  if (hid) {
    const h = getHotelById(hid);
    if (h) return { ...DEFAULT_HOTEL, ...h };
  }
  return { ...DEFAULT_HOTEL };
}
function saveHotelInfo(data) {
  const hid = getActiveHotelId();
  if (!hid) return;
  updateHotel(hid, data);
}

// Applies the current hotel info to any page that opts in via
// data-hotel="name|address|phone|email" attributes.
function applyHotelInfo() {
  const h = getHotelInfo();
  document.querySelectorAll('[data-hotel]').forEach(el => {
    const field = el.getAttribute('data-hotel');
    if (!h[field]) return;
    if (el.tagName === 'A' && field === 'phone') el.href = 'tel:+595' + h.phone.replace(/\D/g, '').replace(/^0/, '');
    if (el.tagName === 'A' && field === 'email') el.href = 'mailto:' + h.email;
    el.textContent = h[field];
  });
}
document.addEventListener('DOMContentLoaded', applyHotelInfo);

// Formats today's real date in Spanish, e.g. "Martes, 15 de septiembre".
function formatTodayEs() {
  const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const d = new Date();
  return `${days[d.getDay()]}, ${d.getDate()} de ${months[d.getMonth()]}`;
}

// Formats an ISO date (yyyy-mm-dd, from a <input type="date">) as a short
// Spanish label, e.g. "30 sep".
function formatDateShortEs(iso) {
  if (!iso) return '';
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

function copyToClipboard(text, btn) {
  const done = () => {
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Copiado';
    setTimeout(() => { btn.innerHTML = original; }, 1600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(done);
  } else {
    done();
  }
}

// =========================================================
// Data backup — everything this site runs on lives in the browser's own
// localStorage, so clearing site data or switching browsers/devices loses
// a hotel's entire operation with no warning. These let staff export a
// real, complete snapshot of their own hotel's data to a file, and
// restore it later (on this browser or a different one).
// =========================================================
function exportHotelBackup() {
  const hid = getActiveHotelId();
  if (!hid) return null;
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    hotel: getHotelById(hid),
    rooms: getRooms(), // getRooms() seeds the default inventory on first access, so this is never empty
    guests: _readList(GUESTS_KEY).filter(g => g.hotelId === hid),
    staff: _readList(STAFF_KEY).filter(s => s.hotelId === hid),
    requests: _readList(REQUESTS_KEY).filter(r => r.hotelId === hid),
    accessLog: _readList(ACCESS_LOG_KEY).filter(e => e.hotelId === hid),
  };
}
// Replaces this hotel's own slice of every shared collection with what's
// in the backup file — other affiliated hotels' data is left untouched.
// Returns false if there's no active hotel to restore into.
function importHotelBackup(data) {
  const hid = getActiveHotelId();
  if (!hid || !data) return false;
  if (data.hotel) updateHotel(hid, { ...data.hotel, id: hid });
  if (Array.isArray(data.rooms)) _writeList(ROOMS_KEY, [..._readList(ROOMS_KEY).filter(r => r.hotelId !== hid), ...data.rooms.map(r => ({ ...r, hotelId: hid }))]);
  if (Array.isArray(data.guests)) _writeList(GUESTS_KEY, [..._readList(GUESTS_KEY).filter(g => g.hotelId !== hid), ...data.guests.map(g => ({ ...g, hotelId: hid }))]);
  if (Array.isArray(data.staff) && !SS_CLOUD) _writeList(STAFF_KEY, [..._readList(STAFF_KEY).filter(s => s.hotelId !== hid), ...data.staff.map(s => ({ ...s, hotelId: hid }))]);
  if (Array.isArray(data.accessLog)) _writeList(ACCESS_LOG_KEY, [..._readList(ACCESS_LOG_KEY).filter(e => e.hotelId !== hid), ...data.accessLog.map(e => ({ ...e, hotelId: hid }))]);
  if (Array.isArray(data.requests)) _writeList(REQUESTS_KEY, [..._readList(REQUESTS_KEY).filter(r => r.hotelId !== hid), ...data.requests.map(r => ({ ...r, hotelId: hid }))]);
  return true;
}

// =========================================================
// Cloud accounts: sign in / sign up / password, through Supabase Auth.
// (Staff and CGO accounts are real logins; guests never have an account.)
// =========================================================
function ssSignOut() {
  if (ssAccessToken()) ssHttp('POST', '/auth/v1/logout', {});
  ssAuthClear();
  SS_MODE = 'anon';
  SS_PROFILE = null;
}
// kind: 'staff' | 'cgo'. Returns the profile on success, null if that account
// isn't of this kind (or has no profile yet), false if the email/password is wrong.
function ssLogin(kind, email, password) {
  const r = ssHttp('POST', '/auth/v1/token?grant_type=password', { email: (email || '').trim().toLowerCase(), password }, { anon: true });
  if (!r.ok) {
    if (r.status === 0) ssNotifyError('No hay conexión con la nube. Revisá tu internet.');
    return false;
  }
  ssAuthSave(r.data);
  const snap = ssRpc('app_snapshot');
  if (!snap.ok || !snap.data || !snap.data.profile || snap.data.profile.kind !== kind) {
    ssSignOut();
    return null;
  }
  ssApplyAccountSnapshot(snap.data);
  return snap.data.profile;
}
// data: { firstName, lastName, email, phone, role, password, hotelId + staffCode (staff) | accessCode (CGO) }
// Returns the new profile, or { error: 'invalid_code' | 'exists' | 'weak_password' | 'confirm_email' | 'network' | 'failed' }.
function ssRegisterAccount(kind, data) {
  const email = (data.email || '').trim().toLowerCase();
  let r = ssHttp('POST', '/auth/v1/signup', { email, password: data.password }, { anon: true });
  if (!r.ok) {
    if (r.status === 0) return { error: 'network' };
    if (/weak|least/i.test(r.message)) return { error: 'weak_password' };
    // an earlier attempt may have created the login but not the profile (wrong code): retry with it
    r = ssHttp('POST', '/auth/v1/token?grant_type=password', { email, password: data.password }, { anon: true });
    if (!r.ok) return { error: 'exists' };
  }
  if (!r.data || !r.data.access_token) return { error: 'confirm_email' };
  ssAuthSave(r.data);
  const profile = { firstName: data.firstName, lastName: data.lastName, phone: data.phone, role: data.role, createdAt: new Date().toISOString() };
  const c = kind === 'cgo'
    ? ssRpc('claim_cgo', { p_code: data.accessCode || '', p_profile: profile })
    : ssRpc('claim_staff', { p_hotel_id: data.hotelId, p_code: data.staffCode || '', p_profile: profile });
  if (!c.ok) {
    ssAuthClear();
    if (/invalid_code/.test(c.message)) return { error: 'invalid_code' };
    if (/already_registered/.test(c.message)) return { error: 'exists' };
    return { error: 'failed', message: c.message };
  }
  const snap = ssRpc('app_snapshot');
  if (snap.ok && snap.data && snap.data.profile) ssApplyAccountSnapshot(snap.data);
  return c.data;
}
function ssChangePassword(currentPassword, newPassword) {
  const a = ssAuthRead();
  if (!a || (SS_MODE !== 'staff' && SS_MODE !== 'cgo')) return 'no-session';
  const chk = ssHttp('POST', '/auth/v1/token?grant_type=password', { email: a.email, password: currentPassword }, { anon: true });
  if (!chk.ok) return 'wrong-current';
  ssAuthSave(chk.data);
  const u = ssHttp('PUT', '/auth/v1/user', { password: newPassword });
  if (u.ok) return 'ok';
  return /weak|least/i.test(u.message) ? 'weak' : 'error';
}
// Supabase sends the recovery email itself; the link brings the person back
// to resetear-password.html with a one-time token in the URL fragment.
// (No query string on that address: Supabase only honours redirect addresses
// that are in its allowed list, and a plain one is the safest match.)
// reason, when it fails: 'network' | 'rate' (too many emails) | 'smtp' (the
// project has no mail server set up yet) | 'other'.
function ssRequestPasswordReset(email, kind) {
  const back = location.origin + location.pathname.replace(/[^/]*$/, '') + 'resetear-password.html';
  const r = ssHttp('POST', '/auth/v1/recover?redirect_to=' + ssEnc(back), { email: (email || '').trim().toLowerCase() }, { anon: true });
  let reason = '';
  if (!r.ok) {
    const txt = r.message + ' ' + r.code;
    if (r.status === 0) reason = 'network';
    else if (r.status === 429 || /rate.?limit/i.test(txt)) reason = 'rate';
    else if (r.status >= 500 || /authorized|smtp|sending|mail/i.test(txt)) reason = 'smtp';
    else reason = 'other';
    console.warn('[SmartStay] recovery email not sent:', r.status, r.code, r.message);
  }
  return { found: r.ok, sent: r.ok, cloud: true, status: r.status, message: r.message, reason };
}
// token: the access_token from the recovery link.
// 'ok' | 'expired' | 'weak' | 'same' (equal to the old one) | 'error'
function ssSetRecoveredPassword(token, newPassword) {
  const r = ssHttp('PUT', '/auth/v1/user', { password: newPassword }, { token });
  if (r.ok) return 'ok';
  const txt = r.message + ' ' + r.code;
  if (/same_password|different from the old/i.test(txt)) return 'same';
  if (/weak|least/i.test(txt)) return 'weak';
  if (r.status === 401 || r.status === 403 || /jwt|expired/i.test(txt)) return 'expired';
  return 'error';
}
// Which kind of account the recovery link belongs to ('cgo' | 'staff' | ''),
// so the "Iniciar sesión" button after resetting goes to the right login.
function ssRecoveredKind(token) {
  const r = ssRpc('app_snapshot', {}, { token });
  return r.ok && r.data && r.data.profile ? r.data.profile.kind : '';
}
// Check-in step 1. A guest has no account: the reservation code (or ID
// number) is what identifies them, and this device gets its own secret
// token that the database later checks on every request.
function ssFindReservation({ code, lastname, documentNumber }) {
  const gi = getGuestInfo() || {};
  let token = gi.token;
  if (!token) {
    const bytes = new Uint8Array(16);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    token = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  const r = ssRpc('guest_login', { p_code: code || '', p_lastname: lastname || '', p_doc: documentNumber || '', p_token: token }, { anon: true });
  if (r.status === 0) { ssNotifyError('No hay conexión con la nube. Revisá tu internet.'); return null; }
  if (!r.ok || !r.data) return null;
  saveGuestInfo({ token, registeredGuestId: r.data.id });
  ssGuestBoot();
  return r.data;
}

ssCloudBoot();
let SS_PRICES_CONVERTED = 0;
try { SS_PRICES_CONVERTED = migrateAllPricesToGs(); } catch (e) { console.warn('[SmartStay] price conversion', e); }
document.addEventListener('DOMContentLoaded', () => {
  ssStartPolling();
  if (SS_PRICES_CONVERTED) showToast('Precios de demostración pasados a guaraníes (' + SS_PRICES_CONVERTED + ')');
});
