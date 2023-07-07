import React from 'react'
import './Base64Modal.scss'
import { ClickAwayListener, Dialog } from '@material-ui/core'

export interface Base64ModalProps {
    type: string
    base64: string
    isOpen: boolean
    closeModal: () => void
}

function Base64Modal({
    type,
    base64,
    isOpen,
    closeModal,
}: Base64ModalProps): JSX.Element {
    return (
        <Dialog open={isOpen} maxWidth="lg">
            <ClickAwayListener onClickAway={closeModal}>
                <div className="container">
                    {type === 'application/pdf' ? (
                        <embed src={base64} />
                    ) : (
                        <img src={base64} />
                    )}
                </div>
            </ClickAwayListener>
        </Dialog>
    )
}

export default Base64Modal
