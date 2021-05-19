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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pulumiAuto = __importStar(require("@pulumi/pulumi/x/automation"));
var path = __importStar(require("path"));
var os = __importStar(require("os"));
var fse = __importStar(require("fs-extra"));
var command_exists_1 = __importDefault(require("command-exists"));
var shell = __importStar(require("shelljs"));
var core = __importStar(require("@serverless-devs/core"));
var util = __importStar(require("util"));
var npm_pkg_1 = require("./lib/utils/npm-pkg");
var _ = __importStar(require("lodash"));
var semver_1 = __importDefault(require("semver"));
var stack_1 = __importDefault(require("./lib/pulumi/stack"));
var runPulumiCmd = require('@pulumi/pulumi/x/automation/cmd').runPulumiCmd;
var DEFAULT = {
    region: 'cn-hangzhou',
    workDir: '.',
    runtime: 'nodejs',
    pulumiHome: path.join(os.homedir(), '.pulumi'),
};
var SUPPORTED_CLOUD_PLATFORMS = ['alicloud'];
var SUPPORTED_RUNTIME = ['nodejs', 'go', 'python', 'dotnet'];
var PULUMI_INSTALL_FILE_PATH = path.join(__dirname, 'lib/utils/pulumi/install.js');
var MIN_PULUMI_VERSION = 'v2.21.0';
var PulumiComponent = /** @class */ (function () {
    function PulumiComponent() {
        if (fse.pathExistsSync(DEFAULT.pulumiHome) && command_exists_1.default.sync('pulumi')) {
            // pulumi cli exists
            this.pulumiDir = path.dirname(DEFAULT.pulumiHome);
            this.pulumiHome = DEFAULT.pulumiHome;
            this.pulumiAlreadyExists = true;
        }
        else {
            this.pulumiDir = os.homedir();
            this.pulumiHome = path.join(this.pulumiDir, '.pulumi');
            this.pulumiBin = path.join(this.pulumiHome, 'bin');
            this.pulumiPath = path.join(this.pulumiBin, 'pulumi');
            if (!fse.pathExistsSync(this.pulumiPath)) {
                shell.exec("node " + PULUMI_INSTALL_FILE_PATH);
            }
            this.pulumiAlreadyExists = false;
        }
        this.pulumiConfigPassphrase = 'password';
        this.logger.debug("PULUMI_CONFIG_PASSPHRASE is " + this.pulumiConfigPassphrase);
        if (!this.pulumiAlreadyExists) {
            process.env.PATH = process.env.PATH + ":" + this.pulumiBin;
        }
        this.pulumiEnvs = Object.assign({}, process.env, {
            PULUMI_CONFIG_PASSPHRASE: this.pulumiConfigPassphrase,
            PULUMI_SKIP_UPDATE_CHECK: 1,
            PULUMI_ENABLE_LEGACY_PLUGIN_SEARCH: 1,
            PULUMI_SKIP_CONFIRMATIONS: 1,
            PULUMI_HOME: this.pulumiHome,
        });
    }
    PulumiComponent.prototype.report = function (componentName, command, accountID, access) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, credentials;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = accountID;
                        if (!_.isEmpty(accountID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _a.sent();
                        uid = credentials.AccountID;
                        _a.label = 2;
                    case 2:
                        core.reportComponent(componentName, {
                            command: command,
                            uid: uid,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PulumiComponent.prototype.checkPulumiVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curPulumiVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, runPulumiCmd(['version'], process.cwd(), this.pulumiEnvs)];
                    case 1:
                        curPulumiVersion = (_a.sent()).stdout;
                        if (semver_1.default.lt(curPulumiVersion, MIN_PULUMI_VERSION)) {
                            throw new Error("Your pulumi version: " + curPulumiVersion + " is less than " + MIN_PULUMI_VERSION + ", please update it. More info refer to https://www.pulumi.com/docs/get-started/install/");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 解析入参
    PulumiComponent.prototype.handlerInputs = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var prop, access, args, credentials, workDir, runtime, region, cloudPlatform, stackName, projectName, wsOpts, localProgramArgs, pulumiStack;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        prop = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        access = (_a = inputs === null || inputs === void 0 ? void 0 : inputs.project) === null || _a === void 0 ? void 0 : _a.access;
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args;
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _b.sent();
                        workDir = (prop === null || prop === void 0 ? void 0 : prop.workDir) || DEFAULT.workDir;
                        runtime = (prop === null || prop === void 0 ? void 0 : prop.runtime) || DEFAULT.runtime;
                        region = (prop === null || prop === void 0 ? void 0 : prop.region) || DEFAULT.region;
                        cloudPlatform = prop === null || prop === void 0 ? void 0 : prop.cloudPlatform;
                        stackName = prop === null || prop === void 0 ? void 0 : prop.stackName;
                        projectName = prop === null || prop === void 0 ? void 0 : prop.projectName;
                        if (!cloudPlatform || (SUPPORTED_CLOUD_PLATFORMS.indexOf(cloudPlatform) < 0)) {
                            throw new Error(cloudPlatform + " not supported now, supported cloud platform includes " + SUPPORTED_CLOUD_PLATFORMS);
                        }
                        if (SUPPORTED_RUNTIME.indexOf(runtime) < 0) {
                            throw new Error("\n" + runtime + " not supported now, supported runtime includes [" + SUPPORTED_RUNTIME + "]");
                        }
                        wsOpts = {
                            workDir: workDir,
                            pulumiHome: this.pulumiHome,
                            envVars: this.pulumiEnvs,
                            projectSettings: {
                                name: projectName,
                                runtime: runtime,
                            },
                        };
                        localProgramArgs = {
                            stackName: stackName,
                            workDir: workDir,
                        };
                        pulumiStack = new stack_1.default(stackName, localProgramArgs, wsOpts);
                        return [2 /*return*/, {
                                credentials: credentials,
                                workDir: workDir,
                                runtime: runtime,
                                region: region,
                                args: args,
                                cloudPlatform: cloudPlatform,
                                stackName: stackName,
                                projectName: projectName,
                                access: access,
                                pulumiStack: pulumiStack,
                            }];
                }
            });
        });
    };
    PulumiComponent.prototype.loginPulumi = function (url, isLocal, isSilent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isLocal) return [3 /*break*/, 2];
                        return [4 /*yield*/, runPulumiCmd(['login', "file://" + this.pulumiDir], process.cwd(), this.pulumiEnvs, isSilent ? undefined : console.info)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, runPulumiCmd(['login', url], process.cwd(), this.pulumiEnvs, isSilent ? undefined : console.info)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PulumiComponent.prototype.login = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, args, credentials, parsedArgs, nonOptionsArgs, isSilent, isLocal, loginUrl;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _e = _f.sent(), args = _e.args, credentials = _e.credentials;
                        return [4 /*yield*/, this.report('pulumi', 'login', credentials.AccountID)];
                    case 2:
                        _f.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['s', 'silent', 'local'] });
                        this.logger.debug("parsedArgs: " + JSON.stringify(parsedArgs));
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        isSilent = ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.s) || ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.silent);
                        isLocal = (_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.local;
                        if (_.isEmpty(nonOptionsArgs) && !isLocal) {
                            this.logger.error('error: expects argument.');
                            // help info
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error("error: unexpected argument: " + nonOptionsArgs[1]);
                            // help info
                            return [2 /*return*/];
                        }
                        loginUrl = nonOptionsArgs[0];
                        return [4 /*yield*/, this.loginPulumi(loginUrl, isLocal, isSilent)];
                    case 3:
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PulumiComponent.prototype.getStack = function (stackName, workDir, projectName, runtime) {
        return __awaiter(this, void 0, void 0, function () {
            var LocalProgramArgs, wsOpts, stack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LocalProgramArgs = {
                            stackName: stackName,
                            workDir: workDir,
                        };
                        wsOpts = {
                            workDir: workDir,
                            pulumiHome: this.pulumiHome,
                            envVars: this.pulumiEnvs,
                        };
                        if (projectName && runtime) {
                            wsOpts.projectSettings = {
                                name: projectName,
                                runtime: runtime,
                            };
                        }
                        return [4 /*yield*/, pulumiAuto.LocalWorkspace.selectStack(LocalProgramArgs, wsOpts)];
                    case 1:
                        stack = _a.sent();
                        return [2 /*return*/, stack];
                }
            });
        });
    };
    PulumiComponent.prototype.stack = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, credentials, region, args, stackName, projectName, cloudPlatform, pulumiStack, parsedArgs, nonOptionsArgs, subCmd, _c, curStack;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _b = _d.sent(), credentials = _b.credentials, region = _b.region, args = _b.args, stackName = _b.stackName, projectName = _b.projectName, cloudPlatform = _b.cloudPlatform, pulumiStack = _b.pulumiStack;
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['s', 'silent'] });
                        this.logger.debug("parsedArgs: " + JSON.stringify(parsedArgs));
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        if (_.isEmpty(nonOptionsArgs)) {
                            this.logger.error(' error: expects argument.');
                            // help info
                            return [2 /*return*/];
                        }
                        if (nonOptionsArgs.length > 1) {
                            this.logger.error(" error: unexpected argument: " + nonOptionsArgs[1]);
                            // help info
                            return [2 /*return*/];
                        }
                        subCmd = nonOptionsArgs[0];
                        return [4 /*yield*/, fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))];
                    case 2:
                        if (!!(_d.sent())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loginPulumi(undefined, true)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _c = subCmd;
                        switch (_c) {
                            case 'init': return [3 /*break*/, 5];
                            case 'rm': return [3 /*break*/, 12];
                            case 'ls': return [3 /*break*/, 15];
                        }
                        return [3 /*break*/, 18];
                    case 5: return [4 /*yield*/, this.report('pulumi', 'stack init', credentials.AccountID)];
                    case 6:
                        _d.sent();
                        this.logger.info('Initializing stack...');
                        return [4 /*yield*/, pulumiStack.create()];
                    case 7:
                        _d.sent();
                        this.logger.info("Stack " + stackName + " of project " + projectName + " initialized.");
                        if (!(cloudPlatform === 'alicloud')) return [3 /*break*/, 11];
                        return [4 /*yield*/, pulumiStack.setConfig('alicloud:secretKey', credentials.AccessKeySecret, true)];
                    case 8:
                        _d.sent();
                        return [4 /*yield*/, pulumiStack.setConfig('alicloud:accessKey', credentials.AccessKeyID, true)];
                    case 9:
                        _d.sent();
                        return [4 /*yield*/, pulumiStack.setConfig('alicloud:region', region, false)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 19];
                    case 12: return [4 /*yield*/, this.report('pulumi', 'stack rm', credentials.AccountID)];
                    case 13:
                        _d.sent();
                        this.logger.info('Removing stack...');
                        return [4 /*yield*/, pulumiStack.remove()];
                    case 14:
                        _d.sent();
                        this.logger.info("Stack " + stackName + " of project " + projectName + " removed.");
                        return [3 /*break*/, 19];
                    case 15: return [4 /*yield*/, this.report('pulumi', 'stack ls', credentials.AccountID)];
                    case 16:
                        _d.sent();
                        return [4 /*yield*/, pulumiStack.list()];
                    case 17:
                        curStack = _d.sent();
                        if (curStack) {
                            this.logger.info("Summary of stack " + stackName + " is: ");
                            this.logger.log(util.inspect(curStack, true, null, true), 'green');
                        }
                        else {
                            this.logger.info("Summary of stack " + stackName + " is undefined.");
                        }
                        return [3 /*break*/, 19];
                    case 18:
                        {
                            this.logger.info("Sorry, stack " + subCmd + " is not supported for pulumi component");
                        }
                        _d.label = 19;
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    PulumiComponent.prototype.up = function (inputs) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var _g, credentials, cloudPlatform, region, args, pulumiStack, parsedArgs, nonOptionsArgs, isSilent, isDebug;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.checkPulumiVersion()];
                    case 1:
                        _h.sent();
                        return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 2:
                        _g = _h.sent(), credentials = _g.credentials, cloudPlatform = _g.cloudPlatform, region = _g.region, args = _g.args, pulumiStack = _g.pulumiStack;
                        return [4 /*yield*/, this.report('pulumi', 'up', credentials.AccountID)];
                    case 3:
                        _h.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['s', 'silent', 'local'] });
                        this.logger.debug("parsedArgs: " + JSON.stringify(parsedArgs));
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        isSilent = ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.s) || ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.silent);
                        isDebug = ((_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.debug) || ((_f = (_e = process.env) === null || _e === void 0 ? void 0 : _e.temp_params) === null || _f === void 0 ? void 0 : _f.includes('--debug'));
                        if (!_.isEmpty(nonOptionsArgs)) {
                            this.logger.error("error: unexpect argument " + nonOptionsArgs);
                            // help info
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))];
                    case 4:
                        if (!!(_h.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.loginPulumi(undefined, true, isSilent)];
                    case 5:
                        _h.sent();
                        _h.label = 6;
                    case 6:
                        if (!(cloudPlatform === 'alicloud')) return [3 /*break*/, 10];
                        return [4 /*yield*/, pulumiStack.setConfig('alicloud:secretKey', credentials.AccessKeySecret, true)];
                    case 7:
                        _h.sent();
                        return [4 /*yield*/, pulumiStack.setConfig('alicloud:accessKey', credentials.AccessKeyID, true)];
                    case 8:
                        _h.sent();
                        return [4 /*yield*/, pulumiStack.setConfig('alicloud:region', region, false)];
                    case 9:
                        _h.sent();
                        _h.label = 10;
                    case 10: return [4 /*yield*/, pulumiStack.up(isDebug)];
                    case 11: return [2 /*return*/, _h.sent()];
                }
            });
        });
    };
    PulumiComponent.prototype.destroy = function (inputs) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, credentials, args, pulumiStack, parsedArgs, nonOptionsArgs, argsData, isDebug, target, targetArr, targetDependents, isSilent;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.checkPulumiVersion()];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 2:
                        _d = _e.sent(), credentials = _d.credentials, args = _d.args, pulumiStack = _d.pulumiStack;
                        return [4 /*yield*/, this.report('pulumi', 'destroy', credentials.AccountID)];
                    case 3:
                        _e.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['s', 'silent', 'local', 'target-dependents'] });
                        this.logger.debug("parsedArgs: " + JSON.stringify(parsedArgs));
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        argsData = parsedArgs.data || {};
                        isDebug = (argsData === null || argsData === void 0 ? void 0 : argsData.debug) || ((_c = (_b = process.env) === null || _b === void 0 ? void 0 : _b.temp_params) === null || _c === void 0 ? void 0 : _c.includes('--debug'));
                        if (!_.isEmpty(nonOptionsArgs)) {
                            this.logger.error("error: unexpect argument " + nonOptionsArgs);
                            // help info
                            return [2 /*return*/];
                        }
                        target = (argsData === null || argsData === void 0 ? void 0 : argsData.t) || (argsData === null || argsData === void 0 ? void 0 : argsData.target);
                        targetArr = typeof (target) === 'string' ? [target] : target;
                        targetDependents = argsData['target-dependents'];
                        isSilent = (argsData === null || argsData === void 0 ? void 0 : argsData.s) || (argsData === null || argsData === void 0 ? void 0 : argsData.silent);
                        return [4 /*yield*/, fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))];
                    case 4:
                        if (!!(_e.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.loginPulumi(undefined, true, isSilent)];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6: return [4 /*yield*/, pulumiStack.destroy({ isDebug: isDebug, target: targetArr, targetDependents: targetDependents })];
                    case 7: return [2 /*return*/, _e.sent()];
                }
            });
        });
    };
    PulumiComponent.prototype.installPlugins = function (cloudPlatform, stackName, stack) {
        return __awaiter(this, void 0, void 0, function () {
            var pkgName, version;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pkgName = "@pulumi/" + cloudPlatform;
                        version = "v" + npm_pkg_1.getLatestVersionOfPackage(pkgName);
                        this.logger.info("wating for plugin " + cloudPlatform + ":" + version + " to be installed");
                        return [4 /*yield*/, stack.workspace.installPlugin(cloudPlatform, version)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PulumiComponent.prototype.installPluginFromLocal = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var args, srcPath, pulumiPluginPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = (inputs === null || inputs === void 0 ? void 0 : inputs.Args) || (inputs === null || inputs === void 0 ? void 0 : inputs.args);
                        srcPath = path.resolve(args);
                        pulumiPluginPath = path.join(this.pulumiHome, 'plugins');
                        this.logger.debug("Install plugin from " + srcPath + " to " + pulumiPluginPath);
                        return [4 /*yield*/, fse.copy(srcPath, pulumiPluginPath, { overwrite: false, recursive: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PulumiComponent.prototype.installPluginFromUrl = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var url, version, pulumiPluginPath, pluginLockfilePath, pluginDirPath, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        url = (_a = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _a === void 0 ? void 0 : _a.url;
                        version = (_b = inputs === null || inputs === void 0 ? void 0 : inputs.props) === null || _b === void 0 ? void 0 : _b.version;
                        pulumiPluginPath = path.join(this.pulumiHome, 'plugins');
                        pluginLockfilePath = path.join(pulumiPluginPath, "resource-alicloud-" + version + ".lock");
                        pluginDirPath = path.join(pulumiPluginPath, "resource-alicloud-" + version);
                        return [4 /*yield*/, fse.pathExists(pluginLockfilePath)];
                    case 1:
                        _c = !(_d.sent());
                        if (_c) return [3 /*break*/, 3];
                        return [4 /*yield*/, fse.pathExists(pluginDirPath)];
                    case 2:
                        _c = !(_d.sent());
                        _d.label = 3;
                    case 3:
                        if (!_c) return [3 /*break*/, 5];
                        this.logger.debug("Install plugin from " + url + " to " + pulumiPluginPath);
                        return [4 /*yield*/, core.downloadRequest(url, pulumiPluginPath, { extract: true })];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PulumiComponent.prototype.import = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, credentials, args, workDir, cloudPlatform, region, isDebug, argsArr, importVm, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _c = _d.sent(), credentials = _c.credentials, args = _c.args, workDir = _c.workDir, cloudPlatform = _c.cloudPlatform, region = _c.region;
                        return [4 /*yield*/, this.report('pulumi', 'import', credentials.AccountID)];
                    case 2:
                        _d.sent();
                        isDebug = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.temp_params) === null || _b === void 0 ? void 0 : _b.includes('--debug');
                        if (!(cloudPlatform === 'alicloud')) return [3 /*break*/, 6];
                        return [4 /*yield*/, runPulumiCmd(['config', 'set', 'alicloud:secretKey', credentials.AccessKeySecret, '--secret'], workDir, this.pulumiEnvs, isDebug ? console.info : undefined)];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, runPulumiCmd(['config', 'set', 'alicloud:accessKey', credentials.AccessKeyID, '--secret'], workDir, this.pulumiEnvs, isDebug ? console.info : undefined)];
                    case 4:
                        _d.sent();
                        return [4 /*yield*/, runPulumiCmd(['config', 'set', 'alicloud:region', region], workDir, this.pulumiEnvs, isDebug ? console.info : undefined)];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        argsArr = __spreadArrays(['import'], args.trim().split(/\s+/));
                        if (!isDebug) return [3 /*break*/, 8];
                        return [4 /*yield*/, runPulumiCmd(argsArr, workDir, this.pulumiEnvs, console.info)];
                    case 7:
                        _d.sent();
                        return [3 /*break*/, 12];
                    case 8:
                        importVm = core.spinner("importing " + argsArr[1] + ": " + argsArr[3] + " into stack...");
                        _d.label = 9;
                    case 9:
                        _d.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, runPulumiCmd(argsArr, workDir, this.pulumiEnvs)];
                    case 10:
                        _d.sent();
                        importVm.succeed(argsArr[1] + ": " + argsArr[3] + " is imported!");
                        return [3 /*break*/, 12];
                    case 11:
                        e_1 = _d.sent();
                        importVm.fail("import " + argsArr[1] + ": " + argsArr[3] + " error");
                        throw new Error(e_1 === null || e_1 === void 0 ? void 0 : e_1.message);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core.HLogger('PULUMI-ALIBABA'),
        __metadata("design:type", Object)
    ], PulumiComponent.prototype, "logger", void 0);
    return PulumiComponent;
}());
exports.default = PulumiComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQUEwRDtBQUMxRCx5Q0FBNkI7QUFDN0IscUNBQXlCO0FBQ3pCLDRDQUFnQztBQUNoQyxrRUFBMkM7QUFDM0MsNkNBQWlDO0FBQ2pDLDBEQUE4QztBQUM5Qyx5Q0FBNkI7QUFDN0IsK0NBQWdFO0FBQ2hFLHdDQUE0QjtBQUM1QixrREFBNEI7QUFFNUIsNkRBQTZDO0FBRXJDLElBQUEsWUFBWSxHQUFLLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxhQUEvQyxDQUFnRDtBQUVwRSxJQUFNLE9BQU8sR0FBRztJQUNkLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLE9BQU8sRUFBRSxHQUFHO0lBQ1osT0FBTyxFQUFFLFFBQVE7SUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQztDQUMvQyxDQUFDO0FBRUYsSUFBTSx5QkFBeUIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLElBQU0saUJBQWlCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvRCxJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDZCQUE2QixDQUFDLENBQUM7QUFDckYsSUFBTSxrQkFBa0IsR0FBRyxTQUFTLENBQUM7QUFFckM7SUFFRTtRQUNFLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksd0JBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUUsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxT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