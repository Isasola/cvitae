# Configuración de Variables de Entorno · CVitae v2.1

---

## En Desarrollo Local

Crear archivo `.env.local` en la raíz del proyecto:

```env
# SUPABASE (Base de datos)
SUPABASE_URL=https://rbrirxbjbmdxflzaxxzp.supabase.co
SUPABASE_KEY=TU_SUPABASE_KEY_AQUI

# ANTHROPIC (Generación de extras)
ANTHROPIC_API_KEY=TU_ANTHROPIC_API_KEY_AQUI

# EMAILJS (Envío de correos)
EMAILJS_SERVICE_ID=service_muvlq14
EMAILJS_TEMPLATE_ID=template_u399kvj
EMAILJS_PUBLIC_KEY=CZy-kIlMnZIBxjh15

# ADMIN (Seguridad)
ADMIN_PASSWORD=cvitae2026admin

# SITE (Configuración general)
SITE_URL=https://cvitae-py.netlify.app
```

**Importante:** NO commitear `.env.local` a Git (ya está en `.gitignore`)

---

## En Netlify (Producción)

1. Ir a **https://app.netlify.com**
2. Seleccionar tu sitio **cvitae-py**
3. Ir a **Settings → Environment**
4. Hacer clic en **Edit variables**
5. Agregar cada variable:

| Variable | Valor |
|---|---|
| `SUPABASE_URL` | Tu URL de Supabase |
| `SUPABASE_KEY` | Tu clave de Supabase |
| `ANTHROPIC_API_KEY` | Tu API key de Anthropic |
| `EMAILJS_SERVICE_ID` | `service_muvlq14` |
| `EMAILJS_TEMPLATE_ID` | `template_u399kvj` |
| `EMAILJS_PUBLIC_KEY` | `CZy-kIlMnZIBxjh15` |
| `ADMIN_PASSWORD` | `cvitae2026admin` |
| `SITE_URL` | `https://cvitae-py.netlify.app` |

6. Hacer clic en **Save**
7. Netlify automáticamente redeploy con las nuevas variables

---

## Verificar que funciona

Después de agregar las variables en Netlify:

1. Ir a **Deploys**
2. Hacer clic en **Trigger deploy**
3. Esperar ~2 minutos
4. Visitar https://cvitae-py.netlify.app/#admin
5. Ingresar contraseña: `cvitae2026admin`
6. Si ves la lista de pedidos, ¡todo funciona! ✅

---

## Seguridad

- ✅ Las variables en Netlify NO se exponen en el código
- ✅ Solo las funciones serverless pueden acceder a ellas
- ✅ El navegador NO ve las API keys
- ✅ Cambiar `ADMIN_PASSWORD` después del primer acceso

---

## Troubleshooting

**Error: "Error leyendo Supabase"**
- Verificar que `SUPABASE_URL` y `SUPABASE_KEY` sean correctos
- Verificar que la tabla `pedidos` existe en Supabase

**Error: "Error llamando a Anthropic"**
- Verificar que `ANTHROPIC_API_KEY` sea válido
- Verificar que la API key tenga créditos disponibles

**Error: "Error EmailJS"**
- Verificar que `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` y `EMAILJS_PUBLIC_KEY` sean correctos
- Verificar que el template exista en EmailJS

---

## Cambiar variables después del deploy

Si necesitás cambiar una variable:

1. Ir a Netlify → Settings → Environment
2. Editar la variable
3. Hacer clic en **Save**
4. Netlify automáticamente redeploy

**No necesitás tocar GitHub ni hacer push nuevamente.**

---

Hecho con ❤️ en Paraguay | CVitae v2.1
