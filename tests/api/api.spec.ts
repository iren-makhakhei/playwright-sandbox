import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () => {

  test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`/users/non-existing-user`);
    expect(response.status()).toBe(404);
  });

  test('POST Request - Create New User', async ({ request }) => {
    const user = {
      name: "John Doe",
      job: "Software Engineer",
    };
    
    //create a new user
    const createResponse = await request.post(`/api/users`, { data: user });
    expect(createResponse.status()).toBe(201);
  
    const createResponseBody = JSON.parse(await createResponse.text());
    expect(createResponseBody.name).toBe(user.name);
    expect(createResponseBody.job).toBe(user.job);
    expect(createResponseBody.createdAt).toBeTruthy();
    expect(createResponseBody.id).toBeTruthy();
  });

  test('GET Request - Fetch User List', async ({ request }) => {
    const response = await request.get(`/api/users?page=2`);
    expect(response.status()).toBe(200);
  
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.page).toBe(2);
    expect(responseBody.per_page).toBe(6);
    expect(responseBody.total).toBe(12);
  });

  test('PUT Request - Update User', async ({ request }) => {
    const user = {
      name: "John Doe",
      job: "Senior Software Engineer",
    };
    
    //update a user
    const updateResponse = await request.put(`/api/users/2`, { data: user });
    expect(updateResponse.status()).toBe(200);
  
    const updateResponseBody = JSON.parse(await updateResponse.text());
    expect(updateResponseBody.name).toBe(user.name);
    expect(updateResponseBody.job).toBe(user.job);
  });

  test('DELETE Request - Delete User', async ({ request }) => {
    const response = await request.delete(`/api/users/2`);
    expect(response.status()).toBe(204);
  });

});
