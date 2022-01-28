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
class Check {
    constructor() {
        this.image_path = path_1.default.resolve(__dirname, '../../utilities/images');
        this.imge_thumb = path_1.default.resolve(__dirname, '../../utilities/ThumbPath');
    }
    checkFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(path);
                return path;
            }
            catch (_a) {
                return null;
            }
        });
    }
    img_exist(img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!img.filename) {
                return false;
            }
            else {
                try {
                    const b = (yield fs_1.promises.readdir(this.image_path)).map((filename) => filename.split('.')[0]);
                    return b.includes(img.filename);
                }
                catch (_a) {
                    return false;
                }
            }
        });
    }
    // check  if that imaqge found in thumb
    is_img_thumb(img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!img.filename) {
                return false;
            }
            if (!img.height || !img.width)
                return false;
            try {
                yield fs_1.promises.access(path_1.default.resolve(this.imge_thumb, `${img.filename}${img.width}${img.height}-Thumb.jpg`));
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    check_width_height(img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Number.isNaN(parseInt(img.height || '')) ||
                parseInt(img.height || '') < 1 ||
                Number.isNaN(parseInt(img.width || '') || parseInt(img.width || '') < 1)) {
                return false;
            }
            return true;
        });
    }
    check_url(img) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.img_exist(img))) {
                return 'image not found';
            }
            if (!img.width && !img.height)
                return null;
            if (!(yield this.check_width_height(img)))
                return 'width and height may be wrong';
            return null;
        });
    }
}
exports.default = Check;
