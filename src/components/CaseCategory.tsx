import React from 'react'
import Select from 'react-select'
import './CaseCategory.scss'

export type CaseCategoryProps = {
    caseCategory: string
    onChange: (val: string) => void
}

const options = [
    { value: 'gap', label: '갑' },
    { value: 'eul', label: '을' },
    { value: 'sogap', label: '소갑' },
    { value: 'soeul', label: '소을' },
    { value: 'jeung', label: '증' },
]
function CaseCategory({
    caseCategory,
    onChange,
}: CaseCategoryProps): JSX.Element {
    const selectedOption = options.find(
        (option) => option.label === caseCategory,
    )
    return (
        <div className="case-category-container">
            <Select
                className="case-category"
                defaultValue={selectedOption}
                onChange={(val) => onChange(val?.label ?? '')}
                options={options}
            />
        </div>
    )
}

export default CaseCategory
