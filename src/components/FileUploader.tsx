import React, { useState } from 'react'
import { FileType } from '../pages/main'

export type FileUploaderProps = {
    caseName: string
    onUploadFiles: (files: any[]) => void
}

function FileUploader({
    caseName,
    onUploadFiles,
}: FileUploaderProps): JSX.Element {
    const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        const fileListAsArray = Array.from(files as FileList)
        const newFiles: any[] = fileListAsArray.map(async (file) => {
            const data = await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
                reader.readAsDataURL(file)
            }).then((result) => {
                return {
                    name: file.name,
                    id: `${caseName}-${file.name}`,
                    base64: result,
                    type: file.type,
                }
            })
            return data
        })
        onUploadFiles(newFiles)
    }

    return (
        <input
            type="file"
            id="imageFile"
            name="imageFile"
            multiple={true}
            onChange={handleUploadFiles}
        />
    )
}

export default FileUploader
