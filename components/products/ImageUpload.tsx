'use client'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
export default function ImageUpload () {
  const [imgURL, setImgUrl] = useState('')
  return (
    <CldUploadWidget
      uploadPreset='yp4pcyd6'
      onSuccess={(result, { widget }) => {
        if (result.event === 'success') {
          // @ts-ignore
          setImgUrl(result.info.secure_url)
          widget.close()
        }
      }}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => (
        <>
          <div className='space-y-2'>
            <label className='text-slate-800'>Imagen Producto</label>
            <div
              className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100'
              onClick={() => open()}
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-photo-scan">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 8h.01" />
                <path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
                <path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" />
                <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
              </svg>
              <p className='text-lg font-semibold'>Agregar imagen</p>
              {imgURL && (
                <div className='absolute inset-0 w-full h-full'>
                  <Image
                    fill
                    src={imgURL}
                    style={{ objectFit: 'contain' }}
                    alt={imgURL}
                  />
                </div>
              )}
            </div>
          </div>
          <input
            type='hidden'
            name='image'
            value={imgURL}
          />
        </>
      )}
    </CldUploadWidget>
  )
}
