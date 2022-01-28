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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const Read_Image_1 = __importDefault(require("../Processing_image/Read_Image"));
describe('Test image function', () => {
    it('resize image succeeds in file', () => __awaiter(void 0, void 0, void 0, function* () {
        const file = new Read_Image_1.default();
        yield file.Save_Thumb_image({
            filename: 'encenadaport',
            width: '200',
            height: '200',
        });
        let err;
        try {
            yield fs_1.promises.access(path_1.default.resolve(file.image_thumb, 'encenadaport200200-Thumb.jpg'));
            err = 1;
        }
        catch (_a) {
            err = 0;
        }
        expect(err).toEqual(1);
    }));
});
