import React, { useState } from 'react'
import './EvidenceItem.scss'
import { FileType } from '../pages/main'
import Base64Modal from './Base64Modal'

export type EvidenceItemProps = {
    caseName: string
    file: FileType
}

function EvidenceItem({ caseName, file }: EvidenceItemProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div className="evidence-item-container">
            <div onClick={() => setIsModalOpen(true)}>{file.name}</div>
            <Base64Modal
                type={file.type}
                base64={file.base64}
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
            />
        </div>
    )
}

export default EvidenceItem
