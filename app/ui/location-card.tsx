import Image from "next/image";

export default function LocationCard({
  iconSrc,
  alt,
  name,
  lights,
  plugs
}: {
  iconSrc: string,
  alt: string,
  name: string,
  lights: number,
  plugs: number
}) {
  
  return (
    <article className="bg-white aspect-[6/5] rounded-xl drop-shadow-lg flex 
                          hover:drop-shadow-2xl transition-all duration-500">
      <Image 
        src={iconSrc}
        width={90}
        height={90}
        alt={alt}
        className="mt-4 ml-4 self-start"
      />
      <div className="flex flex-col gap-4 self-center mx-auto">
        <h2 className="font-medium">{name}</h2>
        {
          lights === 0 ? '' : 
            (lights === 1 ? <h3 className="font-light">{`${lights} light`}</h3> : <h3 className="font-light">{`${lights} lights`}</h3>)
        }
        {
          plugs === 0 ? ''  : 
            (plugs === 1 ? <h3 className="font-light">{`${plugs} plug`}</h3> : <h3 className="font-light">{`${plugs} plugs`}</h3>)
        }
      </div>
    </article>
  )
}