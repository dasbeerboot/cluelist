import React, { useState } from 'react'
import './CaseNameSetter.scss'

export type CaseNameSetterProps = {
    caseName: string
    isConfirmed: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onConfirmName: () => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}
function CaseNameSetter({
    caseName,
    isConfirmed,
    onChange,
    onConfirmName,
    onKeyDown,
}: CaseNameSetterProps): JSX.Element {
    return (
        <div className="case-name-container">
            <label>사건번호(사건명)</label>
            {!isConfirmed ? (
                <input
                    onChange={(event) => onChange(event)}
                    onKeyDown={(event) => onKeyDown(event)}
                    value={caseName}
                    className="case-name-input"
                />
            ) : (
                <div className="case-name-confirmed">{caseName}</div>
            )}
            <button className="confirm-btn" onClick={onConfirmName}>
                {!isConfirmed ? '확인' : '수정'}
            </button>
        </div>
    )
}

export default CaseNameSetter
