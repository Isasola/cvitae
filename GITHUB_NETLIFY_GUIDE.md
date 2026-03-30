# Guía Completa: GitHub + Netlify · CVitae v2.1

**Esta guía te enseña paso a paso cómo subir tu proyecto a GitHub y conectarlo a Netlify.**

---

## PARTE 1: Preparar tu GitHub

### Paso 1: Crear repositorio en GitHub

1. Ir a **https://github.com/new**
2. Llenar el formulario:
   - **Repository name:** `cvitae`
   - **Description:** `CVitae - Perfiles Profesionales de Alto Impacto`
   - **Visibility:** Public (o Private si preferís)
   - **Initialize this repository with:** NO marcar nada
3. Hacer clic en **Create repository**

**Resultado:** GitHub te muestra una URL como `https://github.com/TU_USUARIO/cvitae.git`

---

### Paso 2: Configurar Git en tu computadora

Abrir terminal y ejecutar:

```bash
# Ir a la carpeta del proyecto
cd /home/ubuntu/cvitae

# Configurar tu nombre y email (si no lo hiciste antes)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "Initial commit: CVitae v2.1 - Perfiles Profesionales de Alto Impacto"

# Cambiar rama a main
git branch -M main

# Agregar el repositorio remoto (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/cvitae.git

# Subir a GitHub
git push -u origin main
```

**Resultado:** Todo el código está en GitHub. Podés verlo en `https://github.com/TU_USUARIO/cvitae`

---

## PARTE 2: Conectar GitHub a Netlify

### Paso 3: Crear sitio en Netlify

1. Ir a **https://app.netlify.com**
2. Hacer clic en **Add new site**
3. Seleccionar **Import an existing project**
4. Seleccionar **GitHub**
5. Autorizar a Netlify (si es la primera vez)
6. Buscar y seleccionar repositorio `cvitae`

---

### Paso 4: Configurar build en Netlify

Netlify te muestra una pantalla con:

- **Owner:** Tu cuenta
- **Branch to deploy:** `main`
- **Build command:** `pnpm build`
- **Publish directory:** `dist`

**Verificar que esté correcto y hacer clic en Deploy site**

**Resultado:** Netlify automáticamente:
1. Descarga el código de GitHub
2. Ejecuta `pnpm build`
3. Sube a un sitio en vivo (~3 minutos)

---

### Paso 5: Agregar variables de entorno en Netlify

1. En Netlify, ir a **Settings → Environment**
2. Hacer clic en **Edit variables**
3. Agregar estas variables (copiar/pegar los valores):

```
SUPABASE_URL = https://rbrirxbjbmdxflzaxxzp.supabase.co
SUPABASE_KEY = sb_publishable_KLszRKABcKgzctvmUJCVIg_jksijSnl
ANTHROPIC_API_KEY = TU_ANTHROPIC_API_KEY_AQUI
EMAILJS_SERVICE_ID = service_muvlq14
EMAILJS_TEMPLATE_ID = template_u399kvj
EMAILJS_PUBLIC_KEY = CZy-kIlMnZIBxjh15
ADMIN_PASSWORD = cvitae2026admin
SITE_URL = https://cvitae-py.netlify.app
```

4. Hacer clic en **Save**
5. Netlify automáticamente redeploy

**Resultado:** Las variables están configuradas. El panel admin funciona.

---

## PARTE 3: Hacer cambios y actualizar

### Cada vez que hagas un cambio:

```bash
# 1. Verificar qué cambió
git status

# 2. Agregar los cambios
git add .

# 3. Crear un commit con descripción
git commit -m "Descripción del cambio"

# 4. Subir a GitHub
git push origin main
```

**Resultado:** Netlify automáticamente ve los cambios y redeploy (~2 minutos)

---

## Ejemplos de cambios comunes

### Cambiar el copy de la home

```bash
# Editar client/src/pages/Home.tsx
# Luego:
git add client/src/pages/Home.tsx
git commit -m "Update: mejorar copy del hero"
git push origin main
```

### Agregar una nueva página

```bash
# Crear client/src/pages/NuevaPagina.tsx
# Actualizar client/src/App.tsx con la nueva ruta
# Luego:
git add client/src/pages/NuevaPagina.tsx client/src/App.tsx
git commit -m "Feature: agregar página de nuevas oportunidades"
git push origin main
```

### Cambiar variables de entorno

```bash
# NO hacer push de .env.local
# En Netlify: Settings → Environment → Edit variables
# Cambiar el valor
# Hacer clic en Save
# Netlify automáticamente redeploy
```

---

## Troubleshooting

### Error: "fatal: not a git repository"

Solución: Ejecutar `git init` en la carpeta del proyecto

### Error: "fatal: 'origin' does not appear to be a 'git' repository"

Solución: Ejecutar `git remote add origin https://github.com/TU_USUARIO/cvitae.git`

### Error: "Permission denied (publickey)"

Solución: Configurar SSH key en GitHub (ver: https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### Netlify no redeploy después de push

Solución:
1. Ir a Netlify → Deploys
2. Hacer clic en **Trigger deploy**
3. Seleccionar **Deploy site**

### El sitio dice "Page not found"

Solución: Esperar 2-3 minutos a que Netlify termine el build. Ver el estado en Netlify → Deploys

---

## Próximos pasos

Después de que todo esté funcionando:

1. **Cambiar dominio:** Netlify → Settings → Domain management
2. **Agregar SSL:** Automático en Netlify
3. **Analytics:** Ir a Netlify → Analytics
4. **Backups:** GitHub es tu backup (siempre tenés el código)

---

## Ayuda rápida

- **¿Cómo veo mi sitio en vivo?** Ir a Netlify → Overview → Live site URL
- **¿Cómo veo los logs del build?** Netlify → Deploys → Haz clic en el deploy → Build log
- **¿Cómo revierzo un cambio?** `git revert HEAD` (crea un nuevo commit que deshace el anterior)
- **¿Cómo veo el historial de cambios?** `git log` o en GitHub → Commits

---

**¡Listo! Ahora estás listo para trabajar con GitHub + Netlify.** 🚀

Cualquier duda, preguntame.
