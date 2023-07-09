import React, { useEffect, useState } from 'react'
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd'
import './EvidenceList.scss'
import EvidenceItem from './EvidenceItem'
import Base64Modal from './Base64Modal'

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
    const onDeleteItem = (id: string) => {
        const idx = files.indexOf(files.find((file) => file.id === id))
        const arr = files
        arr.splice(idx, 1)
        console.log(arr)
        onSetItems(arr)
        console.log(files)
    }
    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return

        const sourceIdx = source.index
        const destinationIdx = destination.index

        files.map((file) => {
            if (file.orderIdx === sourceIdx) {
                file.orderIdx = destinationIdx
            } else if (file.orderIdx === destinationIdx) {
                if (destinationIdx > sourceIdx) {
                    file.orderIdx = destinationIdx - 1
                } else if (destinationIdx < sourceIdx) {
                    file.orderIdx = destinationIdx + 1
                }
            }
        })
        files.sort((a, b) => a.orderIdx - b.orderIdx)
        onSetItems(files)
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
                            {files.map((file, index) => {
                                return (
                                    <Draggable
                                        draggableId={file.id}
                                        index={index}
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
                                                    제 {index + 1}
                                                    호증
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
