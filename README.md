### 📘 README

#### 🚀 Cómo levantar el proyecto y correr pruebas unitarias

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/haflorez29/multiplica-frontend-test.git
   cd multiplica-frontend-test
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Levanta el entorno de desarrollo**

   ```bash
   npm run dev
   ```

4. **Corre las pruebas unitarias**

   ```bash
   npm run test
   ```

   * Para ver resultados en tiempo real:

     ```bash
     npm run test:watch
     ```

#### 💡 ¿Qué es lo que más te gustó de tu desarrollo?

Disfruté mucho trabajar con Next y React server components y Zustand. Me gustó que lógre modularizar los componentes y agregar los test

#### ⏳ Si hubieras tenido más tiempo, ¿qué hubieras mejorado o qué más hubieras hecho?

* Agregaría paginación de personajes desde la API.
* Revisaria temas de accesibilidad.

#### 🐞 Pain point o bug que encontraste y cómo lo solucionaste

Tuve algunos inconvenientes al momento de instalar las dependencias necesarias para ejecutar los tests. Sin embargo, revisando la documentación oficial, logré identificar y solucionar lo que me hacía falta.
También encontré un problema al implementar la lógica de favoritos: al intentar seleccionar uno, se estaban enviando todos los personajes en lugar de uno solo, lo que impedía que se mostrara correctamente el personaje deseado. Después de depurar el flujo y revisar la función de selección, ajusté el llamado para asegurarme de enviar únicamente el personaje seleccionado.
