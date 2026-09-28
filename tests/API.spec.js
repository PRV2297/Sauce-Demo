import{test,expect}from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

test('API Test', async ({ request }) => {

const payload = {

    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
};

// Send the Request

const response = await request.post(`${baseURL}/booking`, {data: payload})

console.log(response);
console.log(response.status());

expect(response.status()).toBe(200);






});     