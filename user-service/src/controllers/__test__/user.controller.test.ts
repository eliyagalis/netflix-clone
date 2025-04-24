import request from "supertest";
import { app } from "../../app";

describe("Tests for user controller",() => {
    describe("Signup", () => {
        it("Should return 201 if signed up successfully", async () => {
            const response = await request(app).post("/api/users/signup").send({ 
                email:"test@test.com",
                password:"password123",
                name:"name"
            });
            expect(response.status).toBe(201);
        });
        it("Should return 400 if name isnt provided", async() => {
            const response = await request(app).post("/api/users/signup").send({
              email: "test@test.com",
              password: "password123",
            });
            expect(response.status).toBe(400);
        });
    });

    describe("Login", () => {
        it("Should return 200 if logged in succesfully", async() => {``
            await request(app).post("/api/users/signup").send({
              email: "test@test.com",
              password: "password123",
              name: "name",
            });

            const response = await request(app).post("/api/users/login").send({
              email: "test@test.com",
              password: "password123",
            });

            expect(response.status).toBe(200);
        });
        
        it("Should return 400 if try to login to user that not exists", async() => {
            const response = await request(app).post("/api/users/login").send({
              email: "test@test.com",
              password: "password123",
            });

            expect(response.status).toBe(400);
        })
    });
});