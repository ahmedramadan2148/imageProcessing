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
const express_1 = __importDefault(require("express"));
const Read_Image_1 = __importDefault(require("../../Processing_image/Read_Image"));
const Image_check_1 = __importDefault(require("../../Processing_image/Image_check"));
const image = express_1.default.Router();
image.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const valid = new Image_check_1.default();
    const error = yield valid.check_url(req.query);
    // console.log(error);
    if (error) {
        res.send(error);
        return;
    }
    const File = new Read_Image_1.default();
    // check the cashed image or not
    const cashed = yield File.cashed_image(req.query);
    if (cashed) {
        res.sendFile(cashed);
        return;
    }
    console.log('cashed not');
    yield File.createThumbFolder();
    console.log('create thumb folder');
    try {
        yield File.Save_Thumb_image(req.query);
        console.log('save thumb image ');
    }
    catch (_a) { }
    const url = yield File.getImage(req.query);
    console.log('get image url ');
    url ? res.sendFile(url) : res.send('please input image name');
}));
exports.default = image;
