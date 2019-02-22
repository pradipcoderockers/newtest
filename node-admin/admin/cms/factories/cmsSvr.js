'use strict';

mimicTrading.factory('cmsSvr', ['RestSvr', (RestSvr) => {
    return {
        getCmsById: (id) => RestSvr.get(`cms/view/${id}`),
        getCmsTypes: () =>    return [{key:'about',value:'About'},{key:'staffing',value:'Services --- Staffing'},{key:'managed_services',value:'Services --- Managed Services'},{key:'resources',value:'Resources'},{key:'industries',value:'Industries'},{key:'contact',value:'Contact'}];
    };
}]);
