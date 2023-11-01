"use client"

import React, { useState } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { Camera, Loader2 } from 'lucide-react';
import { useUploadThing } from '@/lib/uploadthing';
import Image from 'next/image';
import { toast } from './ui/use-toast';


export default function UploadImageButton() {
  const [imagePath, setImagePath] = useState<string>('')
  const {startUpload, isUploading} = useUploadThing("imageUploader", {})
    const { getRootProps, getInputProps } = useDropzone({onDrop:(acceptedFile) => {
        const res = startUpload(acceptedFile).then((res) => {
          if(res) {
            console.log(res);
            setImagePath(res[0]!.url)
            toast({
              title:'image uploaded'
            })
          }
        }).catch(() => {
          toast({title:'something went wrong',
        description:"couldnt upload image"})
        })
      }});
     

  return (    
    <Button type='button' variant={'ghost'} {...getRootProps()} className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F6FB] relative">
      <input {...getInputProps()}  style={{ display: 'none' }} />
      {!imagePath && !isUploading && <Camera className="h-8 w-8 text-[#BAB8D4]" />}
      {isUploading ? <Loader2 className='animate-spin' /> : <Image width={64} height={64} alt='avatar' className='w-full h-full absolute inset-0 rounded-full object-cover' src={imagePath} />}
    </Button>
  )
}
