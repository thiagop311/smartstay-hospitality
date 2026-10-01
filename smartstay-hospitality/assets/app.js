// SmartStay Hospitality — shared UI helpers (toast, modal, accordion, tabs, copy)

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
    'benefits.b1Title': 'Acceso sin límites', 'benefits.b1Desc': 'Llave digital NFC para habitaciones y áreas del hotel',
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
    'footer.copyright': 'SmartStay Hospitality © 2025 · Todos los derechos reservados',
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
    'ci.feature2Desc': 'Accede a tu habitación y áreas autorizadas.',
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
    'cta.paymentMethod': 'Método de pago', 'cta.cardOnFile': 'Visa terminada en 4821, guardada para consumos adicionales durante tu estadía.',
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
    'asis.q1': '¿Cómo abro la puerta con la llave digital?',
    'asis.a1': 'Acercá tu celular con la app de SmartStay abierta al lector NFC de la puerta. La llave se activa automáticamente al completar el check-in.',
    'asis.q2': '¿Puedo cambiar la hora de mi check-out?',
    'asis.a2': 'Sí, escribinos por WhatsApp o contactá a recepción con al menos 3 horas de anticipación para coordinar un check-out tardío, sujeto a disponibilidad.',
    'asis.q3': '¿Cómo solicito un servicio a mi habitación?',
    'asis.a3': 'Ingresá a la sección "Servicios" desde el menú principal, elegí lo que necesites y tocá "Solicitar". Se carga automáticamente a tu habitación.',
    'asis.q4': '¿Qué pasa si pierdo el acceso a mi llave digital?',
    'asis.a4': 'Contactá a recepción desde esta misma pantalla (WhatsApp, llamada o en persona) y te generamos una nueva llave digital al instante.',
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
    'portal.nfcTitle': 'Llave digital NFC', 'portal.nfcDesc': 'Acerca tu celular a la puerta para ingresar.',
    'portal.doorUnlocked': 'Puerta desbloqueada', 'portal.openKey': 'Abrir llave',
    'portal.stayTotal': 'Total estadía', 'portal.noServicesYet': 'Todavía no solicitaste ningún servicio.',
    'portal.checkinConfirmedTitle': 'Check-in confirmado', 'portal.keyActive': 'Tu llave digital ya está activa.',
    'portal.completed': 'Completado', 'portal.inProgress': 'En proceso', 'portal.requestReceived': 'Solicitud recibida',
    'portal.checkoutReminderTitle': 'Recordatorio de check-out', 'portal.departureIs': 'Tu salida es',
    'portal.coordinateWithReception': 'a coordinar con recepción',
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
    'benefits.b1Title': 'Unlimited access', 'benefits.b1Desc': 'NFC digital key for rooms and hotel areas',
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
    'footer.copyright': 'SmartStay Hospitality © 2025 · All rights reserved',
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
    'ci.feature2Desc': 'Access your room and authorized areas.',
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
    'cta.paymentMethod': 'Payment method', 'cta.cardOnFile': 'Visa ending in 4821, saved for extra charges during your stay.',
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
    'asis.q1': 'How do I open the door with the digital key?',
    'asis.a1': 'Hold your phone, with the SmartStay app open, near the door\'s NFC reader. The key activates automatically once you complete check-in.',
    'asis.q2': 'Can I change my check-out time?',
    'asis.a2': 'Yes — message us on WhatsApp or contact the front desk at least 3 hours ahead to arrange a late check-out, subject to availability.',
    'asis.q3': 'How do I request a service to my room?',
    'asis.a3': 'Go to the "Services" section from the main menu, choose what you need, and tap "Request." It\'s charged to your room automatically.',
    'asis.q4': 'What happens if I lose access to my digital key?',
    'asis.a4': "Contact the front desk right from this screen (WhatsApp, call, or in person) and we'll issue you a new digital key instantly.",
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
    'portal.nfcTitle': 'NFC digital key', 'portal.nfcDesc': 'Hold your phone near the door to get in.',
    'portal.doorUnlocked': 'Door unlocked', 'portal.openKey': 'Unlock',
    'portal.stayTotal': 'Stay total', 'portal.noServicesYet': "You haven't requested any service yet.",
    'portal.checkinConfirmedTitle': 'Check-in confirmed', 'portal.keyActive': 'Your digital key is already active.',
    'portal.completed': 'Completed', 'portal.inProgress': 'In progress', 'portal.requestReceived': 'Request received',
    'portal.checkoutReminderTitle': 'Check-out reminder', 'portal.departureIs': 'Your departure is',
    'portal.coordinateWithReception': 'to be coordinated with the front desk',
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
  document.querySelectorAll('.lang-code').forEach(el => { el.textContent = lang.toUpperCase(); });
}
function setLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang === 'en' ? 'en' : 'es');
  applyI18n();
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
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function _writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
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
  if (list.length) return list;
  // Seeds the original demo hotel so existing flows (and a fresh visitor
  // who hasn't used the CGO panel yet) keep working out of the box.
  const seeded = [{ id: 'h_default', createdAt: new Date().toISOString(), active: true, ...DEFAULT_HOTEL }];
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
  const staffEmail = localStorage.getItem(CURRENT_STAFF_KEY);
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
  const staff = findStaffByEmail(email);
  if (!staff) return null;
  if (staff.password !== password) return false;
  return staff;
}
// Changes the logged-in staff member's real stored password. Returns:
// 'no-session' (nobody logged in), 'wrong-current' (current password
// didn't match), or 'ok' (updated).
function changeCurrentStaffPassword(currentPassword, newPassword) {
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
  const account = kind === 'cgo' ? findCGOByEmail(email) : findStaffByEmail(email);
  if (!account) return { found: false };
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const resets = _readList(PASSWORD_RESETS_KEY).filter(r => r.email.toLowerCase() !== email.toLowerCase());
  resets.push({ email: account.email, token, kind, expiresAt: Date.now() + 30 * 60 * 1000 });
  _writeList(PASSWORD_RESETS_KEY, resets);
  const resetUrl = location.origin + location.pathname.replace(/[^/]*$/, '') + 'resetear-password.html?email=' + encodeURIComponent(account.email) + '&token=' + token;
  return { found: true, resetUrl, firstName: account.firstName };
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

function setCurrentStaffEmail(email) {
  localStorage.setItem(CURRENT_STAFF_KEY, email);
}
function getCurrentStaff() {
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
  const c = findCGOByEmail(email);
  if (!c) return null;
  if (c.password !== password) return false;
  return c;
}
function setCurrentCGOEmail(email) { localStorage.setItem(CURRENT_CGO_KEY, email); }
function getCurrentCGO() {
  const email = localStorage.getItem(CURRENT_CGO_KEY);
  return email ? findCGOByEmail(email) : null;
}
function logoutCGO(redirectTo) {
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
  const occupiedRooms = rooms.filter(r => r.status === 'occupied' || guests.some(g => g.status === 'activo' && (g.room || '').split('·')[0].trim() === String(r.n))).length;
  return {
    hotelId,
    name: hotel.name || 'Hotel',
    active: hotel.active !== false,
    revenue,
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
    totalRooms: acc.totalRooms + h.totalRooms,
    occupiedRooms: acc.occupiedRooms + h.occupiedRooms,
    activeGuests: acc.activeGuests + h.activeGuests,
    totalGuests: acc.totalGuests + h.totalGuests,
    staffCount: acc.staffCount + h.staffCount,
    serviceRequestCount: acc.serviceRequestCount + h.serviceRequestCount,
  }), { revenue: 0, totalRooms: 0, occupiedRooms: 0, activeGuests: 0, totalGuests: 0, staffCount: 0, serviceRequestCount: 0 });
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
const DEFAULT_CATALOG = [
  { id: 'svc1', category: 'Room service', icon: 'food', title: 'Desayuno a la habitación', desc: 'Selección de desayuno continental o americano servido en tu habitación.', price: 3200, unit: '/ pedido', badge: '24/7' },
  { id: 'svc2', category: 'Room service', icon: 'restaurant', title: 'Carta de almuerzo y cena', desc: 'Platos principales, entradas y postres del restaurante del hotel.', price: 4200, unit: '/ plato', priceLabel: 'Desde $4.200 / plato', badge: '30 min' },
  { id: 'svc3', category: 'Room service', icon: 'minibar', title: 'Reposición de minibar', desc: 'Solicita la reposición de bebidas y snacks de tu minibar.', price: 0, priceLabel: 'Según consumo', badge: 'Incluido' },
  { id: 'svc4', category: 'Spa & bienestar', icon: 'spa', title: 'Masaje relajante', desc: 'Sesión de masaje corporal completo en nuestro spa.', price: 9500, unit: '/ sesión', badge: '60 min' },
  { id: 'svc5', category: 'Spa & bienestar', icon: 'pool', title: 'Acceso a piscina climatizada', desc: 'Uso exclusivo de la piscina y área de descanso del spa.', price: 0, priceLabel: 'Incluido', badge: 'Todo el día' },
  { id: 'svc6', category: 'Spa & bienestar', icon: 'yoga', title: 'Sesión de yoga privada', desc: 'Clase individual guiada por un instructor certificado.', price: 6800, unit: '/ sesión', badge: '45 min' },
  { id: 'svc7', category: 'Lavandería', icon: 'laundry', title: 'Lavado y planchado', desc: 'Servicio completo de lavado y planchado de tu ropa.', price: 2500, unit: '/ bolsa', badge: '24 hs' },
  { id: 'svc8', category: 'Lavandería', icon: 'laundry-express', title: 'Lavado exprés', desc: 'Servicio urgente de lavado listo en pocas horas.', price: 4100, unit: '/ bolsa', badge: 'Express · 4 hs' },
  { id: 'svc9', category: 'Limpieza', icon: 'cleaning', title: 'Limpieza extra de habitación', desc: 'Servicio de limpieza adicional fuera del horario habitual.', price: 0, priceLabel: 'Sin cargo', badge: '30 min' },
  { id: 'svc10', category: 'Limpieza', icon: 'amenities', title: 'Amenities adicionales', desc: 'Toallas, almohadas y artículos de aseo extra para tu habitación.', price: 0, priceLabel: 'Sin cargo', badge: 'A pedido' },
  { id: 'svc11', category: 'Transporte', icon: 'transport', title: 'Traslado al aeropuerto', desc: 'Servicio de traslado privado desde y hacia el aeropuerto.', price: 8900, unit: '/ trayecto', badge: 'Reserva previa' },
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
  return { items, total, roomItem, serviceItems };
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
  roomRates: { Individual: 45000, Doble: 58000, 'Doble Superior': 72000, Suite: 98000 },
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
  if (Array.isArray(data.staff)) _writeList(STAFF_KEY, [..._readList(STAFF_KEY).filter(s => s.hotelId !== hid), ...data.staff.map(s => ({ ...s, hotelId: hid }))]);
  if (Array.isArray(data.requests)) _writeList(REQUESTS_KEY, [..._readList(REQUESTS_KEY).filter(r => r.hotelId !== hid), ...data.requests.map(r => ({ ...r, hotelId: hid }))]);
  return true;
}
