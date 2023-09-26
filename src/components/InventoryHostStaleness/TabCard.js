import { Card, Flex, FlexItem } from '@patternfly/react-core';
import React from 'react';
import BaseDropdown from './BaseDropDown';
import PropTypes from 'prop-types';
import {
  HostStalenessResetDefaultPopover,
  systemCullingItems,
  systemStalenessItems,
  systemStalenessWarningItems,
} from './constants';

const TabCard = ({
  edit,
  filter,
  setFilter,
  activeTabKey,
  newFormValues,
  setNewFormValues,
  isFormValid,
  setIsFormValid,
  defaultValues,
}) => {
  const dropdownArray = (activeTabKey) => [
    systemStalenessItems(activeTabKey),
    systemStalenessWarningItems(activeTabKey),
    systemCullingItems(activeTabKey),
  ];
  //this to be replaced by api values
  const resetToStandard = () => {
    setNewFormValues(defaultValues);
  };

  return (
    <React.Fragment>
      <Card isPlain className="pf-u-mb-lg">
        <Flex
          justifyContent={{ default: 'justifyContentSpaceBetween' }}
          alignItems={{ default: 'alignItemsCenter' }}
        >
          {dropdownArray(activeTabKey).map((item) => (
            <FlexItem key={item[0].title}>
              <BaseDropdown
                data-ouia-component-id={item[0].title}
                dropdownItems={item}
                currentItem={newFormValues[item[0].apiKey]}
                disabled={!edit}
                title={item[0].title}
                filter={filter}
                setFilter={setFilter}
                newFormValues={newFormValues}
                setNewFormValues={setNewFormValues}
                edit={edit}
                modalMessage={item[0].modalMessage}
                isFormValid={isFormValid}
                setIsFormValid={setIsFormValid}
              />
            </FlexItem>
          ))}
          {edit ? (
            <Flex>
              <FlexItem style={{ width: '200px' }}>
                <a onClick={() => resetToStandard()}>
                  Reset to default setting
                </a>
                <HostStalenessResetDefaultPopover />
              </FlexItem>
            </Flex>
          ) : (
            <div style={{ width: '200px' }}></div>
          )}
        </Flex>
      </Card>
    </React.Fragment>
  );
};

TabCard.propTypes = {
  filter: PropTypes.object,
  newFormValues: PropTypes.any,
  setNewFormValues: PropTypes.any,
  setFilter: PropTypes.any,
  activeTabKey: PropTypes.number,
  edit: PropTypes.bool,
  setEdit: PropTypes.any,
  isFormValid: PropTypes.any,
  setIsFormValid: PropTypes.any,
  defaultValues: PropTypes.object,
};
export default TabCard;