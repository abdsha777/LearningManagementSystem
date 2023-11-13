import React, { useState } from 'react'
import './Mypopup.css'

function Popup({ handler, children }) {
    const [hidden,setHidden] = useState(true);
    function hide(){
        setHidden(true);
    }
    function show(){
        setHidden(false);
    }
    function handlePopupClick(e) {
        // Stop the propagation of the click event if it occurs inside the popupBody
        e.stopPropagation();
        if (!e.target.closest('.popupBody')) {
            hide();
        }
      }
    
    return (
        <>  
            <div onClick={show}>
                {handler}
            </div>
            <div className={`popupWrapper ${hidden?"":"active"}`} onClick={handlePopupClick}>
                <div className='popupBody' >
                    {children({hide})}
                </div>
            </div>
        </>
    )
}

export default Popup