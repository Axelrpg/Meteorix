# Meteorix

Meteorix es una aplicación móvil desarrollada en React Native con TypeScript que te permite conocer el clima en diferentes zonas del mundo. Con Meteorix, podrás ver la temperatura actual, las mínimas y máximas del día, y obtener información sobre la calidad del aire durante los próximos 10 días.

## Características
- **Temperatura Actual:** Consulta la temperatura en tiempo real de cualquier ubicación.
- **Pronóstico del Día:** Ve las temperaturas mínima y máxima del día.
- **Calidad del Aire:** Obtén un pronóstico de la calidad del aire para los próximos 10 días.
- **Interfaz Moderna:** La aplicación utiliza componentes de React Native Paper para una experiencia de usuario fluida y atractiva.
- **Reproducción de Video:** Incluye videos relacionados con el clima usando React Native Video.

## Requisitos
- Node.js (versión 14 o superior)
- npm o yarn
- Clave API de WeatherAPI

## Instalación
1. **Clona este repositorio en tu máquina local:**

   ```bash
   git clone https://github.com/tu-usuario/meteorix.git
   cd meteorix

2. **Instala las dependencias necesarias:**

   ```bash   
   npm install
   # o
   yarn install

3. **Crea un archivo config.ts en la raíz del proyecto con el siguiente contenido:**

   ```bash  
   export const API_KEY = 'TU_CLAVE_API_DE_WEATHERAPI';
   Reemplaza 'TU_CLAVE_API_DE_WEATHERAPI' con la clave API que obtuviste de WeatherAPI.

4. **Ejecuta la aplicación:**

   ```bash  
   npm run start
   # o
   yarn start

## Tecnologías Utilizadas
- **React Native:** Framework principal para el desarrollo móvil.
- **TypeScript:** Lenguaje utilizado para un desarrollo más seguro y mantenible.
- **React Native Paper:** Biblioteca de componentes para la interfaz de usuario.
- **Axios:** Cliente HTTP utilizado para hacer las solicitudes a la API.
- **Async Storage:** Para el almacenamiento local de datos.
- **React Navigation (Native Stack):** Para la navegación entre pantallas.
- **React Native Video:** Para la reproducción de videos.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (**git checkout -b feature/nueva-caracteristica**).
3. Realiza los cambios necesarios y haz un commit (**git commit -m 'Añadir nueva característica'**).
4. Envía tus cambios (**git push origin feature/nueva-caracteristica**).
5. Crea un Pull Request.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](https://github.com/Axelrpg/Meteorix/blob/main/LICENSE) para más detalles.

## Autor

Desarrollado por [Axelrpg](https://github.com/Axelrpg).

¡Gracias por usar Meteorix! Si tienes alguna pregunta o problema, no dudes en abrir un issue en el repositorio.
