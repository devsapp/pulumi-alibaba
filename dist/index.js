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
        return __awaiter(this, void 0, void 0, function () {
            var prop, project, provider, accessAlias, args, credentials, workDir, runtime, region, cloudPlatform, stackName, projectName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        process.setMaxListeners(0);
                        prop = (inputs === null || inputs === void 0 ? void 0 : inputs.Properties) || (inputs === null || inputs === void 0 ? void 0 : inputs.properties);
                        project = (inputs === null || inputs === void 0 ? void 0 : inputs.project) || (inputs === null || inputs === void 0 ? void 0 : inputs.Project);
                        provider = (project === null || project === void 0 ? void 0 : project.Provider) || (project === null || project === void 0 ? void 0 : project.provider);
                        accessAlias = (project === null || project === void 0 ? void 0 : project.AccessAlias) || (project === null || project === void 0 ? void 0 : project.accessAlias);
                        args = (inputs === null || inputs === void 0 ? void 0 : inputs.Args) || (inputs === null || inputs === void 0 ? void 0 : inputs.args);
                        return [4 /*yield*/, core.getCredential(provider, accessAlias || '')];
                    case 1:
                        credentials = _a.sent();
                        workDir = (prop === null || prop === void 0 ? void 0 : prop.workDir) || DEFAULT.workDir;
                        runtime = (prop === null || prop === void 0 ? void 0 : prop.runtime) || DEFAULT.runtime;
                        region = (prop === null || prop === void 0 ? void 0 : prop.region) || DEFAULT.region;
                        cloudPlatform = prop === null || prop === void 0 ? void 0 : prop.cloudPlatform;
                        stackName = prop === null || prop === void 0 ? void 0 : prop.stackName;
                        projectName = prop === null || prop === void 0 ? void 0 : prop.projectName;
                        if (!cloudPlatform || (SUPPORTED_CLOUD_PLATFORMS.indexOf(cloudPlatform) < 0)) {
                            this.logger.error("\n" + cloudPlatform + " not supported now, supported cloud platform includes [" + SUPPORTED_CLOUD_PLATFORMS + "]");
                            throw new Error(cloudPlatform + " not supported now, supported cloud platform includes " + SUPPORTED_CLOUD_PLATFORMS);
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
                        return [4 /*yield*/, core.report('组件调用', {
                                type: 'component',
                                context: 'pulumi',
                                params: {
                                    action: 'login',
                                    account: credentials.AccountID,
                                },
                            })];
                    case 2:
                        _f.sent();
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
                        return [4 /*yield*/, core.report('组件调用', {
                                type: 'component',
                                context: 'pulumi',
                                params: {
                                    action: 'stack',
                                    account: credentials.AccountID,
                                },
                            })];
                    case 2:
                        _d.sent();
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
                    case 3:
                        if (!!(_d.sent())) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.loginPulumi(undefined, true)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _c = subCmd;
                        switch (_c) {
                            case 'init': return [3 /*break*/, 6];
                            case 'rm': return [3 /*break*/, 12];
                            case 'ls': return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 16];
                    case 6:
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
                    case 11: return [3 /*break*/, 17];
                    case 12:
                        this.logger.info("Removing stack " + stackName + "...");
                        return [4 /*yield*/, this.removeStack(workDir, stackName)];
                    case 13:
                        _d.sent();
                        this.logger.info("Stack " + stackName + " of project " + projectName + " removed.");
                        return [3 /*break*/, 17];
                    case 14: return [4 /*yield*/, this.listStack(workDir, stackName)];
                    case 15:
                        curStack = _d.sent();
                        if (curStack) {
                            this.logger.info("Summary of stack " + stackName + " is: ");
                            this.logger.log(util.inspect(curStack, true, null, true), 'green');
                        }
                        else {
                            this.logger.info("Summary of stack " + stackName + " is undefined.");
                        }
                        return [3 /*break*/, 17];
                    case 16:
                        {
                            this.logger.info("Sorry, stack " + subCmd + " is not supported for pulumi component");
                        }
                        _d.label = 17;
                    case 17: return [2 /*return*/];
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
                        return [4 /*yield*/, core.report('组件调用', {
                                type: 'component',
                                context: 'pulumi',
                                params: {
                                    action: 'up',
                                    account: credentials.AccountID,
                                },
                            })];
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
                        return [4 /*yield*/, core.report('组件调用', {
                                type: 'component',
                                context: 'pulumi',
                                params: {
                                    action: 'destroy',
                                    account: credentials.AccountID,
                                },
                            })];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQTBEO0FBQzFELHlDQUE2QjtBQUM3QixxQ0FBeUI7QUFDekIsNENBQWdDO0FBQ2hDLGtFQUEyQztBQUMzQyw2Q0FBaUM7QUFDakMsMERBQThDO0FBQzlDLHlDQUE2QjtBQUM3QiwyQ0FBNEQ7QUFDNUQsd0NBQTRCO0FBQzVCLGtEQUE0QjtBQUVwQixJQUFBLFlBQVksR0FBSyxPQUFPLENBQUMsaUNBQWlDLENBQUMsYUFBL0MsQ0FBZ0Q7QUFFcEUsSUFBTSxPQUFPLEdBQUc7SUFDZCxNQUFNLEVBQUUsYUFBYTtJQUNyQixPQUFPLEVBQUUsR0FBRztJQUNaLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLENBQUM7Q0FDL0MsQ0FBQztBQUVGLElBQU0seUJBQXlCLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQyxJQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFDakYsSUFBTSxrQkFBa0IsR0FBRyxTQUFTLENBQUM7QUFFckM7SUFFRTtRQUNFLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksd0JBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUUsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFB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