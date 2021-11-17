import React, { useEffect, useRef } from 'react'

export const IncomesBlock = () => {

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        
        if(containerRef.current){
            console.log(containerRef.current)
            containerRef.current.addEventListener('click', () => {
                containerRef.current?.scrollIntoView({behavior: "auto", block: "start", inline: "start"})
            })
        }

        return () => {
            
        }
    }, [containerRef])

    return (
        <div  className="incomes-block">
            <div className="actions-block">
                Incomes
            </div>
            <div ref={containerRef} className="actions-block">
                Incomes Details
            </div>
        </div>
    )
}
