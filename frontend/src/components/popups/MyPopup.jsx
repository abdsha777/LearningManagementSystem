import React, { useState } from 'react'

function Popup({ handler, children }) {
    const [hidden,setHidden] = useState(true);
    function hide(){
        setHidden(true);
    }
    function show(){
        setHidden(false);
    }
    return (
        <>  
            <div onClick={show}>
                {handler}
            </div>
            <div className={`popupWrapper ${hidden?"":"active"}`} onClick={hide}>
                <div className='popupBody'>
                    {children({hide})}
                </div>
            </div>
        </>
    )
}

export default Popup