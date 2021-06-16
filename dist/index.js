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
var stdout_formatter_1 = __importDefault(require("./lib/stdout-formatter"));
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
        this.logger.debug("Reminder pulumi: PULUMI_CONFIG_PASSPHRASE is " + this.pulumiConfigPassphrase);
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
                        try {
                            core.reportComponent(componentName, {
                                command: command,
                                uid: uid,
                            });
                        }
                        catch (e) {
                            this.logger.warn("Component " + componentName + " report error: " + e.message);
                        }
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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, credentials, region, args, stackName, projectName, cloudPlatform, pulumiStack, parsedArgs, nonOptionsArgs, subCmd, _e, curStack;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _d = _f.sent(), credentials = _d.credentials, region = _d.region, args = _d.args, stackName = _d.stackName, projectName = _d.projectName, cloudPlatform = _d.cloudPlatform, pulumiStack = _d.pulumiStack;
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
                        if (!!(_f.sent())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loginPulumi(undefined, true)];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4: return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 5:
                        _f.sent();
                        _e = subCmd;
                        switch (_e) {
                            case 'init': return [3 /*break*/, 6];
                            case 'rm': return [3 /*break*/, 13];
                            case 'ls': return [3 /*break*/, 16];
                        }
                        return [3 /*break*/, 19];
                    case 6: return [4 /*yield*/, this.report('pulumi', 'stack init', credentials.AccountID)];
                    case 7:
                        _f.sent();
                        this.logger.info((_b = stdout_formatter_1.default.stdoutFormatter) === null || _b === void 0 ? void 0 : _b.create('pulumi stack', stackName + " of project " + projectName));
                        this.logger.debug('Initializing stack...');
                        return [4 /*yield*/, pulumiStack.create()];
                    case 8:
                        _f.sent();
                        this.logger.debug("Stack " + stackName + " of project " + projectName + " initialized.");
                        if (!(cloudPlatform === 'alicloud')) return [3 /*break*/, 12];
                        return [4 /*yield*/, pulumiStack.setConfig('alicloud:secretKey', credentials.AccessKeySecret, true)];
                    case 9:
                        _f.sent();
                        return [4 /*yield*/, pulumiStack.setConfig('alicloud:accessKey', credentials.AccessKeyID, true)];
                    case 10:
                        _f.sent();
                        return [4 /*yield*/, pulumiStack.setConfig('alicloud:region', region, false)];
                    case 11:
                        _f.sent();
                        _f.label = 12;
                    case 12: return [3 /*break*/, 20];
                    case 13: return [4 /*yield*/, this.report('pulumi', 'stack rm', credentials.AccountID)];
                    case 14:
                        _f.sent();
                        this.logger.info((_c = stdout_formatter_1.default.stdoutFormatter) === null || _c === void 0 ? void 0 : _c.remove('pulumi stack', stackName + " of project " + projectName));
                        this.logger.debug('Removing stack...');
                        return [4 /*yield*/, pulumiStack.remove()];
                    case 15:
                        _f.sent();
                        this.logger.debug("Stack " + stackName + " of project " + projectName + " removed.");
                        return [3 /*break*/, 20];
                    case 16: return [4 /*yield*/, this.report('pulumi', 'stack ls', credentials.AccountID)];
                    case 17:
                        _f.sent();
                        return [4 /*yield*/, pulumiStack.list()];
                    case 18:
                        curStack = _f.sent();
                        if (curStack) {
                            this.logger.info("Summary of stack " + stackName + " is: ");
                            this.logger.log(util.inspect(curStack, true, null, true), 'green');
                        }
                        else {
                            this.logger.info("Summary of stack " + stackName + " is undefined.");
                        }
                        return [3 /*break*/, 20];
                    case 19:
                        {
                            this.logger.info("Sorry, stack " + subCmd + " is not supported for pulumi component");
                        }
                        _f.label = 20;
                    case 20: return [2 /*return*/];
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
                        importVm.fail("\nimport " + argsArr[1] + ": " + argsArr[3] + " error");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQUEwRDtBQUMxRCx5Q0FBNkI7QUFDN0IscUNBQXlCO0FBQ3pCLDRDQUFnQztBQUNoQyxrRUFBMkM7QUFDM0MsNkNBQWlDO0FBQ2pDLDBEQUE4QztBQUM5Qyx5Q0FBNkI7QUFDN0IsK0NBQWdFO0FBQ2hFLHdDQUE0QjtBQUM1QixrREFBNEI7QUFFNUIsNkRBQTZDO0FBQzdDLDRFQUFxRDtBQUU3QyxJQUFBLFlBQVksR0FBSyxPQUFPLENBQUMsaUNBQWlDLENBQUMsYUFBL0MsQ0FBZ0Q7QUFFcEUsSUFBTSxPQUFPLEdBQUc7SUFDZCxNQUFNLEVBQUUsYUFBYTtJQUNyQixPQUFPLEVBQUUsR0FBRztJQUNaLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLENBQUM7Q0FDL0MsQ0FBQztBQUVGLElBQU0seUJBQXlCLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQyxJQUFNLGlCQUFpQixHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0QsSUFBTSx3QkFBd0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3JGLElBQU0sa0JBQWtCLEdBQUcsU0FBUyxDQUFDO0FBRXJDO0lBRUU7UUFDRSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLHdCQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFFLG9CQUFvQjtZQUNw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