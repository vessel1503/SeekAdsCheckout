//Jasmine Test
// js/app/controller/adsCheckoutController.js
describe('Unit: adsCheckout', function () {

    // Define global references for injections.
    var ctrl;

    beforeEach(module('seekAds'));
    beforeEach(module('underscore'));
    beforeEach(module('dbConstant'));

    beforeEach(inject(function ($controller) {

        spyOn(foo, 'setBar');

        ctrl = $controller('adsCheckoutController', {});
    }));

    describe('adsCheckoutController', function () {
        // Test the basic functions about the controller

        it('should have the list of ads during initialize checkout', function () {
            
            ctrl.initCheckout();

            expect(ctrl.adsList).not.toBeNull();
        });

        it('should have a selected customer', function () {
            var customerIds = [
                1,//Normal
                2,//Unilever
                3,//Apple
                4,//Nike
                5,//Ford
            ];

            ctrl.selectCustomer(customerIds[0]);

            expect(ctrl.selectedCustomer).not.toBeNull();
        });

        it('should have correct pricings for normal customer', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 4,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 4,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 4,//Input
               },
            ];

            ctrl.selectCustomer(1);//Normal Customer
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(3951.88);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(0);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(3951.88);

        });

        it('should have correct pricings for Unilever Part A: 2 Classic Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 2,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 0,//Input
               },
            ];

            ctrl.selectCustomer(2);//Unilever
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(539.98);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(0);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(539.98);

        });

        it('should have correct pricings for Unilever Part B: 3 Classic Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 3,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 0,//Input
               },
            ];

            ctrl.selectCustomer(2);//Unilever
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(809.97);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(269.99);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(539.98);

        });

        it('should have correct pricings for Unilever Part C: 7 Classic Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 7,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 0,//Input
               },
            ];

            ctrl.selectCustomer(2);//Unilever
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(1889.93);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(539.98);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(1349.95);

        });

        it('should have correct pricings for Unilever Part D: 4 Classic Ads, 4 Standout Ads and 4 Premium Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 4,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 4,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 4,//Input
               },
            ];

            ctrl.selectCustomer(2);//Unilever
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(3951.88);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(269.99);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(3681.89);

        });

        it('should have correct pricings for Apple Part A: 1 Standout Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 1,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 0,//Input
               },
            ];

            ctrl.selectCustomer(3);//Apple
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(322.99);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(23.00);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(299.99);

        });

        it('should have correct pricings for Apple Part B: 4 Classic Ads, 4 Standout Ads and 4 Premium Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 4,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 4,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 4,//Input
               },
            ];

            ctrl.selectCustomer(3);//Apple
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(3951.88);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(92.00);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(3859.88);

        });

        it('should have correct pricings for Nike Part A: 3 Premium Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 3,//Input
               },
            ];

            ctrl.selectCustomer(4);//Nike
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(1184.97);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(0);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(1184.97);

        });

        it('should have correct pricings for Nike Part B: 4 Premium Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 4,//Input
               },
            ];

            ctrl.selectCustomer(4);//Nike
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(1579.96);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(60.00);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(1519.96);

        });

        it('should have correct pricings for Nike Part C: 5 Premium Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 5,//Input
               },
            ];

            ctrl.selectCustomer(4);//Nike
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(1974.95);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(75.00);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(1899.95);

        });

        it('should have correct pricings for Nike Part D: 4 Classic Ads, 4 Standout Ads and 4 Premium Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 4,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 4,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 4,//Input
               },
            ];

            ctrl.selectCustomer(4);//Nike
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(3951.88);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(60.00);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(3891.88);

        });

        it('should have correct pricings for Ford Part A: 4 Classic Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 4,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 0,//Input
               },
            ];

            ctrl.selectCustomer(5);//Ford
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(1079.96);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(0.00);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(1079.96);

        });

        it('should have correct pricings for Ford Part B: 5 Classic Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 5,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 0,//Input
               },
            ];

            ctrl.selectCustomer(5);//Ford
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(1349.95);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(269.99);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(1079.96);

        });

        it('should have correct pricings for Ford Part C: 1 Standout Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 1,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 0,//Input
               },
            ];

            ctrl.selectCustomer(5);//Ford
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(322.99);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(13.00);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(309.99);

        });

        it('should have correct pricings for Ford Part D: 2 Premium Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 2,//Input
               },
            ];

            ctrl.selectCustomer(5);//Ford
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(789.98);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(0.00);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(789.98);

        });

        it('should have correct pricings for Ford Part E: 3 Premium Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 0,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 3,//Input
               },
            ];

            ctrl.selectCustomer(5);//Ford
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(1184.97);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(15.00);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(1169.97);

        });

        it('should have correct pricings for Ford Part F: 5 Classic Ads, 5 Standout Ads and 5 Premium Ads', function () {

            ctrl.adsList = [
               {
                   Id: 1,
                   Code: 'classic',
                   Price: 269.99,
                   Quantity: 5,//Input
               },
               {
                   Id: 2,
                   Code: 'standout',
                   Price: 322.99,
                   Quantity: 5,//Input
               },
               {
                   Id: 3,
                   Code: 'premium',
                   Price: 394.99,
                   Quantity: 5,//Input
               },
            ];

            ctrl.selectCustomer(5);//Ford
            ctrl.calculatePrice();

            expect(ctrl.adsCheckout).not.toBeNull();
            expect(ctrl.adsCheckout.TotalPrice).toEqual(4939.85);
            expect(ctrl.adsCheckout.TotalDiscount).toEqual(359.99);
            expect(ctrl.adsCheckout.TotalNetPrice).toEqual(4579.86);

        });
    });
});