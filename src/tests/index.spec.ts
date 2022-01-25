import supertest from "supertest";
import app from '../index';
// import import {promises as fs } from "fs";
import  request   from "supertest";


describe('Test Image Api',()=>{
    describe("Endpoint : /api",()=>{
        it("Get /api ",async ()=>{
            const res :supertest.Response = await request(app).get('/api');
            expect(res.status).toBe(200)
        })
    })
    describe("Endpoint: /api/images",()=>{
        it("Get /api/images",async()=>{
            const res :supertest.Response =await request(app).get("/api/images?filename=fjord");
            expect(res.status).toBe(200)
        })
        it("Get /api/images?filename=encenadaport&width:200&height=200",async()=>{
            const res:supertest.Response =await request(app).get('/api/images?filename=encenadaport&width=200&height=200')
            expect(res.status).toBe(200)
        })
    })

    describe("Endpoint : (any value)",()=>{
        it("Error 404",async()=>{
            const res:supertest.Response =await request(app).get('/any');
            expect(res.status).toBe(404)
        })
    })
})

