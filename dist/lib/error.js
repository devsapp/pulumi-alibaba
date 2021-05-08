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
exports.processPulumiErr = void 0;
var core_1 = require("@serverless-devs/core");
var path = __importStar(require("path"));
var fse = __importStar(require("fs-extra"));
var runPulumiCmd = require('@pulumi/pulumi/x/automation/cmd').runPulumiCmd;
var PENDING_ERR_INFO = 'with pending operations';
function processPendingOperationsErr(workDir, pulumiEnvs) {
    return __awaiter(this, void 0, void 0, function () {
        var stackJsonFileName, targetStackJsonFileName, absWorkDir, stackJsonFilePath, targetStackJsonFilePath, cmdRes, stackJsonContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stackJsonFileName = 'stack.json';
                    targetStackJsonFileName = 'stack_updated.json';
                    absWorkDir = path.resolve(workDir);
                    stackJsonFilePath = path.join(absWorkDir, stackJsonFileName);
                    targetStackJsonFilePath = path.join(absWorkDir, targetStackJsonFileName);
                    return [4 /*yield*/, runPulumiCmd(['stack', 'export', '--file', stackJsonFilePath], workDir, pulumiEnvs)];
                case 1:
                    cmdRes = (_a.sent()).stdout;
                    return [4 /*yield*/, fse.pathExists(stackJsonFilePath)];
                case 2:
                    if (!(_a.sent())) {
                        core_1.Logger.debug('PULUMI-ALIBABA', "pulumi stack export res: " + cmdRes);
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, fse.readJSON(stackJsonFilePath, { encoding: 'utf-8' })];
                case 3:
                    stackJsonContent = _a.sent();
                    core_1.Logger.debug('PULUMI-ALIBABA', "current stack json content: " + stackJsonContent);
                    delete stackJsonContent.deployment.pending_operations;
                    return [4 /*yield*/, fse.writeJSON(targetStackJsonFilePath, stackJsonContent)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, runPulumiCmd(['stack', 'import', '--file', targetStackJsonFilePath], workDir, pulumiEnvs)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function processPulumiErr(errMsg, workDir, pulumiEnvs) {
    return __awaiter(this, void 0, void 0, function () {
        var solveVm, isProcessed, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!errMsg.includes(PENDING_ERR_INFO)) return [3 /*break*/, 4];
                    solveVm = core_1.spinner('you have pending operations in your stack, processing it...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, processPendingOperationsErr(workDir, pulumiEnvs)];
                case 2:
                    isProcessed = _a.sent();
                    solveVm.succeed('process pending operations in your stack successfully!');
                    return [2 /*return*/, isProcessed];
                case 3:
                    e_1 = _a.sent();
                    core_1.Logger.debug('PULUMI-ALIBABA', "process error: " + e_1);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/, false];
            }
        });
    });
}
exports.processPulumiErr = processPulumiErr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0Q7QUFDeEQseUNBQTZCO0FBQzdCLDRDQUFnQztBQUV4QixJQUFBLFlBQVksR0FBSyxPQUFPLENBQUMsaUNBQWlDLENBQUMsYUFBL0MsQ0FBZ0Q7QUFFcEUsSUFBTSxnQkFBZ0IsR0FBRyx5QkFBeUIsQ0FBQztBQUVuRCxTQUFlLDJCQUEyQixDQUFDLE9BQWUsRUFBRSxVQUFnQjs7Ozs7O29CQUNwRSxpQkFBaUIsR0FBRyxZQUFZLENBQUM7b0JBQ2pDLHVCQUF1QixHQUFHLG9CQUFvQixDQUFDO29CQUMvQyxVQUFVLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0MsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFDN0QsdUJBQXVCLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztvQkFFdkUscUJBQU0sWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUE7O29CQUFuRyxNQUFNLEdBQUcsQ0FBQyxTQUF5RixDQUFDLENBQUMsTUFBTTtvQkFFNUcscUJBQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFBOztvQkFBNUMsSUFBSSxDQUFDLENBQUEsU0FBdUMsQ0FBQSxFQUFFO3dCQUM1QyxhQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLDhCQUE0QixNQUFRLENBQUMsQ0FBQzt3QkFDckUsc0JBQU8sS0FBSyxFQUFDO3FCQUNkO29CQUM2QixxQkFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUE7O29CQUFwRixnQkFBZ0IsR0FBUSxTQUE0RDtvQkFDMUYsYUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxpQ0FBK0IsZ0JBQWtCLENBQUMsQ0FBQztvQkFDbEYsT0FBTyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUM7b0JBRXRELHFCQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUMsRUFBQTs7b0JBQTlELFNBQThELENBQUM7b0JBRS9ELHFCQUFNLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFBOztvQkFBL0YsU0FBK0YsQ0FBQzs7Ozs7Q0FDakc7QUFFRCxTQUFzQixnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsT0FBZ0IsRUFBRSxVQUFnQjs7Ozs7O3lCQUNuRixNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQWpDLHdCQUFpQztvQkFDN0IsT0FBTyxHQUFHLGNBQU8sQ0FBQyw2REFBNkQsQ0FBQyxDQUFDOzs7O29CQUV4RCxxQkFBTSwyQkFBMkIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUE7O29CQUE3RSxXQUFXLEdBQVksU0FBc0Q7b0JBQ25GLE9BQU8sQ0FBQyxPQUFPLENBQUMsd0RBQXdELENBQUMsQ0FBQztvQkFDMUUsc0JBQU8sV0FBVyxFQUFDOzs7b0JBRW5CLGFBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsb0JBQWtCLEdBQUcsQ0FBQyxDQUFDO29CQUN0RCxzQkFBTyxLQUFLLEVBQUM7d0JBR2pCLHNCQUFPLEtBQUssRUFBQzs7OztDQUNkO0FBYkQsNENBYUMifQ==