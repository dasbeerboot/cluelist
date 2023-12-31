import React, { useEffect, useState } from 'react'
import './index.scss'
import CaseNameSetter from '../../components/CaseNameSetter'
import CaseCategory from '../../components/CaseCategory'
import FileUploader from '../../components/FileUploader'
import EvidenceList from '../../components/EvidenceList'
import DownloadAsTxt from '../../components/DownloadAsTxt'

function MainPage(): JSX.Element {
    const [caseName, setCaseName] = useState<string>('')
    const [caseCategory, setCaseCategory] = useState<string>('갑')
    const [files, setFiles] = useState<any[]>()
    const [dragItems, setDragItems] = useState<any[]>(files)
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

    const handleUploadFiles = async (files: any) => {
        await Promise.all(files).then((result) => {
            setFiles(result)
        })
    }

    const handleSetItems = (items: any) => {
        setFiles(items)
    }

    useEffect(() => {
        setDragItems(files)
    }, [files])

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
                <div className="rnw-container">
                    <FileUploader
                        caseName={caseName}
                        onUploadFiles={handleUploadFiles}
                    />
                    <DownloadAsTxt
                        caseName={caseName}
                        files={files}
                        category={caseCategory}
                    />
                </div>
                <div className="evidence-container">
                    <CaseCategory
                        caseCategory={caseCategory}
                        onChange={handleCategoryChange}
                    />
                    {files && (
                        <EvidenceList
                            caseName={caseName}
                            files={files}
                            onSetItems={handleSetItems}
                        />
                    )}
                </div>
            </article>
        </section>
    )
}

export type FileType = {
    name: string
    id: string
    base64: any
    type: string
    idx: number | string
    hyphen: number | string
}
export default MainPage
