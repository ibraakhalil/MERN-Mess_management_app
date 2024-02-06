import React, { useEffect, useState } from 'react'
import './css/setting.css'
import { IoMdMenu } from "react-icons/io";
import SettingSidebar from '../components/setting/SettingSidebar';
import GeneralSetting from '../components/setting/GeneralSetting';
import ThemeSetting from '../components/setting/ThemeSetting';
import FontSetting from '../components/setting/FontSetting';
import LanguageSetting from '../components/setting/LanguageSetting';


function Setting() {
  const [compIndex, setCompIndex] = useState(1)
  const [headName, setHeadName] = useState('General Setting')
  const allComponents = [<GeneralSetting />, <ThemeSetting />, <FontSetting />, <LanguageSetting />]

  const showComp = (index, name) => {
    setCompIndex(index)
    setHeadName(name)
  }
  const handleOpen = (e) => {
    document.querySelector('.setting_sidebar').classList.add('active')
  }

  return (
    <div className='container'>
      <div className='setting'>
        <SettingSidebar showComp={showComp} />
        <div className="component">
          <div className="top">
            <div onClick={handleOpen} className="open">
              <IoMdMenu />
            </div>
            <h3>{headName}</h3>
          </div>
          {allComponents[compIndex]}
        </div>
      </div>
    </div>
  )
}

export default Setting