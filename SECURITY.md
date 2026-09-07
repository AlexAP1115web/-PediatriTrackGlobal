# Política de Seguridad – PediatriTrack Global

PediatriTrack Global es una aplicación móvil de seguimiento pediátrico (proyecto académico) construida con React Native + Expo y Firebase. Tomamos en serio la seguridad y privacidad de los datos de los bebés y de sus tutores, aunque este sea un proyecto escolar.

## Medidas de seguridad implementadas

- **Autenticación**: manejo de cuentas con Firebase Authentication (correo y contraseña), con bloqueo temporal tras varios intentos fallidos de inicio de sesión seguidos.
- **Contraseñas filtradas**: al crear una cuenta, verificamos la contraseña contra la API pública de Have I Been Pwned (modelo k-anonimato: nunca se envía la contraseña real ni el hash completo) para avisar si ya apareció en una filtración de datos conocida.
- **Aislamiento de datos por usuario**: las reglas de Cloud Firestore (`firestore.rules`) y Firebase Storage (`storage.rules`) restringen la lectura, escritura y eliminación de cada documento y archivo exclusivamente al usuario autenticado dueño de esos datos (validado por `uid`). Un usuario no puede reasignar sus propios documentos a otra cuenta.
- **Validación de archivos**: Firebase Storage solo permite subir archivos PDF (`application/pdf`) de menos de 15 MB, evitando que se suban archivos arbitrarios o excesivamente grandes.
- **Colecciones cerradas por defecto**: cualquier colección o ruta no contemplada explícitamente en las reglas de seguridad queda bloqueada por defecto.
- **Correos oficiales de Firebase**: los correos de verificación y recuperación de contraseña se envían siempre en español a través del propio servicio de Firebase Authentication, nunca por un servidor de correo propio.

## Reportar una vulnerabilidad

Si detectas una vulnerabilidad de seguridad en este proyecto, por favor repórtala de forma responsable escribiendo a:

**alexpa.110215@gmail.com**

Incluye una descripción del problema y, si es posible, los pasos para reproducirlo. Responderemos en cuanto nos sea posible.

## Solicitar la eliminación de tus datos

Si usaste PediatriTrack Global y quieres solicitar la eliminación completa de tu cuenta y de todos los datos asociados (información del bebé, vacunas, vitaminas, alimentación y documentos), escríbenos a:

**alexpa.110215@gmail.com**

Indica el correo con el que te registraste en la app. Eliminaremos la información correspondiente de Firebase (Authentication, Firestore y Storage) una vez confirmada la solicitud.

## Alcance

Este proyecto es de carácter académico (Universidad Tecnológica de Puebla, Ingeniería en Desarrollo de Software Multiplataforma) y no está publicado comercialmente en tiendas de aplicaciones. Esta política aplica al código fuente y a los datos manejados por la app durante su desarrollo y pruebas.
