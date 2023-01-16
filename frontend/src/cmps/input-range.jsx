import { useState , useEffect, useRef } from "react"

export function RangeInput({ min, max, getChange, name, step }) {
    const [val, setVal] = useState(min)

    function handleChange({ target }) {
        setVal(target.value)
        getChange(target.value)
    }
    return <div className="range-input">
        <input type='range' id={name} name={name} onChange={handleChange} min={min} max={max} step={step} value={val} />
        <span className="range-val">{val}</span>
        </div>
}