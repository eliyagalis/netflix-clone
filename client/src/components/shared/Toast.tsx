import React from 'react'

const Toast = () => {
    return (
        <div><div className="toast toast-top toast-center">
            <div className="alert alert-">
                <span>New mail arrived.</span>
            </div>
            <div className="alert alert-success">
                <span>Message sent successfully.</span>
            </div>
        </div></div>
    )
}

export default Toast