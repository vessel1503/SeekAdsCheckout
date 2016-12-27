(function () {

    'use strict';

    angular.module('seekAds')
        .controller('adsCheckoutController', [
            '_', 'adsService', 'adsCheckoutService', 'customerService', 'PricingRuleTypeConstant',
            adsCheckoutController
        ]);

    function adsCheckoutController(_, adsService, adsCheckoutService, customerService, PricingRuleTypeConstant) {
        var vm = this;
        vm.adsCheckout = {};

        vm.initCheckout = initCheckout;
        vm.selectCustomer = selectCustomer;
        vm.calculatePrice = calculatePrice;

        //#region Public methods
        function initCheckout() {
            vm.adsList = adsService.getAllAdsWithPricingList();
        }

        function selectCustomer(id) {
            //Customer Info

            if (!id) {
                alert('Oops! Unexpected Error Occurred. Please do refresh the page to retry or contract our support team (support@seek.com).');
                return;
            }

            vm.selectedCustomer = customerService.getCustomerDetails(id);
            vm.selectedCustomerSpecialPricingRules = customerService.getCustomerSpecialPricingRules(id);
            clearInputsAfterSwitchCustomer();
        }

        function calculatePrice() {

            var finalPriceObj = getComputedPrices(vm.adsList, vm.selectedCustomerSpecialPricingRules);

            vm.adsCheckout = finalPriceObj;
        }

        //#endregion

        //#region Private methods

        function clearInputsAfterSwitchCustomer() {
            vm.adsCheckout = {};
            vm.adsList = adsService.getAllAdsWithPricingList();
        }

        function getComputedPrices(adsList, pricingRuleList) {
            var finalPriceObj = {
                TotalPrice: 0,
                TotalDiscount: 0,
                TotalNetPrice: 0,
            };

            //For those customers WITHOUT any special pricing rule setup
            if(!pricingRuleList || _.isEmpty(pricingRuleList)){
                _.each(adsList, function (item, index) {
                    finalPriceObj.TotalPrice += item.Price * item.Quantity;
                });
                
                finalPriceObj.TotalNetPrice = finalPriceObj.TotalPrice;

                return finalPriceObj;
            }

            //For those customers WITH special pricing rule setup           
            _.each(adsList, function (item, index) {
                finalPriceObj.TotalPrice += item.Price * item.Quantity;
                var adsItemDiscount = processAdsPriceBySpecialPricingRuleSetup(item, pricingRuleList);                
                finalPriceObj.TotalDiscount += adsItemDiscount;
            });

            finalPriceObj.TotalNetPrice = finalPriceObj.TotalPrice - finalPriceObj.TotalDiscount;

            return finalPriceObj;
        }

        function processAdsPriceBySpecialPricingRuleSetup(adsItem, pricingRuleList) {
            var discount = 0;

            var adsRelatedPricingRuleList = _.filter(pricingRuleList, function (item, index) {
                return item.AdsId == adsItem.Id;
            });

            if (_.isEmpty(adsRelatedPricingRuleList))
                return discount;

            _.each(adsRelatedPricingRuleList, function (item, index) {
                var eachPricingDiscount = 0;
                switch (item.PricingRuleTypeId) {
                    case PricingRuleTypeConstant.TYPE_A:
                        eachPricingDiscount = processAdsRuleA(adsItem, item);
                        break;
                    case PricingRuleTypeConstant.TYPE_B:
                        eachPricingDiscount = processAdsRuleB(adsItem, item);
                        break;
                    case PricingRuleTypeConstant.TYPE_C:
                        eachPricingDiscount = processAdsRuleC(adsItem, item);
                        break;
                    default:
                        console.log('Invalid Pricing Rule Setup for input: ' + item.PricingRuleTypeId);
                }

                discount += eachPricingDiscount;
            });

            return discount;
        }

        function processAdsRuleA(adsItem, pricingSetupItem) {
            var discount = 0;

            var entitledTimes = Math.floor(adsItem.Quantity / pricingSetupItem.TargetQuantity);
            var entitledQuantity = entitledTimes * (pricingSetupItem.TargetQuantity - pricingSetupItem.PromotedQuantity);
            discount = entitledQuantity * adsItem.Price;

            return discount;
        }

        function processAdsRuleB(adsItem, pricingSetupItem) {
            var discount = 0;

            var discountPricePerItem = adsItem.Price - pricingSetupItem.PromotedPrice;
            discount = adsItem.Quantity * discountPricePerItem;

            return discount;
        }

        function processAdsRuleC(adsItem, pricingSetupItem) {
            var discount = 0;

            if (adsItem.Quantity < pricingSetupItem.TargetQuantity)
                return discount;

            var discountPricePerItem = adsItem.Price - pricingSetupItem.PromotedPrice;
            discount = adsItem.Quantity * discountPricePerItem;

            return discount;
        }

        //#endregion
    }

})();
