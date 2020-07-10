import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { IncorporationsLegalTab } from './details-legal-tab';
import { IncorporationsTaxesTab } from './details-taxes.tab';
// import { IncorporationsTaxTreatiesTab } from './details-tax-treaties-tab';
// import { IncorporationsCountryTab } from './details-country-tab';
import { IncorporationsDescriptionTab } from './details-description-tab';
import { IncorporationsServicesTab } from './details-services-tab';
import { WhatYouGetTab } from '../../common/what-you-get-tab';

const IncorporationsDetailsTabs = (
  ({ classes, tab = 'whatyouget', onTabChange, ...tabProps }: any) => {
    return (
      <React.Fragment>
        <Tabs value={tab} onChange={(evt, value) => onTabChange(value)} style={{ flexDirection: 'column' }}>
          <Tab id="whatYouGetButton" value="whatyouget" label="WHAT YOU GET" />
          <Tab id="descriptionButton" value="description" label="Description" />
          <Tab id="legalButton" value="legal" label="Legal" />
          <Tab id="taxesButton" value="taxes" label="Taxes" />
          {/*<Tab id="countryButton" value="country" label="Country Details" />
          <Tab id="taxTreatiesButton" value="taxTreaties" label="Tax Treaties" />*/}
          <Tab id="servicesButton" value="services" label="Services" />
        </Tabs>
        {tab === 'whatyouget' && <WhatYouGetTab id="whatyouget" {...tabProps} />}
        {tab === 'description' && (
          <IncorporationsDescriptionTab id="descriptionTab" {...tabProps} />
        )}
        {tab === 'legal' && <IncorporationsLegalTab id="legalTab" {...tabProps} />}
        {tab === 'taxes' && <IncorporationsTaxesTab id="taxesTab" {...tabProps} />}
        {/*tab === 'country' && <IncorporationsCountryTab id="countryTab" {...tabProps} />*/}
        {/*tab === 'taxTreaties' && (
          <IncorporationsTaxTreatiesTab id="taxTreatiesTab" {...tabProps} />
        )*/}
        {tab === 'services' && <IncorporationsServicesTab id="servicesTab" {...tabProps} />}
      </React.Fragment>
    );
  }
);

export { IncorporationsDetailsTabs };
