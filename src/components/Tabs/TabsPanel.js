import React from 'react';
import PropTypes from 'prop-types';

function TabsPanel({ tabs, activeTab, handleActiveTab }) {
  const width = `${(tabs.length / 4) * 100}%`;

  return (
    <div className='tab-panel-container'>
      {tabs.map((tab, idx) => {
        const key = idx;
        return (
          <div key={key} style={{ width }}>
            <div
              className='tab-text'
              key={key}
              role='button'
              tabIndex={0}
              color={activeTab[key] ? '#30be76' : '#606060'}
              onClick={() => handleActiveTab(key)}
              onKeyUp={() => handleActiveTab(key)}>
              {tab}
            </div>
            <div className='tab-highlighter' active={activeTab[key]} />
          </div>
        );
      })}
    </div>
  );
}

TabsPanel.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.arrayOf(PropTypes.bool).isRequired,
  handleActiveTab: PropTypes.func.isRequired,
};

export default TabsPanel;
