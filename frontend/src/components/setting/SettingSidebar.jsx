import React, { useEffect } from 'react'
import './css/settingSidebar.css'
import { AiOutlineFontColors } from "react-icons/ai";
import { IoClose, IoColorPaletteOutline, IoLanguageOutline, IoSettingsOutline } from "react-icons/io5";



function SettingSidebar({ showComp }) {
    useEffect(() => {
        const sidebar = document.querySelector('.setting_sidebar')
        const itemElems = document.querySelectorAll('.setting_sidebar .item')
        itemElems?.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                itemElems.forEach(elem => elem.classList.remove('active'))
                e.currentTarget.classList.add('active')
                sidebar?.classList.remove('active')
                showComp(i, item.querySelector('p').innerText)
            })
        })
    })

    const handleClose = (e) => {
        const sidebar = document.querySelector('.setting_sidebar')
        sidebar?.classList.remove('active')
    }


    return (
        <div className="setting_sidebar">
            <div onClick={handleClose} className="close_icon">
                <IoClose />
            </div>
            <h3>Setting</h3>
            <div className="setting_wrapper">
                <div className="item active">
                    <div className="icon">
                        <IoSettingsOutline />
                    </div>
                    <p>General Setting</p>
                </div>
                <div className="item">
                    <div className="icon">
                        <IoColorPaletteOutline />
                    </div>
                    <p>Theme Setting</p>
                </div>
                <div className="item">
                    <div className="icon">
                        <AiOutlineFontColors />
                    </div>
                    <p>Font Setting</p>
                </div>
                <div className="item">
                    <div className="icon">
                        <IoLanguageOutline />
                    </div>
                    <p>Language Setting</p>
                </div>
            </div>
        </div>
    )
}

export default SettingSidebar