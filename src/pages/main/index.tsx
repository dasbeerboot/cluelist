import React, { useState } from 'react'
import './index.scss'
import CaseNameSetter from '../../components/CaseNameSetter'
import CaseCategory from '../../components/CaseCategory'
import FileUploader from '../../components/FileUploader'

function MainPage(): JSX.Element {
    const [caseName, setCaseName] = useState<string>('')
    const [caseCategory, setCaseCategory] = useState<string>('갑')
    const [files, setFiles] = useState<FileType[]>()
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCaseName(event.target.value)
    }

    const handleConfirmName = () => {
        setIsConfirmed(!isConfirmed)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsConfirmed(!isConfirmed)
        }
    }

    const handleCategoryChange = (val: string) => {
        setCaseCategory(val)
    }

    const handleUploadFiles = (files: any) => {
        setFiles(files)
        console.log(
            files.map((file: any) => {
                return file.name
            }),
        )
    }

    return (
        <section className="main-container">
            <article className="main-content">
                <CaseNameSetter
                    caseName={caseName}
                    isConfirmed={isConfirmed}
                    onChange={handleNameChange}
                    onConfirmName={handleConfirmName}
                    onKeyDown={handleKeyDown}
                />
                <FileUploader
                    caseName={caseName}
                    onUploadFiles={handleUploadFiles}
                />
                <CaseCategory
                    caseCategory={caseCategory}
                    onChange={handleCategoryChange}
                />
            </article>
        </section>
    )
}

export type FileType = {
    name: string
    id: string
    base64: any
    type: string
}
export default MainPage
