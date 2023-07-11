import React, { ChangeEvent, useEffect, useState } from 'react'
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd'
import './EvidenceList.scss'
import EvidenceItem from './EvidenceItem'
import Base64Modal from './Base64Modal'
import Select from 'react-select'

export type EvidenceListProps = {
    caseName: string
    files: any[]
    onSetItems: (items: any) => void
}

function EvidenceList({
    caseName,
    files,
    onSetItems,
}: EvidenceListProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const oneToHundreds = Array(100)
        .fill(1)
        .map((n, idx) => {
            return { label: n + idx, value: n + idx }
        })

    const onSetIdx = (val: any, id: string) => {
        const arr = files.map((file) => {
            if (file.id === id) {
                return {
                    ...file,
                    idx: val.value,
                }
            }
            return file
        })
        onSetItems(arr)
    }

    const onSetHyphen = (val: any, id: string) => {
        const arr = files.map((file) => {
            if (file.id === id) {
                return {
                    ...file,
                    hyphen: val.value,
                }
            }
            return file
        })
        onSetItems(arr)
    }
    const onDeleteItem = (id: string) => {
        const idx = files.indexOf(files.find((file) => file.id === id))
        const arr = [...files]
        arr.splice(idx, 1)
        onSetItems(arr)
    }

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return

        const sourceIdx = source.index
        const destinationIdx = destination.index

        const arr = files.map((file) => {
            if (file.orderIdx === sourceIdx) {
                return {
                    ...file,
                    orderIdx: destinationIdx,
                    idx: destinationIdx,
                }
            } else if (file.orderIdx === destinationIdx) {
                if (destinationIdx > sourceIdx) {
                    return {
                        ...file,
                        orderIdx: destinationIdx - 1,
                        idx: destinationIdx - 1,
                    }
                } else if (destinationIdx < sourceIdx) {
                    return {
                        ...file,
                        orderIdx: destinationIdx + 1,
                        idx: destinationIdx + 1,
                    }
                }
            }
            return file
        })
        arr.sort((a, b) => a.orderIdx - b.orderIdx)
        onSetItems(arr)
    }

    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true))

        return () => {
            cancelAnimationFrame(animation)
            setEnabled(false)
        }
    }, [])

    if (!enabled) {
        return null
    }

    return (
        <div className="evidence-container">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {(provided) => (
                        <div
                            className="evidence-wrapper"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {files.map((file) => {
                                return (
                                    <Draggable
                                        draggableId={file.id}
                                        index={file.orderIdx}
                                        key={file.id}
                                    >
                                        {(provided) => (
                                            <div
                                                className="item-wrapper"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="order">
                                                    제
                                                    <Select
                                                        className="idx-select"
                                                        defaultValue={
                                                            file.orderIdx
                                                        }
                                                        onChange={(val) =>
                                                            onSetIdx(
                                                                val,
                                                                file.id,
                                                            )
                                                        }
                                                        placeholder={file.idx}
                                                        options={oneToHundreds}
                                                    />
                                                    호증
                                                    <Select
                                                        className="idx-select"
                                                        defaultValue={
                                                            file.hypen
                                                        }
                                                        onChange={(val) =>
                                                            onSetHyphen(
                                                                val,
                                                                file.id,
                                                            )
                                                        }
                                                        placeholder={
                                                            file.hyphen === 0
                                                                ? ''
                                                                : file.hyphen
                                                        }
                                                        options={oneToHundreds}
                                                    />
                                                </div>
                                                <EvidenceItem
                                                    caseName={caseName}
                                                    file={file}
                                                />
                                                <Base64Modal
                                                    type={file.type}
                                                    base64={file.base64}
                                                    isOpen={isModalOpen}
                                                    closeModal={() =>
                                                        setIsModalOpen(false)
                                                    }
                                                />
                                                <button
                                                    onClick={() =>
                                                        onDeleteItem(file.id)
                                                    }
                                                >
                                                    X
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
export default EvidenceList
