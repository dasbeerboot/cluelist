import React, { useState } from 'react'
import { FileType } from '../pages/main'

export type DownloadAsTxtProps = {
    caseName: string
    category: string
    files: any[]
}

function DownloadAsTxt({
    caseName,
    category,
    files,
}: DownloadAsTxtProps): JSX.Element {
    function saveTextAsFile() {
        const element = document.createElement('a')
        let str = ''
        files.forEach((file) => {
            str += `${category} 제 ${file.idx}호증 ${
                file.hyphen ? file.hyphen : ''
            } ${file.name.split('.')[0]}\n`
        })
        const file = new Blob([str], {
            type: 'text/plain',
        })
        element.href = URL.createObjectURL(file)
        element.download = caseName ? `${caseName}.txt` : 'evidence.txt'
        document.body.appendChild(element) // Required for this to work in FireFox
        element.click()
    }

    return <button onClick={saveTextAsFile}>Download as txt</button>
}

export default DownloadAsTxt
