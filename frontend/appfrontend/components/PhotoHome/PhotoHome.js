import Image from 'next/image';

const PhotoHome = () => {
  return (
    <div className="w-full text-black bg-amber-50 flex flex-col items-center justify-center text-2xl pt-10">
      <div className="flex justify-center mt-6 mb-6 space-x-4">
        <Image
          src="/home1.jpg"
          alt="Immagine 1"
          layout='responisve'
          width={300}
          height={200}
          className="rounded-md"
          objectFit="cover"
        />
        <Image
          src="/home2.jpg"
          alt="Immagine 2"
          layout='responisve'
          width={450}
          height={200}
          className="rounded-md"
          objectFit="cover"
        />
        <Image
          src="/home3.jpg"
          alt="Immagine 3"
          layout='responisve'
          width={300}
          height={200}
          className="rounded-md"
          objectFit="cover"
        />
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <Image
          src="/home4.jpg"
          alt="Immagine 4"
          layout='responisve'
          width={300}
          height={200}
          className="rounded-md"
          objectFit="cover"
        />
        <Image
          src="/home5.jpg"
          alt="Immagine 5"
          layout='responisve'
          width={450}
          height={200}
          className="rounded-md"
          objectFit="cover"
        />
        <Image
          src="/home6.jpg"
          alt="Immagine 6"
          layout='responisve'
          width={300}
          height={200}
          className="rounded-md"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

export default PhotoHome;