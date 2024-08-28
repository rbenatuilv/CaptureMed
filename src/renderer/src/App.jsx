import React from 'react'
import Router from './Router'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import './styles/app.css'


function App() {
  
    const currentPage = useSelector((state) => state.nav.currentPage)

    return (
        <div className="app">

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {Router(currentPage)}

                </motion.div>
            </AnimatePresence>

        </div>
    )
}

export default App

