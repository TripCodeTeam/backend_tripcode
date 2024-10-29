"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsController = void 0;
const common_1 = require("@nestjs/common");
const apps_service_1 = require("./apps.service");
const create_app_dto_1 = require("./dto/create-app.dto");
let AppsController = class AppsController {
    constructor(appsService) {
        this.appsService = appsService;
    }
    create(createAppDto) {
        return this.appsService.create(createAppDto);
    }
    OnlyApp(appId) {
        return this.appsService.onlyApp(appId);
    }
    addReportInApp(data) {
        return this.appsService.addReportToApp(data);
    }
    listAppReports(appId) {
        return this.appsService.listReportsForApp(appId);
    }
    getAllAppsForClient(clientId) {
        return this.appsService.appsClient(clientId);
    }
    updateApp(appId, updateAppDto) {
        return this.appsService.updateAppById(appId, updateAppDto);
    }
    deleteApp(appId) {
        return this.appsService.deleteApp(appId);
    }
};
exports.AppsController = AppsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_app_dto_1.CreateAppDto]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:appId'),
    __param(0, (0, common_1.Param)('appId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "OnlyApp", null);
__decorate([
    (0, common_1.Post)('report'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "addReportInApp", null);
__decorate([
    (0, common_1.Get)('report/all/:appId'),
    __param(0, (0, common_1.Param)('appId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "listAppReports", null);
__decorate([
    (0, common_1.Get)('client/:clientId'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "getAllAppsForClient", null);
__decorate([
    (0, common_1.Patch)('/:appId'),
    __param(0, (0, common_1.Param)('appId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_app_dto_1.CreateAppDto]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "updateApp", null);
__decorate([
    (0, common_1.Delete)('/:appId'),
    __param(0, (0, common_1.Param)('appId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "deleteApp", null);
exports.AppsController = AppsController = __decorate([
    (0, common_1.Controller)('apps'),
    __metadata("design:paramtypes", [apps_service_1.AppsService])
], AppsController);
//# sourceMappingURL=apps.controller.js.map