import React from 'react'

const Toast = ({ errorMessage }: { errorMessage: string }) => {
    return (
        <div className="toast toast-top toast-center">
            <div className={`alert alert-error`}>
                <span>{errorMessage}</span>
            </div>
        </div>
    )
}

export default Toast