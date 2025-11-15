import Image from 'next/image';

export default function BjarnePage() {
  return (
    <div>
      <Image
        src="/bjarne.jpg"
        alt="Me and Bjarne Stroustrup."
        width={600}
        height={825}
      />
    </div>
  );
}
