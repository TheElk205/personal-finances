"use client"
import React from 'react'
import Dropzone from 'react-dropzone'
import axios from "axios";

export default function Upload() {

    function upload(files)
    {
        files.forEach((file) => {
            const form = new FormData();
            form.append('file-input', file);
            axios.post('api/import', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        })
    }
    return (
        <Dropzone onDrop={acceptedFiles => upload(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}