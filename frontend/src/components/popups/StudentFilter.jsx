import React, { useState } from 'react'
import Popup from 'reactjs-popup'

function StudentFilter() {
    const [f1, setF1] = useState(false)
    const [f2, setF2] = useState(false)
    return (
        <Popup trigger={<button className='filter1'>Filter</button>} modal className="set-status">
            {close => (
                <div class="set-status">
                    <div class="pop-up-heading">
                        <h2>Filter</h2>
                        <p>*you can select filter to get your desire output</p>
                    </div>
                    <div class="ss-checkbox">

                        <div class="c-h-i">
                            <label for="n2" class="ch-i">Class</label>
                            <input type="checkbox" name="f1" checked={f1} id="n2" value="Select All"
                                onClick={() => setF1(!f1)}
                            />
                            <select name="class" id="">
                                <option value="" selected>FYBCA</option>
                                <option value="">SYBCA</option>
                                <option value="">TYBCA</option>
                            </select>
                        </div>
                        <div class="c-h-i">
                            <label for="n2" class="ch-i">Faculty</label>
                            <input type="checkbox" name="f2" checked={f2} id="n2" value="Select All"
                                onClick={() => setF2(!f2)}
                            />
                            <select name="class" id="">
                                <option value="" selected>FYBCA</option>
                                <option value="">SYBCA</option>
                                <option value="">TYBCA</option>
                            </select>
                        </div>

                    </div>

                    <div class="cancel-save">
                        <button class="btn btn-border cancel-btn" onClick={close}>Close</button>
                        <button class="btn btn-filled">Apply</button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default StudentFilter