﻿(function () {

    'use strict';

    angular.module('seekAds')
        .service('customerService', [
            customerService
        ]);

    //For Http Calls
    function customerService() {
        this.getCustomerDetails = getCustomerDetails;
        this.getCustomerSpecialPricingRules = getCustomerSpecialPricingRules;

        //#region Methods
        function getCustomerDetails(id) {
            //Predefined Customer Info stored in server
            var customerJsonList = [
                {
                    Id: 1,
                    Name: 'Normal Customer',
                },
                {
                    Id: 2,
                    Name: 'Unilever',
                },
                {
                    Id: 3,
                    Name: 'Apple',
                },
                {
                    Id: 4,
                    Name: 'Nike',
                },
                {
                    Id: 5,
                    Name: 'Ford',
                },
            ];

            var foundCustomerDetails = _.find(customerJsonList, function (item, index) {
                return item.Id == id;
            });

            return foundCustomerDetails;
        }

        function getCustomerSpecialPricingRules(id) {
            //Predefined Customer Special Pricing Rules stored in server
            var customerSpecialPricingRulesJsonList = [
                {
                    Id: 1,
                    CustomerId: 2,
                    AdsId: 1,
                    PricingRuleTypeId: 1,//Rule A
                    TargetQuantity: 3,
                    PromotedQuantity: 2,
                    PromotedPrice: 0.0,
                },
                {
                    Id: 2,
                    CustomerId: 3,
                    AdsId: 2,
                    PricingRuleTypeId: 2,//Rule B
                    TargetQuantity: 0,
                    PromotedQuantity: 0,
                    PromotedPrice: 299.99,
                },
                {
                    Id: 3,
                    CustomerId: 4,
                    AdsId: 3,
                    PricingRuleTypeId: 3,//Rule C
                    TargetQuantity: 4,
                    PromotedQuantity: 0,
                    PromotedPrice: 379.99,
                },
                {
                    Id: 1,
                    CustomerId: 5,
                    AdsId: 1,
                    PricingRuleTypeId: 1,//Rule A
                    TargetQuantity: 5,
                    PromotedQuantity: 4,
                    PromotedPrice: 0.0,
                },
                {
                    Id: 1,
                    CustomerId: 5,
                    AdsId: 2,
                    PricingRuleTypeId: 2,//Rule B
                    TargetQuantity: 0,
                    PromotedQuantity: 0,
                    PromotedPrice: 309.99,
                },
                {
                    Id: 1,
                    CustomerId: 5,
                    AdsId: 3,
                    PricingRuleTypeId: 3,//Rule C
                    TargetQuantity: 3,
                    PromotedQuantity: 0,
                    PromotedPrice: 389.99,
                },
            ];

            var foundCustomerSpecialPricingRulesJsonList = _.filter(customerSpecialPricingRulesJsonList, function (item, index) {
                return item.CustomerId == id;
            });

            return foundCustomerSpecialPricingRulesJsonList;
        }

        //#endregion
    }

})();
