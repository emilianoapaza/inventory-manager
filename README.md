# Inventory Manager

Aplicación web de gestión de inventario desarrollada con React, Material UI y Firebase. Permite a los usuarios administrar sus productos desde una interfaz responsive, con autenticación y almacenamiento persistente en la nube.

**Demo:** [Inventory Manager](https://inventory-manager-eea.vercel.app/)

## Funcionalidades

- **Autenticación:** registro e inicio de sesión con Firebase Authentication.
- **Gestión de productos:** creación, consulta, edición y eliminación de productos (CRUD).
- **Inventarios privados:** cada usuario accede únicamente a sus propios productos mediante reglas de seguridad de Cloud Firestore.
- **Búsqueda y filtrado:** búsqueda de productos por nombre y filtrado por categoría.
- **Panel de administración:** resumen del inventario con indicadores de productos registrados, unidades totales y productos con stock bajo.
- **Interfaz responsive:** diseño adaptable a distintos tamaños de pantalla.
- **Tema visual:** soporte para modo claro y oscuro mediante Material UI.

## Tecnologías utilizadas

- **React** — construcción de la interfaz mediante componentes.
- **Vite** — entorno de desarrollo y herramienta de compilación.
- **Material UI (MUI)** — componentes y estilos de interfaz.
- **React Router** — navegación entre páginas.
- **Firebase Authentication** — autenticación de usuarios.
- **Cloud Firestore** — almacenamiento de productos en la nube.
- **Git y GitHub** — control de versiones y alojamiento del código fuente.
- **Vercel** — despliegue de la aplicación.

## Ejecutar el proyecto localmente

### Requisitos previos

- Node.js y npm.
- Una cuenta de Firebase.
- Un proyecto de Firebase con Authentication y Cloud Firestore configurados.

### 1. Clonar el repositorio

```bash
git clone https://github.com/emilianoapaza/inventory-manager.git
cd inventory-manager
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Creá un archivo `.env` en la raíz del proyecto y agregá las variables que utiliza la configuración de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

Reemplazá los valores de ejemplo por los de tu aplicación web de Firebase. Podés encontrarlos en la configuración de tu proyecto, dentro de la sección de aplicaciones web.

### 4. Configurar Firebase

En Firebase Console:

1. Habilitá los métodos de autenticación que utiliza la aplicación.
2. Creá o habilitá Cloud Firestore.
3. Configurá las reglas de seguridad para que cada usuario solo pueda acceder a su propio inventario.
4. Agregá los dominios necesarios en la configuración de dominios autorizados de Authentication.

La aplicación organiza los productos por usuario, utilizando la estructura:

```text
usuarios/{userId}/productos/{productoId}
```

Las reglas de Firestore deben validar la identidad del usuario autenticado y restringir el acceso al inventario correspondiente.

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará la dirección local para abrir la aplicación en el navegador.

## Despliegue

La aplicación está desplegada en Vercel y utiliza Firebase para la autenticación y el almacenamiento de datos.

Las variables de entorno deben configurarse también en los ajustes del proyecto de Vercel para los entornos de despliegue correspondientes.

## Objetivo del proyecto

Este proyecto forma parte de mi práctica de desarrollo frontend y busca aplicar conocimientos de React en una aplicación funcional, incorporando autenticación, persistencia de datos, operaciones CRUD, enrutamiento, diseño responsive, material UI y control de acceso mediante reglas de seguridad.

---

Desarrollado como proyecto de práctica con React y Firebase.
