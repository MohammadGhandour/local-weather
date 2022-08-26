import { motion } from 'framer-motion';
import React, { useRef } from 'react';

function BaseModal({ children, setModalOpen }) {

    const backdropRef = useRef(null);

    const closeModal = (e) => {
        if (backdropRef.current === e.target) {
            setModalOpen(false);
        }
    }

    return (
        <motion.div className='absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center'
            onClick={(e) => closeModal(e)} ref={backdropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <div className='p-4 bg-white self-start mt-32 max-w-screen-md text-black'>
                {children}
                <button
                    className='text-white mt-8 bg-weather-primary py-2 px-6 rounded
                    hover:bg-weather-teritiary hover:text-weather-primary transition-all'
                    onClick={() => setModalOpen(false)}>
                    Close
                </button>
            </div>
        </motion.div>
    )
}

export default BaseModal;
