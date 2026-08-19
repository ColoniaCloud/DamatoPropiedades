<div align="center">

# 🏡 D'Amato Propiedades

### Sitio inmobiliario headless construido con Next.js + Tokko Broker API

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Demo](#) · [Reportar un bug](../../issues) · [Solicitar feature](../../issues)

</div>

---

## 📋 Índice

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Stack tecnológico](#-stack-tecnológico)
- [Features](#-features)
- [Capturas](#-capturas)
- [Empezando](#-empezando)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Variables de entorno](#variables-de-entorno)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Integración con Tokko Broker](#-integración-con-tokko-broker)
- [Deploy](#-deploy)
- [Roadmap](#-roadmap)
- [Créditos](#-créditos)

---

## 🏠 Sobre el proyecto

**D'Amato Propiedades** es el sitio web institucional y catálogo de propiedades de la inmobiliaria, desarrollado como aplicación **headless** sobre **Next.js**, consumiendo el catálogo de propiedades en tiempo real a través de la **API de Tokko Broker**.

El objetivo es ofrecer una experiencia rápida, moderna y optimizada para SEO, dejando la gestión de propiedades (altas, bajas, fotos, precios) 100% en manos del CRM inmobiliario que ya usa el equipo, sin depender de un CMS pesado ni de carga manual de contenido.

## 🛠 Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | Next.js (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Datos | Tokko Broker API (headless) |
| Mapas | Integración de coordenadas geográficas por propiedad |
| Hosting / CI-CD | Vercel |
| DNS | Migrado a Vercel DNS |

## ✨ Features

- 🔍 **Catálogo de propiedades** sincronizado en vivo con Tokko Broker
- 🗺️ **Mapa interactivo** con la ubicación exacta de cada propiedad
- 🏷️ **Filtros** por tipo de operación, zona, precio y tipo de propiedad
- 📱 **Diseño responsive**, mobile-first
- ⚡ **Renderizado optimizado** (SSR/ISR) para SEO y velocidad de carga
- 📄 **Fichas de propiedad** con galería de imágenes, características y contacto directo

## 📸 Capturas

<div align="center">

### Home
<img src="https://i.ibb.co/Y7PtBr0m/download.png" alt="Home D'Amato Propiedades" width="800"/>

### Listado de propiedades
<img src="https://i.ibb.co/VGrm1gm/download.png" alt="Listado de propiedades" width="800"/>

### Ficha de propiedad
<img src="https://i.ibb.co/8Lsc5XG5/download.png" alt="Ficha de propiedad" width="800"/>

</div>

## 🚀 Empezando

### Requisitos

- Node.js 18+
- npm / pnpm / yarn
- Credenciales de acceso a la API de Tokko Broker

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ColoniaCloud/damato-propiedades.git
cd damato-propiedades

# Instalar dependencias
npm install

# Correr en modo desarrollo
npm run dev
```

La app queda disponible en `http://localhost:3000`.

### Variables de entorno

Crear un archivo `.env.local` en base al siguiente ejemplo:

```env
# Tokko Broker API
TOKKO_API_KEY=tu_api_key_aqui
TOKKO_API_URL=https://www.tokkobroker.com/api/v1

# Sitio
NEXT_PUBLIC_SITE_URL=https://damatopropiedades.com
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_CONTACT_EMAIL=

# Mapas
NEXT_PUBLIC_MAPS_API_KEY=
```

> ⚠️ Nunca subir el `.env.local` al repositorio. Ya está incluido en `.gitignore`.

## 📁 Estructura del proyecto

```
damato-propiedades/
├── app/                    # Rutas (App Router de Next.js)
│   ├── (site)/             # Páginas públicas
│   ├── propiedades/        # Listado y fichas de propiedad
│   └── api/                # Endpoints internos (proxy a Tokko)
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes de UI base
│   └── property/           # Cards, filtros, galería, mapa
├── lib/
│   ├── tokko/               # Cliente y helpers de la API de Tokko Broker
│   └── utils/
├── public/                 # Assets estáticos
├── docs/                    # Documentación y screenshots
└── README.md
```

## 🔌 Integración con Tokko Broker

El sitio no almacena las propiedades en una base propia: todo el contenido se obtiene en tiempo real (o vía ISR con revalidación) directamente desde la API de Tokko Broker.

- **Listado:** consulta paginada con filtros (tipo de operación, tipo de propiedad, zona, rango de precio).
- **Ficha de propiedad:** detalle completo, galería de fotos y datos de ubicación con coordenadas para el mapa.
- **Sincronización:** cualquier cambio cargado en el CRM (alta, baja, modificación de precio o fotos) se refleja automáticamente en el sitio sin intervención manual.

## ☁️ Deploy

El proyecto está desplegado en **Vercel**, con el dominio gestionado también desde Vercel DNS.

```bash
# Deploy manual (si hace falta)
vercel --prod
```

Cada push a `main` dispara un deploy automático a producción vía integración de Vercel con GitHub.

## 🗺️ Roadmap

- [ ] Buscador con autocompletado por zona/barrio
- [ ] Comparador de propiedades
- [ ] Sección de tasaciones online
- [ ] Blog / novedades inmobiliarias
- [ ] Panel de favoritos para usuarios recurrentes

## 📄 Licencia

Este proyecto está bajo licencia **[AGPL-3.0](./LICENSE)**.

⚠️ Además, el contenido de este repositorio **no puede usarse para entrenar, ajustar (fine-tune) o evaluar modelos de machine learning / IA** sin permiso escrito del autor. Ver [`NOTICE.md`](./NOTICE.md) para el detalle completo de esta restricción adicional.

## 🤝 Créditos

<div align="center">
Desarrollado  por **[Colonia Cloud](https://colonia.cloud)** — desarrollo web, UX y automatizaciones con IA para PyMEs.

Hecho con 🧉 en Colonia del Sacramento, Uruguay

</div>
