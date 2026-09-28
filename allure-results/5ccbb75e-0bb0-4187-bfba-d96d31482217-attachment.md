# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API.spec.js >> API Test
- Location: tests\API.spec.js:5:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | import{test,expect}from '@playwright/test';
  2  | 
  3  | const baseURL = 'https://restful-booker.herokuapp.com/';
  4  | 
  5  | test('API Test', async ({ request }) => {
  6  | 
  7  | const payload = {
  8  | 
  9  |     "firstname" : "Jim",
  10 |     "lastname" : "Brown",
  11 |     "totalprice" : 111,
  12 |     "depositpaid" : true,
  13 |     "bookingdates" : {
  14 |         "checkin" : "2018-01-01",
  15 |         "checkout" : "2019-01-01"
  16 |     },
  17 |     "additionalneeds" : "Breakfast"
  18 | };
  19 | 
  20 | // Send the Request
  21 | 
  22 | const response = await request.post(`${baseURL}/booking`, {data: payload})
  23 | 
  24 | console.log(response);
  25 | console.log(response.status());
  26 | 
> 27 | expect(response.status()).toBe(200);
     |                           ^ Error: expect(received).toBe(expected) // Object.is equality
  28 | 
  29 | });     
```