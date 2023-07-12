import React from "react"

export default function Cube(props){
    let bgColor = `rgb(0, 255, 0)`
    if(props)
    return(
        <div style={{backgroundColor: props.isLocked && bgColor}} onClick={() => props.lock(props.cubeId)} className="cube">
            <h4>{props.number}</h4>
        </div>
    )
}