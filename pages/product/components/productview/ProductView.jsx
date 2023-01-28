import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import style from './productview.module.scss'

const ProductView = ({ image, imagesThumbnails, imageAlt }) => {

    const [selectedImage, setSelectedImage] = useState({ imageIndex: 0, imageUrl: '' });
    const imagePresentationRef = useRef(null)
    const thumbnailsImagesWrapperRef = useRef(null)


    const handleImageView = (event) => {

        if (event.target.nodeName === "IMG") {
            const imageSrc = event.target.src
            const imageIndex = event.target.getAttribute('data-image-index');
            setSelectedImage({ imageIndex: imageIndex, imageUrl: imageSrc })
        }
    }

    return (
        <div className={style.productViewWrapper}>
            <div className={style.presentationImage}>
                <Image
                    fill
                    style={{ paddingLeft: '15px', paddingRight: '15px' }}
                    src={selectedImage?.imageUrl || image || ''}
                    alt={imageAlt}
                    ref={imagePresentationRef}
                />
            </div>
            <div
                className={`${style.thumbnailsImageWrapper} d-flex`}
                ref={thumbnailsImagesWrapperRef}
                onClick={handleImageView}>
                <div className={`${style.imageThumbnail} ${selectedImage.imageIndex == 0 ? style.active : ''} `}>
                    <Image
                        fill
                        src={image || ''}
                        alt={imageAlt}
                        data-image-index={0}
                    />
                </div>
                {imagesThumbnails?.map((img, index) => {
                    const activeClass = `${selectedImage.imageIndex == (index + 1) ? style.active : ''}`;
                    return (
                        <div
                            className={`${style.imageThumbnail} ${activeClass}`}
                            key={img.id}>
                            <Image
                                fill
                                src={img.url}
                                alt={imageAlt}
                                data-image-index={index + 1} />
                        </div>)
                }


                )}
            </div>
        </div>
    )
}
export default ProductView
