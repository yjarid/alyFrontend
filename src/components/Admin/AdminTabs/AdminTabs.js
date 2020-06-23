import React , {useState} from 'react';
import { withRouter}  from 'react-router-dom'
import style from "./AdminTabs.module.scss"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const ProfileTabs = ({ history,  tab})=> {
  const [value, setValue] = useState(tab ? tab : "");

  const handleChange = (event, newValue) => {
    setValue(newValue); 
    history.push(`/admin/${newValue}`)
  };

  return (
    <div className={style.tabs}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        centered
      >
        <Tab label="RevBus" value="" />
        <Tab label="RevClm" value="claim"/>
        <Tab label="RevRep" value="report"/>
        <Tab label="AllBus" value="all" />
        <Tab label="Location" value="location"/>
        <Tab label="Category" value="category" />
      </Tabs>
    </div>

  );
}

export default withRouter(ProfileTabs)