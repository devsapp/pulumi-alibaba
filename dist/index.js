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
        this.logger.info("PULUMI_CONFIG_PASSPHRASE is " + this.pulumiConfigPassphrase);
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
                        core.reportComponent(command, {
                            command: componentName,
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
                        this.logger.debug("credentials is: " + JSON.stringify(credentials));
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
                        return [4 /*yield*/, runPulumiCmd(['login', "file://" + this.pulumiDir], process.cwd(), this.pulumiEnvs, isSilent ? undefined : console.log)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, runPulumiCmd(['login', url], process.cwd(), this.pulumiEnvs, isSilent ? undefined : console.log)];
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
                        this.logger.debug("args: " + JSON.stringify(args));
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
                        this.logger.debug("args: " + JSON.stringify(args));
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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, credentials, cloudPlatform, projectName, stackName, workDir, runtime, region, args, parsedArgs, nonOptionsArgs, isSilent, stack, refreshRes, res;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.checkPulumiVersion()];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 2:
                        _d = _e.sent(), credentials = _d.credentials, cloudPlatform = _d.cloudPlatform, projectName = _d.projectName, stackName = _d.stackName, workDir = _d.workDir, runtime = _d.runtime, region = _d.region, args = _d.args;
                        return [4 /*yield*/, this.report('pulumi', 'up', credentials.AccountID)];
                    case 3:
                        _e.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['s', 'silent', 'local'] });
                        this.logger.debug("parsedArgs: " + JSON.stringify(parsedArgs));
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        isSilent = ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.s) || ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.silent);
                        if (!_.isEmpty(nonOptionsArgs)) {
                            this.logger.error("error: unexpect argument " + nonOptionsArgs);
                            // help info
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))];
                    case 4:
                        if (!!(_e.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.loginPulumi(undefined, true, isSilent)];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6: return [4 /*yield*/, this.createStack(workDir, projectName, runtime, stackName)];
                    case 7:
                        stack = _e.sent();
                        if (!(cloudPlatform === 'alicloud')) return [3 /*break*/, 11];
                        return [4 /*yield*/, stack.setConfig('alicloud:secretKey', { value: credentials.AccessKeySecret, secret: true })];
                    case 8:
                        _e.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:accessKey', { value: credentials.AccessKeyID, secret: true })];
                    case 9:
                        _e.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:region', { value: region })];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11: return [4 /*yield*/, stack.refresh({ onOutput: isSilent ? undefined : console.log })];
                    case 12:
                        refreshRes = _e.sent();
                        this.logger.debug("refresh res: " + JSON.stringify(refreshRes));
                        return [4 /*yield*/, stack.up({ onOutput: isSilent ? undefined : console.log })];
                    case 13:
                        res = _e.sent();
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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, credentials, cloudPlatform, stackName, workDir, region, args, parsedArgs, nonOptionsArgs, isSilent, stack, res;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.checkPulumiVersion()];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 2:
                        _d = _e.sent(), credentials = _d.credentials, cloudPlatform = _d.cloudPlatform, stackName = _d.stackName, workDir = _d.workDir, region = _d.region, args = _d.args;
                        return [4 /*yield*/, this.report('pulumi', 'up', credentials.AccountID)];
                    case 3:
                        _e.sent();
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['s', 'silent', 'local'] });
                        this.logger.debug("parsedArgs: " + JSON.stringify(parsedArgs));
                        nonOptionsArgs = (_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a._;
                        if (!_.isEmpty(nonOptionsArgs)) {
                            this.logger.error("error: unexpect argument " + nonOptionsArgs);
                            // help info
                            return [2 /*return*/];
                        }
                        isSilent = ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.s) || ((_c = parsedArgs.data) === null || _c === void 0 ? void 0 : _c.silent);
                        return [4 /*yield*/, fse.pathExists(path.join(this.pulumiHome, 'credentials.json'))];
                    case 4:
                        if (!!(_e.sent())) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.loginPulumi(undefined, true, isSilent)];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6: return [4 /*yield*/, this.getStack(stackName, workDir)];
                    case 7:
                        stack = _e.sent();
                        if (!stack) {
                            this.logger.error("Stack: " + stackName + " not exist, please create it first!");
                            return [2 /*return*/];
                        }
                        if (!(cloudPlatform === 'alicloud')) return [3 /*break*/, 11];
                        return [4 /*yield*/, stack.setConfig('alicloud:secretKey', { value: credentials.AccessKeySecret, secret: true })];
                    case 8:
                        _e.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:accessKey', { value: credentials.AccessKeyID, secret: true })];
                    case 9:
                        _e.sent();
                        return [4 /*yield*/, stack.setConfig('alicloud:region', { value: region })];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11: return [4 /*yield*/, stack.destroy({ onOutput: isSilent ? undefined : console.log })];
                    case 12:
                        res = _e.sent();
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
    __decorate([
        core.HLogger('PULUMI-ALIBABA'),
        __metadata("design:type", Object)
    ], PulumiComponent.prototype, "logger", void 0);
    return PulumiComponent;
}());
exports.default = PulumiComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQTBEO0FBQzFELHlDQUE2QjtBQUM3QixxQ0FBeUI7QUFDekIsNENBQWdDO0FBQ2hDLGtFQUEyQztBQUMzQyw2Q0FBaUM7QUFDakMsMERBQThDO0FBQzlDLHlDQUE2QjtBQUM3QiwyQ0FBNEQ7QUFDNUQsd0NBQTRCO0FBQzVCLGtEQUE0QjtBQUdwQixJQUFBLFlBQVksR0FBSyxPQUFPLENBQUMsaUNBQWlDLENBQUMsYUFBL0MsQ0FBZ0Q7QUFFcEUsSUFBTSxPQUFPLEdBQUc7SUFDZCxNQUFNLEVBQUUsYUFBYTtJQUNyQixPQUFPLEVBQUUsR0FBRztJQUNaLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLENBQUM7Q0FDL0MsQ0FBQztBQUVGLElBQU0seUJBQXlCLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQyxJQUFNLGlCQUFpQixHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0QsSUFBTSx3QkFBd0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0FBQ2pGLElBQU0sa0JBQWtCLEdBQUcsU0FBUyxDQUFDO0FBRXJDO0lBRUU7UUFDRSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLHdCQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFFLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxP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