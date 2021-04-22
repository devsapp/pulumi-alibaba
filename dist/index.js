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
var npm_pkg_1 = require("./utils/npm-pkg");
var _ = __importStar(require("lodash"));
var semver_1 = __importDefault(require("semver"));
var runPulumiCmd = require('@pulumi/pulumi/x/automation/cmd').runPulumiCmd;
var DEFAULT = {
    region: 'cn-hangzhou',
    workDir: '.',
    runtime: 'nodejs',
    pulumiHome: path.join(os.homedir(), '.pulumi'),
};
var SUPPORTED_CLOUD_PLATFORMS = ['alicloud'];
var SUPPORTED_RUNTIME = ['nodejs', 'go', 'python', 'dotnet'];
var PULUMI_INSTALL_FILE_PATH = path.join(__dirname, 'utils/pulumi/install.js');
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
            var prop, access, args, credentials, workDir, runtime, region, cloudPlatform, stackName, projectName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        process.setMaxListeners(0);
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
    PulumiComponent.prototype.createStack = function (workDir, projectName, runtime, stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var wsOpts, localProgramArgs, stack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, pulumiAuto.LocalWorkspace.createOrSelectStack(localProgramArgs, wsOpts)];
                    case 1:
                        stack = _a.sent();
                        return [2 /*return*/, stack];
                }
            });
        });
    };
    PulumiComponent.prototype.removeStack = function (workDir, stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var stack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStack(stackName, workDir)];
                    case 1:
                        stack = _a.sent();
                        if (!stack) {
                            this.logger.error("Stack: " + stackName + " not exist, please create it first!");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, stack.workspace.removeStack(stackName)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PulumiComponent.prototype.listStack = function (workDir, stackName) {
        return __awaiter(this, void 0, void 0, function () {
            var stack, curStack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStack(stackName, workDir)];
                    case 1:
                        stack = _a.sent();
                        if (!stack) {
                            this.logger.error("Stack: " + stackName + " not exist, please create it first!");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, stack.workspace.stack()];
                    case 2:
                        curStack = _a.sent();
                        return [2 /*return*/, curStack];
                }
            });
        });
    };
    PulumiComponent.prototype.stack = function (inputs) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, credentials, workDir, runtime, region, args, stackName, projectName, cloudPlatform, parsedArgs, nonOptionsArgs, subCmd, _c, stack, curStack;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _b = _d.sent(), credentials = _b.credentials, workDir = _b.workDir, runtime = _b.runtime, region = _b.region, args = _b.args, stackName = _b.stackName, projectName = _b.projectName, cloudPlatform = _b.cloudPlatform;
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
                        this.logger.info("Initializing stack " + stackName + " of project " + projectName + "...");
                        return [4 /*yield*/, this.createStack(workDir, projectName, runtime, stackName)];
                    case 7:
                        stack = _d.sent();
                        this.logger.info("Stack " + stackName + " of project " + projectName + " created.");
                        if (!(cloudPlatform === 'alicloud')) return [3 /*break*/, 11];
                        return [4 /*yield*/, stack.setConfig('alicloud:secretKey', { value: credentials.AccessKeySecret, secret: true })];
                    case 8:
                        _d.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:accessKey', { value: credentials.AccessKeyID, secret: true })];
                    case 9:
                        _d.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:region', { value: region })];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 19];
                    case 12: return [4 /*yield*/, this.report('pulumi', 'stack rm', credentials.AccountID)];
                    case 13:
                        _d.sent();
                        this.logger.info("Removing stack " + stackName + "...");
                        return [4 /*yield*/, this.removeStack(workDir, stackName)];
                    case 14:
                        _d.sent();
                        this.logger.info("Stack " + stackName + " of project " + projectName + " removed.");
                        return [3 /*break*/, 19];
                    case 15: return [4 /*yield*/, this.report('pulumi', 'stack ls', credentials.AccountID)];
                    case 16:
                        _d.sent();
                        return [4 /*yield*/, this.listStack(workDir, stackName)];
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
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, credentials, cloudPlatform, projectName, stackName, workDir, runtime, region, args, parsedArgs, nonOptionsArgs, isSilent, isDebug, stack, res, refreshVm, e_1, upVm, e_2;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.checkPulumiVersion()];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 2:
                        _e = _f.sent(), credentials = _e.credentials, cloudPlatform = _e.cloudPlatform, projectName = _e.projectName, stackName = _e.stackName, workDir = _e.workDir, runtime = _e.runtime, region = _e.region, args = _e.args;
                        return [4 /*yield*/, this.report('pulumi', 'up', credentials.AccountID)];
                    case 3:
                        _f.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['s', 'silent', 'local'] });
                        this.logger.debug("parsedArgs: " + JSON.stringify(parsedArgs));
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        isSilent = ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.s) || ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.silent);
                        isDebug = (_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.debug;
                        if (!_.isEmpty(nonOptionsArgs)) {
                            this.logger.error("error: unexpect argument " + nonOptionsArgs);
                            // help info
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))];
                    case 4:
                        if (!!(_f.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.loginPulumi(undefined, true, isSilent)];
                    case 5:
                        _f.sent();
                        _f.label = 6;
                    case 6: return [4 /*yield*/, this.createStack(workDir, projectName, runtime, stackName)];
                    case 7:
                        stack = _f.sent();
                        if (!(cloudPlatform === 'alicloud')) return [3 /*break*/, 11];
                        return [4 /*yield*/, stack.setConfig('alicloud:secretKey', { value: credentials.AccessKeySecret, secret: true })];
                    case 8:
                        _f.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:accessKey', { value: credentials.AccessKeyID, secret: true })];
                    case 9:
                        _f.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:region', { value: region })];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11:
                        if (!isDebug) return [3 /*break*/, 14];
                        return [4 /*yield*/, stack.refresh({ onOutput: console.info })];
                    case 12:
                        _f.sent();
                        return [4 /*yield*/, stack.up({ onOutput: console.info })];
                    case 13:
                        res = _f.sent();
                        return [3 /*break*/, 22];
                    case 14:
                        refreshVm = core.spinner('refreshing stack...');
                        _f.label = 15;
                    case 15:
                        _f.trys.push([15, 17, , 18]);
                        return [4 /*yield*/, stack.refresh()];
                    case 16:
                        _f.sent();
                        refreshVm.succeed('refresh complete.');
                        return [3 /*break*/, 18];
                    case 17:
                        e_1 = _f.sent();
                        refreshVm.fail('error');
                        throw new Error(e_1 === null || e_1 === void 0 ? void 0 : e_1.message);
                    case 18:
                        upVm = core.spinner('updating stack...');
                        _f.label = 19;
                    case 19:
                        _f.trys.push([19, 21, , 22]);
                        return [4 /*yield*/, stack.up()];
                    case 20:
                        res = _f.sent();
                        upVm.succeed('updated!');
                        return [3 /*break*/, 22];
                    case 21:
                        e_2 = _f.sent();
                        upVm.fail('error');
                        throw new Error(e_2 === null || e_2 === void 0 ? void 0 : e_2.message);
                    case 22: 
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
    PulumiComponent.prototype.destroy = function (inputs) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, credentials, cloudPlatform, stackName, workDir, region, args, parsedArgs, nonOptionsArgs, isDebug, isSilent, stack, res, destroyVm, e_3;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.checkPulumiVersion()];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 2:
                        _e = _f.sent(), credentials = _e.credentials, cloudPlatform = _e.cloudPlatform, stackName = _e.stackName, workDir = _e.workDir, region = _e.region, args = _e.args;
                        return [4 /*yield*/, this.report('pulumi', 'destroy', credentials.AccountID)];
                    case 3:
                        _f.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['s', 'silent', 'local'] });
                        this.logger.debug("parsedArgs: " + JSON.stringify(parsedArgs));
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        isDebug = (_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.debug;
                        if (!_.isEmpty(nonOptionsArgs)) {
                            this.logger.error("error: unexpect argument " + nonOptionsArgs);
                            // help info
                            return [2 /*return*/];
                        }
                        isSilent = ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.s) || ((_d = parsedArgs.data) === null || _d === void 0 ? void 0 : _d.silent);
                        return [4 /*yield*/, fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))];
                    case 4:
                        if (!!(_f.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.loginPulumi(undefined, true, isSilent)];
                    case 5:
                        _f.sent();
                        _f.label = 6;
                    case 6: return [4 /*yield*/, this.getStack(stackName, workDir)];
                    case 7:
                        stack = _f.sent();
                        if (!stack) {
                            this.logger.error("Stack: " + stackName + " not exist, please create it first!");
                            return [2 /*return*/];
                        }
                        if (!(cloudPlatform === 'alicloud')) return [3 /*break*/, 11];
                        return [4 /*yield*/, stack.setConfig('alicloud:secretKey', { value: credentials.AccessKeySecret, secret: true })];
                    case 8:
                        _f.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:accessKey', { value: credentials.AccessKeyID, secret: true })];
                    case 9:
                        _f.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:region', { value: region })];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11:
                        if (!isDebug) return [3 /*break*/, 13];
                        return [4 /*yield*/, stack.destroy({ onOutput: console.info })];
                    case 12:
                        res = _f.sent();
                        return [3 /*break*/, 17];
                    case 13:
                        destroyVm = core.spinner('destroying stack...');
                        _f.label = 14;
                    case 14:
                        _f.trys.push([14, 16, , 17]);
                        return [4 /*yield*/, stack.destroy()];
                    case 15:
                        res = _f.sent();
                        destroyVm.succeed('destroyed!');
                        return [3 /*break*/, 17];
                    case 16:
                        e_3 = _f.sent();
                        destroyVm.fail('error');
                        throw new Error(e_3 === null || e_3 === void 0 ? void 0 : e_3.message);
                    case 17: 
                    // await stack.workspace.removeStack(stackName);
                    return [2 /*return*/, {
                            stdout: res === null || res === void 0 ? void 0 : res.stdout,
                            stderr: res === null || res === void 0 ? void 0 : res.stderr,
                        }];
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
        return __awaiter(this, void 0, void 0, function () {
            var _a, credentials, args;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _a = _b.sent(), credentials = _a.credentials, args = _a.args;
                        return [4 /*yield*/, this.report('pulumi', 'import', credentials.AccountID)];
                    case 2:
                        _b.sent();
                        // reuse pulumi import
                        return [4 /*yield*/, runPulumiCmd(['import', args], process.cwd(), this.pulumiEnvs, console.info)];
                    case 3:
                        // reuse pulumi import
                        _b.sent();
                        return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQTBEO0FBQzFELHlDQUE2QjtBQUM3QixxQ0FBeUI7QUFDekIsNENBQWdDO0FBQ2hDLGtFQUEyQztBQUMzQyw2Q0FBaUM7QUFDakMsMERBQThDO0FBQzlDLHlDQUE2QjtBQUM3QiwyQ0FBNEQ7QUFDNUQsd0NBQTRCO0FBQzVCLGtEQUE0QjtBQUdwQixJQUFBLFlBQVksR0FBSyxPQUFPLENBQUMsaUNBQWlDLENBQUMsYUFBL0MsQ0FBZ0Q7QUFFcEUsSUFBTSxPQUFPLEdBQUc7SUFDZCxNQUFNLEVBQUUsYUFBYTtJQUNyQixPQUFPLEVBQUUsR0FBRztJQUNaLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLENBQUM7Q0FDL0MsQ0FBQztBQUVGLElBQU0seUJBQXlCLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQyxJQUFNLGlCQUFpQixHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0QsSUFBTSx3QkFBd0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0FBQ2pGLElBQU0sa0JBQWtCLEdBQUcsU0FBUyxDQUFDO0FBRXJDO0lBRUU7UUFDRSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLHdCQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFFLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxP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