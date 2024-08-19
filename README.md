   # FreshCoffee

   FreshCoffee es una aplicación de frontend construida con React. Este repositorio contiene la configuración y el código necesarios para ejecutar y desarrollar la aplicación.


   ## Configuración del Entorno de Desarrollo

   Para configurar y ejecutar FreshCoffee en un entorno de desarrollo asegúrate de tener Docker instalado en tu máquina.

   ## Iniciar e instalar dependencias
   Clonar repositorio
```
git clone https://github.com/MarianoFrank/freshcoffee-frontend.git

cd freshcoffee-frontend
```

   Ejecute una terminal temporal en node con docker montando la carpeta del proyecto 
```
docker run --rm -it -v .:/app -w /app node:22-alpine sh
```

Luego instale las dependencias y sal de la terminal
 ```
npm install

exit
```


   ## Comandos Docker

   1. **Construir y Ejecutar la Aplicación**

      Utiliza el siguiente comando para construir y ejecutar los contenedores de Docker definidos en el archivo `docker-compose-dev.yml`:

      ```bash
      docker compose -f docker-compose-dev.yml up --build
      ```

      Este comando:

      - Construye las imágenes de Docker a partir del Dockerfile.
      - Levanta los contenedores definidos en el archivo `docker-compose-dev.yml`.
      - Inicia la aplicación en modo de desarrollo.

   2. **Detener y Eliminar Contenedores**

      Para detener y eliminar los contenedores en ejecución, utiliza el siguiente comando:

      ```bash
      docker compose -f docker-compose-dev.yml down
      ```

   3. **Acceder a una Terminal en el Contenedor**

      Para ejecutar una terminal interactiva en el contenedor de la aplicación, utiliza el siguiente comando:

      ```bash
      docker exec -it frontend-frontend-1 /bin/sh
      ```

      Este comando te permite acceder a una shell dentro del contenedor, donde puedes ejecutar comandos para depuración o mantenimiento.
