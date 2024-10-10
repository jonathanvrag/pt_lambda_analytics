# Proyecto Django: [Backend]

Este proyecto es una aplicación web desarrollada con Django.

## Requisitos

- **Python** >= 3.8
- **Django** >= 3.2
- **Django REST Framework** >= 3.14
- **Docker** (opcional)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/jonathanvrag/pt_lambda_analytics.git
   cd pt_lambda_analytics/backend
   ```
2. Crea un entorno virtual y actívalo:

   ```bash
   git clone https://github.com/jonathanvrag/pt_lambda_analytics
   cd pt_lambda_analytics/backend
   ```
   
3. Instala las dependencias:

   ```bash
   pip install -r requirements.txt
   ```

4. Ejecuta las migraciones de la base de datos(Opcional):

   ```bash
   python manage.py migrate
   ```

5. Correr las pruebas(Opcional):

   ```bash
   python manage.py test
   ```

6. Crear super usuario para interactuar con la API(Opcional):

   ```bash
   python manage.py createsuperuser
   ```


7. Inicia el servidor de desarrollo:

   ```bash
   python manage.py runserver
   ```
   
La API estará disponible en `http://127.0.0.1:8000`.

### Acceder a la documentación de la API 

- Swagger UI: `http://127.0.0.1:8000/swagger/`
- ReDoc: `http://127.0.0.1:8000/redoc/`

## Despliegue con Docker

1. Crear la imagen de Docker

```bash
docker build -t app_backend_image .
```

2. Correr el contenedor, se debe verificar que el puerto no está siendo utilizado por otro servicio:

```bash
docker run -d -p 8000:8000 --name app_backend_container app_backend_image
```

3. Verificar que el contnedor está corriendo:

```bash
docker ps
```

4. Detener contenedor:

```bash
docker stop app_backend_container
```

## Despliegue para producción

Para construir la aplicación para un entorno de producción se debe desactivar el DEBUG en el `settings.py`

```bash
# Debug desactivado para entornos de producción
DEBUG=False
```

También se deben generar los archivos estáticos para la correcta visualización de la aplicación en el navegador

```bash
python manage.py collectstatic
```

## Información Adicional

- La aplicación está desplegada en [-https://jonathanvra.pythonanywhere.com/](https://jonathanvra.pythonanywhere.com/)

- Este proyecto ha sido desarrollado por Jonathan Vera Gómez como parte de una prueba técnica para la empresa Lambda Analytics.