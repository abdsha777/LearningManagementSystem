import React, { useState } from 'react'
import './MyPopup.css'

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
            <div onClick={show} style={{display:'inline-block'}} className="popUpBtnFix">
                {handler}
            </div>
            <div className={`popupWrapper ${hidden?"":"active"}`} onClick={handlePopupClick}>
                <div className="popupmiddle">
                    <div className='popupBody' >
                        {children({hide})}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup