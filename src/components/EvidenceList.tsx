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
    items: any[]
    onSetItems: (items: any) => void
}

function EvidenceList({
    caseName,
    items,
    onSetItems,
}: EvidenceListProps): JSX.Element {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [files, setFiles] = useState<any[]>(items)
    // const oneToHundreds = Array(100).fill(0).map((key, idx) => key + idx)
    const oneToHundreds = Array(100)
        .fill(1)
        .map((n, idx) => {
            return { label: n + idx, value: n + idx }
        })

    // const [files, setFiles] = useState<any[]>(items)

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
        console.log('arr', arr)
        // console.log(files)
    }

    const onSetHyphen = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (event.target.checked) {
            // if (files[index].hyphen === 0) {
            //     files[index].hyphen = 1
            // } else {
            //     files[index].idx = files[index - 1].idx
            //     files[index - 1].hypen + 1
            // }
            const arr = files.map((file) => {
                if (file.idx === index) {
                    if (file.hyphen === 0) {
                        return { ...file, hyphen: 1 }
                    } else {
                        return {
                            ...file,
                            idx: files[index - 1].idx,
                            hyphen: files[index - 1] + 1,
                        }
                    }
                }
                return file
            })
            onSetItems(arr)
        }
    }
    const onDeleteItem = (id: string) => {
        const idx = files.indexOf(files.find((file) => file.id === id))
        const arr = files
        arr.splice(idx, 1)
        onSetItems(arr)
    }
    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return

        const sourceIdx = source.index
        const destinationIdx = destination.index

        const arr = files.map((file) => {
            if (file.orderIdx === sourceIdx) {
                // file.orderIdx = destinationIdx
                return { ...file, idx: destinationIdx }
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

    useEffect(() => {
        setFiles(items)
        console.log('items', items)
    }, [items])

    useEffect(() => {
        onSetItems(files)
        console.log('files', files)
    }, [files])

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
                                                {/* <input
                                                    type="checkbox"
                                                    onChange={(event) =>
                                                        onSetHyphen(
                                                            event,
                                                            file.idx,
                                                        )
                                                    }
                                                /> */}
                                                <div className="order">
                                                    제
                                                    <Select
                                                        className="idx-select"
                                                        defaultValue={file.idx}
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
                                                    {file.hyphen !== 0 && (
                                                        <label>
                                                            {file.hyphen}
                                                        </label>
                                                    )}
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
