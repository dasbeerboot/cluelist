import React, { useState } from 'react'
import './EvidenceItem.scss'
import EvidenceItem from './EvidenceItem'
import Base64Modal from './Base64Modal'

export type EvidenceListProps = {
    caseName: string
    files: any[]
}

function EvidenceList({ caseName, files }: EvidenceListProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false)
    console.log(files)
    return (
        <div>
            {files.map((file, idx) => {
                return (
                    <div className="evidence-container" key={idx}>
                        <div>제 {idx + 1}호증</div>
                        <EvidenceItem caseName={caseName} file={file} />
                        <Base64Modal
                            type={file.type}
                            base64={file.base64}
                            isOpen={isModalOpen}
                            closeModal={() => setIsModalOpen(false)}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default EvidenceList
