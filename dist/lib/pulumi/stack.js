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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var pulumiAuto = __importStar(require("@pulumi/pulumi/x/automation"));
var core = __importStar(require("@serverless-devs/core"));
var error_1 = require("../error");
var PulumiStack = /** @class */ (function () {
    function PulumiStack(stackName, localProgramArgs, wsOpts) {
        this.stackName = stackName;
        this.wsOpts = wsOpts;
        this.localProgramArgs = localProgramArgs;
    }
    PulumiStack.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, pulumiAuto.LocalWorkspace.createOrSelectStack(this.localProgramArgs, this.wsOpts)];
                    case 1:
                        _a.stack = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PulumiStack.prototype.select = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, pulumiAuto.LocalWorkspace.selectStack(this.localProgramArgs, this.wsOpts)];
                    case 1:
                        _a.stack = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PulumiStack.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.stack) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.select()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.stack) {
                            this.logger.error("Stack: " + this.stackName + " not exist, please create it first!");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.stack.workspace.removeStack(this.stackName)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PulumiStack.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.stack) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.select()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.stack) {
                            this.logger.error("Stack: " + this.stackName + " not exist, please create it first!");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.stack.workspace.stack()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PulumiStack.prototype.setConfig = function (configName, configValue, isSecret) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.create()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.stack.setConfig(configName, { value: configValue, secret: isSecret })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PulumiStack.prototype.up = function (isDebug) {
        return __awaiter(this, void 0, void 0, function () {
            var res, refreshVm, e_1, upVm, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.create()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 14, , 16]);
                        if (!isDebug) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.stack.refresh({ onOutput: console.info })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.stack.up({ onOutput: console.info })];
                    case 4:
                        res = _a.sent();
                        return [3 /*break*/, 13];
                    case 5:
                        refreshVm = core.spinner("refreshing stack " + this.stackName + "...");
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.stack.refresh()];
                    case 7:
                        _a.sent();
                        refreshVm.succeed("refresh stack " + this.stackName + " complete.");
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _a.sent();
                        refreshVm.fail("refresh stack " + this.stackName + " error");
                        throw new Error(e_1 === null || e_1 === void 0 ? void 0 : e_1.message);
                    case 9:
                        upVm = core.spinner("updating stack " + this.stackName + "...");
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 12, , 13]);
                        return [4 /*yield*/, this.stack.up()];
                    case 11:
                        res = _a.sent();
                        upVm.succeed("stack " + this.stackName + " updated!");
                        return [3 /*break*/, 13];
                    case 12:
                        e_2 = _a.sent();
                        upVm.fail("update stack " + this.stackName + " error");
                        throw new Error(e_2 === null || e_2 === void 0 ? void 0 : e_2.message);
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_3 = _a.sent();
                        return [4 /*yield*/, error_1.processPulumiErr(e_3 === null || e_3 === void 0 ? void 0 : e_3.message, this.localProgramArgs.workDir, this.wsOpts.envVars)];
                    case 15:
                        if (_a.sent()) {
                            // retry
                            this.logger.info('error: ');
                        }
                        throw e_3;
                    case 16: 
                    // const his = await stack.history();
                    // const output = await stack.outputs();
                    return [2 /*return*/, {
                            stdout: res === null || res === void 0 ? void 0 : res.stdout,
                            stderr: res === null || res === void 0 ? void 0 : res.stderr,
                        }];
                }
            });
        });
    };
    PulumiStack.prototype.destroy = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var isDebug, target, targetDependents, res, destroyVm, e_4, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isDebug = options.isDebug, target = options.target, targetDependents = options.targetDependents;
                        this.logger.debug("destroy target: " + target + ", targetDependents is : " + targetDependents);
                        return [4 /*yield*/, this.create()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 9, , 11]);
                        if (!isDebug) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.stack.destroy({ onOutput: console.info, target: target, targetDependents: targetDependents })];
                    case 3:
                        res = _a.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        destroyVm = core.spinner('destroying stack...');
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.stack.destroy({ target: target, targetDependents: targetDependents })];
                    case 6:
                        res = _a.sent();
                        destroyVm.succeed('destroyed!');
                        return [3 /*break*/, 8];
                    case 7:
                        e_4 = _a.sent();
                        destroyVm.fail('error');
                        throw new Error(e_4 === null || e_4 === void 0 ? void 0 : e_4.message);
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_5 = _a.sent();
                        return [4 /*yield*/, error_1.processPulumiErr(e_5 === null || e_5 === void 0 ? void 0 : e_5.message, this.localProgramArgs.workDir, this.wsOpts.envVars)];
                    case 10:
                        if (!(_a.sent())) {
                            throw e_5;
                        }
                        return [3 /*break*/, 11];
                    case 11: 
                    // const his = await stack.history();
                    // const output = await stack.outputs();
                    return [2 /*return*/, {
                            stdout: res === null || res === void 0 ? void 0 : res.stdout,
                            stderr: res === null || res === void 0 ? void 0 : res.stderr,
                        }];
                }
            });
        });
    };
    __decorate([
        core.HLogger('PULUMI-ALIBABA'),
        __metadata("design:type", Object)
    ], PulumiStack.prototype, "logger", void 0);
    return PulumiStack;
}());
exports.default = PulumiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3B1bHVtaS9zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRUFBMEQ7QUFDMUQsMERBQThDO0FBQzlDLGtDQUE0QztBQUU1QztJQVFFLHFCQUFZLFNBQWlCLEVBQUUsZ0JBQTZDLEVBQUUsTUFBd0M7UUFDcEgsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0lBQzNDLENBQUM7SUFFSyw0QkFBTSxHQUFaOzs7Ozs7d0JBQ0UsS0FBQSxJQUFJLENBQUE7d0JBQVMscUJBQU0sVUFBVSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBcEcsR0FBSyxLQUFLLEdBQUcsU0FBdUYsQ0FBQzs7Ozs7S0FDdEc7SUFFSyw0QkFBTSxHQUFaOzs7Ozs7d0JBQ0UsS0FBQSxJQUFJLENBQUE7d0JBQVMscUJBQU0sVUFBVSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTVGLEdBQUssS0FBSyxHQUFHLFNBQStFLENBQUM7Ozs7O0tBQzlGO0lBRUssNEJBQU0sR0FBWjs7Ozs7NkJBQ00sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFYLHdCQUFXO3dCQUFJLHFCQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQTs7d0JBQW5CLFNBQW1CLENBQUM7Ozt3QkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ2Ys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