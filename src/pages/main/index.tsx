import React, { useState } from 'react'
import './index.scss'
import CaseNameSetter from '../../components/CaseNameSetter'

function MainPage(): JSX.Element {
    const [caseName, setCaseName] = useState<string>('')
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <section className="main-container">
            <article className="main-content">
                <CaseNameSetter
                    caseName={caseName}
                    isConfirmed={isConfirmed}
                    onChange={handleChange}
                    onConfirmName={handleConfirmName}
                    onKeyDown={handleKeyDown}
                />
            </article>
        </section>
    )
}

export interface IIsHover {
    greet: boolean
    iam: boolean
    name: boolean
}

export default MainPage
