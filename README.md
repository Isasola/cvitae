# CVitae 🇵🇾
### Generador de CVs con IA para Paraguay y Latinoamérica

**[cvitae-py.netlify.app](https://cvitae-py.netlify.app)** · Generá tu CV profesional en minutos, adaptado exactamente al puesto que buscás.

---

## ¿Qué es CVitae?

CVitae usa **Anthropic Claude** (la IA más avanzada del mundo) para generar CVs profesionales adaptados palabra por palabra al aviso de trabajo. No es un CV genérico — es un CV que pasa filtros ATS y llega a ojos humanos.

Por **₲50.000 pago único** el cliente recibe:

- 📄 CV en PDF adaptado al aviso exacto (ATS optimizado)
- ✉️ Carta de presentación personalizada
- 🎤 3 respuestas listas para la entrevista
- 💼 Mensaje para contactar al reclutador en LinkedIn
- 🌍 En el idioma que necesite (español, inglés, portugués)
- ✅ Revisión humana antes de entregar

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML / CSS / JS puro |
| Backend | Netlify Functions (Node.js) |
| IA | Anthropic Claude Haiku |
| Base de datos | JSONBin |
| Emails | EmailJS |
| Deploy | Netlify |

---

## Funciones Netlify

| Función | Descripción |
|---------|-------------|
| `chat.js` | Genera el CV vía Anthropic API |
| `save-cv.js` | Guarda el pedido en JSONBin |
| `get-cv.js` | Recupera CV + kit completo por ID |
| `cvadmin.js` | Panel admin: listar, aprobar, eliminar pedidos |

---

## Flujo del producto

```
Cliente llena formulario → preview del CV
        ↓
Paga → "Ya pagué" → pedido guardado en JSONBin
        ↓
Admin aprueba → IA genera carta + entrevista + LinkedIn
        ↓
Cliente recibe email con link cv.html?id=XXXX
        ↓
Cliente ve kit completo → descarga PDF
```

---

## Variables de entorno necesarias

```
ANTHROPIC_API_KEY=
JSONBIN_KEY=
JSONBIN_BIN_ID=
ADMIN_PASSWORD=
```

---

## Planes

| Plan | Precio | Incluye |
|------|--------|---------|
| CV Digital | ₲50.000 | CV + carta + entrevista + LinkedIn |
| Portafolio Web | ₲120.000 | Todo lo anterior + página personal online |

---

## Contacto

- 🌐 [cvitae-py.netlify.app](https://cvitae-py.netlify.app)
- 📱 WhatsApp: [+595 992 954 169](https://wa.me/595992954169)
- 📧 cpdparaguay@gmail.com
- 📸 Instagram: [@cpdparaguay](https://instagram.com/cpdparaguay)

---

*Hecho con ❤️ en Asunción, Paraguay 🇵🇾*
