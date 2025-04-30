import React, { useEffect, useState } from 'react';

const Toast = ({ errorMessage, duration = 3000 }: { errorMessage: string; duration?: number }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer); // clean up
    }, [duration]);

    if (!visible) return null;

    return (
        <div className="toast toast-top toast-center">
            <div className="flex items-center alert alert-error">
                <span>{errorMessage}</span>
                <button 
                    className="btn btn-sm btn-ghost"
                    onClick={() => setVisible(false)}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Toast;
