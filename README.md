
# Marvel Comics Application

## Descripción
Esta es una aplicación web que permite a los usuarios registrarse, iniciar sesión, ver una lista de cómics de Marvel, ver detalles de cada cómic y gestionar una lista personalizada de cómics favoritos. El proyecto utiliza Angular para el front-end, NestJS para el back-end y MongoDB para la base de datos. La aplicación se basa en la API de Marvel para obtener información sobre los cómics.

## Características
- Registro de usuarios (nombre, identificación y correo electrónico).
- Iniciar sesión para acceder a la aplicación.
- Ver el listado de cómics con su respectiva imagen.
- Ver el detalle de cada cómic, mostrando la imagen y la información correspondiente.
- Crear una lista personalizada con los cómics favoritos.
- Persistencia de la información de los usuarios y sus preferencias.

## Requisitos Previos
- Node.js (versión 20.11.0)
- Angular CLI (17.3.8)
- NestJS CLI (10.8.2)
- MongoDB (versión 4 o superior)

## Instalación

### Clonar el Repositorio
```bash
git clone https://github.com/jelondono/marvel-frontend.git
cd marvel-comics-app
```


### Configuración del Front-end (Angular)
```bash
cd marvel-frontend
npm install
```

#### Ejecutar el Front-end
```bash
ng serve
```

### Estructura del Proyecto del Front-end
```
marvel-frontend/
│
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── auth.component.html
│   │   │   ├── auth.component.scss
│   │   │   ├── auth.component.ts
│   │   ├── comics/
│   │   │   ├── comic-detail-modal/
│   │   │   │   ├── comic-detail-modal.component.html
│   │   │   │   ├── comic-detail-modal.component.scss
│   │   │   │   ├── comic-detail-modal.component.ts
│   │   │   ├── comic-favorites/
│   │   │   │   ├── comic-favorites.component.html
│   │   │   │   ├── comic-favorites.component.scss
│   │   │   │   ├── comic-favorites.component.ts
│   │   │   ├── comic-list/
│   │   │   │   ├── comic-list.component.html
│   │   │   │   ├── comic-list.component.scss
│   │   │   │   ├── comic-list.component.ts
│   │   ├── layout/
│   │   │   ├── layout.component.html
│   │   │   ├── layout.component.scss
│   │   │   ├── layout.component.ts
│   │   ├── models/
│   │   │   ├── Comic.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── comic.service.ts
│   │   │   ├── loading.service.ts
│   │   │   ├── user.service.ts
│   │   ├── utils/
│   │   │   ├── auth.guards.ts
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── environments.ts
│   ├── assets/
│   ├── app.module.ts
│   ├── app.routes.ts
│   ├── main.ts
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
```

## Buenas Prácticas de Desarrollo

### Front-end (Angular)
- **Componentización**: División de la UI en componentes reutilizables y de fácil mantenimiento.
- **Servicios**: Uso de servicios para manejar la lógica de negocio y la comunicación con el back-end.
- **RxJS**: Uso de RxJS para manejar operaciones asíncronas y flujos de datos reactivos.
- **Buenas prácticas de estilo**: Uso de SCSS para los estilos, siguiendo una convención de nombres BEM (Block Element Modifier) para mantener el CSS organizado y fácil de entender.


## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
