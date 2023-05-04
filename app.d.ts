// puedo mover los types sin hacer ningún otro cambio y que la app siga funcionando ya que en tsconfig.json la linea -"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],- le indica a ts que procese todos los archivos con terminación .ts o .tsx
// Los tipos globales idealmente corresponden a entidades del contexto de la aplicación: usuario, producto, etc. Únicamente se debe considerar hacer global un type cuando se está 100% seguro de que tiene sentido en TODA la aplicación; no se debe abusar de ellos, por lo que se recomienda comenzar utilizando tipos locales y cuando se vea que uno es necesario en muchos archivos de la aplicación (tantos, que tenga más sentido hacerlo global que simplemente exportarlo), sólo en ese momento considerar hacerlo un tipo global. Generalmente tienen un nombre particular y empiezan por letra I o T
type IImageItem = {
    id: string,
    url: string
}
 