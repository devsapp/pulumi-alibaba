"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var commandExists = __importStar(require("command-exists"));
var fse = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var rimraf = __importStar(require("rimraf"));
var core_1 = require("@serverless-devs/core");
var os = __importStar(require("os"));
var VERSION = '2.21.2';
function install() {
    return __awaiter(this, void 0, void 0, function () {
        var tarballUrl, dest, pulumiHome, tmpDir, tmpPulumiDir, tmpPulumiBinDir, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // 判断 pulumi 是否存在
                    if (commandExists.sync('pulumi')) {
                        core_1.Logger.log('pulumi exist!', 'green');
                        return [2 /*return*/];
                    }
                    if (!(process.platform === 'win32' && process.arch === 'x64')) return [3 /*break*/, 1];
                    core_1.Logger.error('PULUMI_INSTALL_ERROR', 'Windows not supported now!Please install it manually.');
                    return [3 /*break*/, 19];
                case 1:
                    if (!((process.platform === 'darwin' || process.platform === 'linux') && process.arch === 'x64')) return [3 /*break*/, 18];
                    tarballUrl = "https://serverless-tool.oss-cn-hangzhou.aliyuncs.com/others/pulumi-alibaba-component/pulumi-v" + VERSION + "-darwin-x64.tar.gz?versionId=CAEQFRiBgMDVj_LWvxciIGY3YmZiMDMxMzNlNTQ2ZDk4M2Q2MzcyN2YzYTNiM2M5";
                    dest = path.join(__dirname, 'pulumi.tar.gz');
                    return [4 /*yield*/, fse.pathExists(dest)];
                case 2:
                    if (!_b.sent()) return [3 /*break*/, 4];
                    return [4 /*yield*/, fse.unlink(dest)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    core_1.Logger.log("Installing Pulumi v" + VERSION + " from " + tarballUrl + "...", 'yellow');
                    pulumiHome = path.join(os.homedir(), '.pulumi');
                    tmpDir = path.join(__dirname, '.pulumiTmp/');
                    return [4 /*yield*/, fse.pathExists(pulumiHome)];
                case 5:
                    if (_b.sent()) {
                        rimraf.sync(pulumiHome);
                    }
                    return [4 /*yield*/, fse.pathExists(tmpDir)];
                case 6:
                    if (_b.sent()) {
                        rimraf.sync(tmpDir);
                    }
                    return [4 /*yield*/, fse.mkdirp(pulumiHome)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, fse.mkdirp(tmpDir)];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, core_1.downloadRequest(tarballUrl, tmpDir, { extract: true })];
                case 9:
                    _b.sent();
                    tmpPulumiDir = path.join(tmpDir, 'pulumi');
                    tmpPulumiBinDir = path.join(tmpPulumiDir, 'bin');
                    return [4 /*yield*/, fse.pathExists(tmpPulumiBinDir)];
                case 10:
                    _a = (_b.sent());
                    if (!_a) return [3 /*break*/, 12];
                    return [4 /*yield*/, fse.lstat(tmpPulumiBinDir)];
                case 11:
                    _a = (_b.sent()).isDirectory();
                    _b.label = 12;
                case 12:
                    if (!_a) return [3 /*break*/, 14];
                    return [4 /*yield*/, fse.move(tmpPulumiBinDir, pulumiHome)];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 17];
                case 14: return [4 /*yield*/, fse.mkdirp(path.join(pulumiHome, 'bin'))];
                case 15:
                    _b.sent();
                    return [4 /*yield*/, fse.copy(tmpPulumiDir, path.join(pulumiHome, 'bin'))];
                case 16:
                    _b.sent();
                    _b.label = 17;
                case 17:
                    rimraf.sync(tmpDir);
                    return [3 /*break*/, 19];
                case 18:
                    core_1.Logger.error('PULUMI_INSTALL_ERROR', "We're sorry, but it looks like Pulumi is not supported on your platform! More infomation please refer to https://github.com/pulumi/pulumi");
                    _b.label = 19;
                case 19: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, install()];
            case 1:
                _a.sent();
                core_1.Logger.log('----Pulumi installed!----', 'green');
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error('Error happend while installing pulumi: ', e_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvdXRpbHMvcHVsdW1pL2luc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQWdEO0FBQ2hELDRDQUFnQztBQUNoQyx5Q0FBNkI7QUFDN0IsNkNBQWlDO0FBQ2pDLDhDQUFnRTtBQUNoRSxxQ0FBeUI7QUFFekIsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBRXpCLFNBQWUsT0FBTzs7Ozs7O29CQUNwQixpQkFBaUI7b0JBQ2pCLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDaEMsYUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ3JDLHNCQUFPO3FCQUNSO3lCQUVHLENBQUEsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUEsRUFBdEQsd0JBQXNEO29CQUN4RCxhQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLHVEQUF1RCxDQUFDLENBQUM7Ozt5QkFDckYsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUEsRUFBekYseUJBQXlGO29CQUU1RixVQUFVLEdBQUcsa0dBQWdHLE9BQU8sa0dBQStGLENBQUM7b0JBQ3BOLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDL0MscUJBQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQTs7eUJBQTFCLFNBQTBCLEVBQTFCLHdCQUEwQjtvQkFDNUIs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