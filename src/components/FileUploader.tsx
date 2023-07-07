import React from 'react'
import { FileType } from '../pages/main'

export type FileUploaderProps = {
    caseName: string
    onUploadFiles: (files: FileType[]) => void
}

function FileUploader({
    caseName,
    onUploadFiles,
}: FileUploaderProps): JSX.Element {
    const getBase64 = (file: any) => {
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onerror = (error) => reject(error)
            reader.readAsDataURL(file)
        }).then((result) => {
            console.log(result)
            return result
        })
    }

    const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        const fileListAsArray = Array.from(files as FileList)
        const newFiles: FileType[] = fileListAsArray.map((file) => {
            const base64 = getBase64(file)
            return {
                name: file.name,
                id: `${caseName}- ${file.name}`,
                base64,
                type: file.type,
            }
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
