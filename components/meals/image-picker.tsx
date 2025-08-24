'use client';

import React, {ChangeEvent, useRef, useState} from 'react';

import classes from './image-picker.module.css';
import Image from 'next/image';

type Prop = {
    label: string;
    name: string;
}

const ImagePicker = ({label, name}: Prop) => {
    const [pickedImage, setPickedImage] = useState<string|undefined>(undefined);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handlePickClick = () => {
        imageInputRef.current?.click();
    }

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setPickedImage(undefined);
            return;

        }

        const file = event.target.files[0];

        if (!file) {
            setPickedImage(undefined);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.result) {
                setPickedImage(fileReader.result as string);
            }

        };

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>

                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt='Preview' fill/>}
                </div>

                <input className={classes.input} type="file" id={name} accept="image/png, image/jpeg" name={name} ref={imageInputRef} onChange={handleImageChange} required/>
                <button className={classes.button} type="button" onClick={handlePickClick}>Pick an image</button>
            </div>
        </div>
    );
};

export default ImagePicker;