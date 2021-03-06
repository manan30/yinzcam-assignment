import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useActiveTabManager from '../../hooks/useActiveTabManager';
import './tabs.css';
import TabsPanel from './TabsPanel';

function Tabs({ tabs }) {
  const { activeTab, handleActiveTab } = useActiveTabManager(tabs.length);
  const [tabPanelText] = useState(tabs.map((t) => t.tag));
  const [tabContent] = useState(tabs.map((t) => t.component));

  return (
    <>
      <TabsPanel
        tabs={tabPanelText}
        activeTab={activeTab}
        handleActiveTab={handleActiveTab}
      />
      {activeTab.map(
        (tab, i) =>
          tab === true && (
            <div key={tab} className='tab-content'>
              {tabContent[i]}
            </div>
          )
      )}
    </>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({ tag: PropTypes.string, component: PropTypes.element })
  ).isRequired,
};

export default Tabs;
