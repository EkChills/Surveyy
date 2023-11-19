import Image from 'next/image';
import React from 'react'

export default function SurveySidePanel({creatorImage, surveyDescription, surveyTitle,creatorName }:{creatorImage:string; surveyTitle:string; surveyDescription:string; creatorName:string;}) {
  console.log(creatorImage);
  

  return (
    <div className=''>
      <div className='flex items-center gap-4'>
        <Image src={creatorImage} width={40} height={40} alt='creator image' className='h-[40px] w-[40px] rounded-full' />
        <span className='text-base capitalize font-semibold text-[#020202]'>{creatorName}</span>
      </div>
      <h2 className='text-4xl font-bold capitalize mt-6'>{surveyTitle}</h2>
      <p className='text-base text-[#99989B] font-medium mt-8 max-w-sm' >{surveyDescription}</p>
    </div>
  )
}
