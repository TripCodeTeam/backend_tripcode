"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsModule = void 0;
const common_1 = require("@nestjs/common");
const apps_service_1 = require("./apps.service");
const apps_controller_1 = require("./apps.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let AppsModule = class AppsModule {
};
exports.AppsModule = AppsModule;
exports.AppsModule = AppsModule = __decorate([
    (0, common_1.Module)({
        controllers: [apps_controller_1.AppsController],
        providers: [apps_service_1.AppsService, prisma_service_1.PrismaService],
    })
], AppsModule);
//# sourceMappingURL=apps.module.js.map