// podría hacer lo siguiente para utilizar las props:
// export const RandomFox = (props: { image: string }): JSX.Element => {
//    return <img src={props.image}/>
// }

//
// sin embargo a medida que haya más propiedades se vuelve inmantenible, por lo que defino un type de Props:

// type Props = { image: string, alt: string }

// export const RandomFox = ({ image, alt }: Props): JSX.Element => { // aclaro que esta función debe devolver un elemento JSX
//     return <img src={image} alt={alt} width={250} className="rounded"/>
// }

//
// pero tambien puedo aplicar composicion de componentes para simplemente definir el contenido de RandomFox en su componente padre y que éste componente simplemente retorne su props.children

import { useRef, useEffect, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

type LazyImageProps = {
    src: string,
    onClick: () => void,
    onLazyLoad?: (node: HTMLImageElement | null) => void
}
type ImageNative = ImgHTMLAttributes<HTMLImageElement> 
type Props = LazyImageProps & ImageNative

export const LazyImage = ({src, onLazyLoad, ...imgProps}: Props): JSX.Element => { // debo aclarar que children es un elemento JSX
    
    const [ currentSrc, setCurrentSrc ] = useState<string>("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")

    const node = useRef<HTMLImageElement>(null) // si no paso ningun argumento a useRef() JavaScript va a interpretar el argumento como undefined, pero los tipos de useRef esperan una imagen o null, por lo que debo inicializar el useRef en null.

    useEffect(() => {
    // nuevo observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) { // si entry.isIntersecting es true, el elemento esta dentro de la pantalla
            console.log('dentro')
            setCurrentSrc(src)
            
            // compruebo que onLazyLoad exista, ya que es opcional
            if (onLazyLoad !== undefined) {
                onLazyLoad(node.current)
                observer.unobserve(node.current!)
                return
            }
        }
        })
    })

    // observar node
    if (node.current) {
        observer.observe(node.current)
    }

    // desconectar 
    return () => { // función de limpieza
        observer.disconnect()
    }
    }, [src])

    return (
        <div
            className="m-4 shadow-lg bg-gradient-to-t from-green-600 to-green-500"
        >  
            <img
                ref={node}
                src={currentSrc}
                {...imgProps}
            />
        </div>
    )
}