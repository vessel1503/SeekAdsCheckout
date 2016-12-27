(function () {

    'use strict';

    angular.module('seekAds')
        .service('adsService', [
            adsService
        ]);

    //For Http Calls
    function adsService() {
        this.getAllAdsWithPricingList = getAllAdsWithPricingList;
        this.getAllSpecialPricingRuleTypeList = getAllSpecialPricingRuleTypeList;
       
        //#region Methods
        function getAllAdsWithPricingList() {
            //Predefined Ads info stored in server
            var adsWithPricingJsonList = [
                {
                    Id: 1,
                    Code: 'classic',
                    Name: 'Classic Ad',
                    Price: 269.99,
                },
                {
                    Id: 2,
                    Code: 'standout',
                    Name: 'Standout Ad',
                    Price: 322.99,
                },
                {
                    Id: 3,
                    Code: 'premium',
                    Name: 'Premium Ad',
                    Price: 394.99,
                },
            ];

            return adsWithPricingJsonList;
        }
        
        function getAllSpecialPricingRuleTypeList() {
            //Predefined Ads info stored in server
            var specialPricingRuleTypeJsonList = [
                {
                    Id: 1,
                    Name: 'Pricing Rule A',
                    Description: 'Buy certain number of ads for certain number price deal.',//for example, 3 for 2
                },
                {
                    Id: 2,
                    Name: 'Pricing Rule B',
                    Description: 'Buy ads at certain price deal.',
                },
                {
                    Id: 3,
                    Name: 'Pricing Rule C',
                    Description: 'Buy over certain number of ads, price drop deal.',
                },
            ];

            return specialPricingRuleTypeJsonList;
        }
        //#endregion
    }

})();
