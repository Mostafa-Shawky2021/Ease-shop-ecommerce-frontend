import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import FirstImage from '@assets/images/categories/laptop.png';
import SecondImage from '@assets/images/categories/1.jpg';

import style from './productview.module.scss'

const ProductView = ({ image, imagesThumbnails, imageAlt }) => {

    const [selectedImage, setSelectedImage] = useState({ index: 0, imageUrl: '' });
    const imagePresentationRef = useRef(null)
    const thumbnailsImagesWrapperRef = useRef(null)

    useEffect(() => {
        setSelectedImage({ index: 0, imageUrl: image })
    }, [image])

    const handleImageView = (event) => {

        if (event.target.nodeName === "IMG") {
            const imageSrc = event.target.src
            const imageIndex = event.target.getAttribute('data-image-index');
            console.log(imagesThumbnails[imageIndex].url);
            setSelectedImage({ index: imageIndex, imageUrl: imagesThumbnails[imageIndex].url })
        }
    }

    return (
        <div className={style.productViewWrapper}>
            <div className={style.presentationImage}>
                <Image
                    fill
                    style={{ paddingLeft: '15px', paddingRight: '15px' }}
                    src={selectedImage?.imageUrl || FirstImage}
                    alt={imageAlt || ''}
                    ref={imagePresentationRef}
                />
            </div>
            <div
                className={`${style.thumbnailsImageWrapper} d-flex`}
                ref={thumbnailsImagesWrapperRef}
                onClick={handleImageView}>

                {imagesThumbnails?.map((img, index) => (

                    <div className={`${style.imageThumbnail} ${selectedImage.index == index ? style.active : ''}`} key={img.id}>
                        <Image
                            fill
                            src={img.url}
                            alt={imageAlt || ''}
                            data-image-index={index} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ProductView
