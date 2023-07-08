import React, { useEffect, useState } from 'react'
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd'
import './EvidenceItem.scss'
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
    const onDragEnd = ({ draggableId, source, destination }: DropResult) => {
        if (!destination) return

        const sourceKey = source.droppableId
        // as TItemStatus;
        const destinationKey = destination.droppableId
        //  as TItemStatus;

        const _items = JSON.parse(JSON.stringify(files)) as typeof files
        const targetItem = _items[sourceKey].splice(source.index, 1)
        _items[destinationKey].splice(destination.index, 0, targetItem)
        onSetItems(_items)
    }

    // --- requestAnimationFrame 초기화
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
    // --- requestAnimationFrame 초기화 END

    return (
        <div className="flex">
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    {files.map((file, idx) => {
                        return (
                            <Droppable key={file.id} droppableId={file.id}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            className="evidence-container"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            key={file.name}
                                        >
                                            {provided.placeholder}
                                            <Draggable
                                                key={file.id}
                                                draggableId={file.id}
                                                index={idx}
                                            >
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            key={idx}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div>
                                                                제 {idx + 1}호증
                                                            </div>
                                                            <EvidenceItem
                                                                caseName={
                                                                    caseName
                                                                }
                                                                file={file}
                                                            />
                                                            <Base64Modal
                                                                type={file.type}
                                                                base64={
                                                                    file.base64
                                                                }
                                                                isOpen={
                                                                    isModalOpen
                                                                }
                                                                closeModal={() =>
                                                                    setIsModalOpen(
                                                                        false,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                }}
                                            </Draggable>
                                        </div>
                                    )
                                }}
                            </Droppable>
                        )
                    })}
                </div>
                {/* <div className="grid flex-1 select-none grid-cols-2 gap-4 rounded-lg">
                    {Object.keys(files).map((key) => (
                        <Droppable key={key} droppableId={key}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    // className={(
                                    //   'flex flex-col gap-3 rounded-xl bg-gray-200 p-4 ring-1 ring-gray-300 transition-shadow dark:bg-[#000000]',
                                    //   snapshot.isDraggingOver ? 'shadow-lg' : 'shadow',
                                    // )}
                                >
                                    <span className="text-xs font-semibold">
                                        {key.toLocaleUpperCase()}
                                    </span>
                                    {files.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    // className={(
                                                    //   'rounded-lg bg-white p-4 transition-shadow dark:bg-[#121212]',
                                                    //   snapshot.isDragging
                                                    //     ? 'bg-opacity-90 shadow-2xl shadow-gray-400'
                                                    //     : 'shadow',
                                                    // )}
                                                >
                                                    <h5 className="font-semibold">
                                                        {item.title}
                                                    </h5>
                                                    <span className="text-sm text-gray-500">
                                                        Make the world beatiful
                                                    </span>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div> */}
            </DragDropContext>
        </div>
    )
}

// import React, { useState } from 'react'
// import './EvidenceItem.scss'
// import EvidenceItem from './EvidenceItem'
// import Base64Modal from './Base64Modal'

// export type EvidenceListProps = {
//     caseName: string
//     files: any[]
// }

// function EvidenceList({ caseName, files }: EvidenceListProps): JSX.Element {
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     console.log(files)
//     return (
// ;<div>
//     {files.map((file, idx) => {
//         return (
//             <div className="evidence-container" key={idx}>
//                 <div>제 {idx + 1}호증</div>
//                 <EvidenceItem caseName={caseName} file={file} />
//                 <Base64Modal
//                     type={file.type}
//                     base64={file.base64}
//                     isOpen={isModalOpen}
//                     closeModal={() => setIsModalOpen(false)}
//                 />
//             </div>
//         )
//     })}
// </div>
//     )
// }

export default EvidenceList
