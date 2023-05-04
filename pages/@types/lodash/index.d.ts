// En la carpeta @types voy a crear cada uno de los archivos y carpetas correspondientes a las librerías no tipadas.
// Existen dos alternativas:
// 1) Traer los types de algún paquete que ya los tenga
// 2) Hacerlo manualmente:

declare module "lodash" {
    // para definir, en este caso, a random(), podría acudir a la documentación de lodash y averiguar como funciona
    export function random(lower: number, upper: number): number
    // random recibe dos parámetros que son números, y retorna un número
}

// El 90% de las veces no va a ser necesario hacer esto ya que la mayoría de las librerías admiten typescript, y en caso de que no, existe un repositorio llamado Definitely Typed que es mantenido por la comunidad en donde agregan los tipos para las librerías que no los tienen
// De hecho, lodash ya esta comprendida en este repositorio:
// npm install @types/lodash
