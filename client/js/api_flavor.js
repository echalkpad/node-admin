function requestInterceptor(RestangularProvider) {
    // use the custom query parameters function to format the API request correctly
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation == "getList") {

            // custom pagination params
            if (params._page) {

                params['filter[skip]'] = (params._page - 1) * params._perPage;
                params['filter[limit]'] = 100;

                delete params._page;
                delete params._perPage;
            }

            // custom sort params
            if (params._sortField) {
                params['filter[order]'] = params._sortField + ' ' + params._sortDir;

                delete params._sortField;
                delete params._sortDir;
            }

            // custom filters
            if (params._filters) {
                for(var key in params._filters) {
                    params['filter[where][' + key + ']'] = params._filters[key];
                }
                delete params._filters;
            }
        }
        return { params: params};
    });
}

function responseInterceptor(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
        /*
        if (operation == "getList") {
            var contentRange = response.headers('Content-Range');
            response.totalCount = contentRange.split('/')[1];
        }
        */
        return data;
    });
}

export default { requestInterceptor, responseInterceptor }
