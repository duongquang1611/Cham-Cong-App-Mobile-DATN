import * as LoginBO from './LoginBO';
import * as UserBO from './UserBO';
// import * as PackagesProductBO from './PackagesProductBO';
// import * as CategoriesBO from './CategoriesBO';
// import * as MenuAppBO from './MenuAppBO';
// import * as ProvincialCitiesBO from './ProvincialCitiesBO';
// import * as DefinedFilterBO from './DefinedFilterBO';
// import * as AppConfigsBO from './AppConfigsBO';

const TotalBO = {
  // ...PackagesProductBO,
  // ...AppConfigsBO,
  ...LoginBO,
  ...UserBO,
  // ...MenuAppBO,
  // ...CategoriesBO,
  // ...ProvincialCitiesBO,
  // ...DefinedFilterBO,
};
export default TotalBO;
