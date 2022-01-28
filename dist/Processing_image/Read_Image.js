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
const path_1 = __importDefault(require("path"));
const Image_check_1 = __importDefault(require("./Image_check"));
const image_resize_1 = __importDefault(require("./image_resize"));
const fs_1 = require("fs");
class FileImage {
    constructor() {
        this.images = path_1.default.resolve(__dirname, '../../utilities/images');
        this.image_thumb = path_1.default.resolve(__dirname, '../../utilities/ThumbPath');
    }
    getImage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!url) {
                return null;
            }
            // here i check the access that image file
            const check = new Image_check_1.default();
            if (url.height && url.width) {
                // path.resolve(this.image_thumb,`${url.filename}${url.width}${url.height}-Thumb.jpg`)
                const Path_exists = yield check.checkFile(path_1.default.resolve(this.image_thumb, `${url.filename}${url.width}${url.height}-Thumb.jpg`));
                if (Path_exists) {
                    return Path_exists;
                }
            }
            else {
                // path.resolve(this.images, `${url.filename}.jpg`)
                const Path_exists = yield check.checkFile(path_1.default.resolve(this.images, `${url.filename}.jpg`));
                if (Path_exists) {
                    return Path_exists;
                }
            }
            return null;
        });
    }
    createThumbFolder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(path_1.default.resolve(__dirname, '../../utilities/ThumbPath'));
            }
            catch (_a) {
                yield fs_1.promises.mkdir(path_1.default.resolve(__dirname, '../../utilities/ThumbPath'));
            }
        });
    }
    Save_Thumb_image(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const distination = path_1.default.resolve(__dirname, '../../utilities/ThumbPath/' +
                `${url.filename}${url.width}${url.height}-Thumb.jpg`);
            const source = path_1.default.resolve(this.images, `${url.filename}.jpg`);
            const width = url.width;
            const heigth = url.height;
            const process = new image_resize_1.default();
            const result = yield process.image_resize(source, distination, width, heigth);
            return result;
        });
    }
    cashed_image(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const cashed = path_1.default.resolve(this.image_thumb, `${url.filename}${url.width}${url.height}-Thumb.jpg`);
            const check = new Image_check_1.default();
            const Path_exists = yield check.checkFile(path_1.default.resolve(this.image_thumb, `${url.filename}${url.width}${url.height}-Thumb.jpg`));
            if (Path_exists) {
                return Path_exists;
            }
            return null;
        });
    }
}
exports.default = FileImage;
