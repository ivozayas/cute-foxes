import { Inter } from 'next/font/google'
import { LazyImage } from './components/RandomFox'
import { RandomBtn } from './components/RandomBtn'
import { ImagesList } from './components/ImagesList'
import { useState } from 'react'
import { random } from 'lodash'
// import type { MouseEventHandler } from 'react' // para manejo de eventos

const inter = Inter({ subsets: ['latin'] })

export default function Home() {  
  const [images, setImages] = useState<Array<IImageItem>>([ // Array<{ id: string, url: string}>
  ]) 

  const genID = (): string => {
    return Math.random().toString(36).substring(2, 9)
  }

  const addNewFox = () => {
    const newImageItem: IImageItem = {
      id: genID(),
      url: `https://randomfox.ca/images/${random(1, 123)}.jpg`
    } // Para emplear los métodos del evento: const addNewFox: MouseEventHandler<HTMLButtonElement /* tipo de elemento html */> = () => {}
    

    setImages([
      ...images,
      newImageItem
    ])
  }

  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>

      <h1 className="text-3xl font-bold text-white font-bold px-4">
        CUTE FOXES
      </h1>

      <RandomBtn>
        <div id="random-btn-container">
          <button id="random-btn" className="bg-green-600 text-white font-bold px-4 py-2 rounded-md my-10 shadow-lg hover:bg-green-700" onClick={() => {addNewFox()}}>new fox</button>
        </div>
      </RandomBtn>

      <ImagesList>
        <div className="flex-col justify-center items-center" id="images-container">
          {images.map(({ id, url }) => (
              <LazyImage
                key={id}
                src={url}
                onClick={() => {console.log('onClick')}}
                onLazyLoad={(img) => {console.log(img?.src);
                }}
                title='random fox'
                alt="random fox"
                width={250}
                height="auto"
                className="rounded"
              />
          ))}
        </div>
      </ImagesList>
      
    </main>
  )
}
