"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
// import import {promises as fs } from "fs";
const supertest_1 = __importDefault(require("supertest"));
describe('Test Image Api', () => {
    describe('Endpoint : /api', () => {
        it('Get /api ', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default).get('/api');
            expect(res.status).toBe(200);
        }));
    });
    describe('Endpoint: /api/images', () => {
        it('Get /api/images', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default).get('/api/images?filename=fjord');
            expect(res.status).toBe(200);
        }));
        it('Get /api/images?filename=encenadaport&width:200&height=200', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default).get('/api/images?filename=encenadaport&width=200&height=200');
            expect(res.status).toBe(200);
        }));
    });
    describe('Endpoint : (any value)', () => {
        it('Error 404', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(index_1.default).get('/any');
            expect(res.status).toBe(404);
        }));
    });
});
