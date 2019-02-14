'use strict';

mimicTrading.factory('cmsSvr', ['RestSvr', (RestSvr) => {
    return {
        getCmsById: (id) => RestSvr.get(`cms/view/${id}`),
        getCmsTypes: () => ['page','menu','terms_conditions']
    };
}]);
