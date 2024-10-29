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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("../clients/clients.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(clientService, jwtService) {
        this.clientService = clientService;
        this.jwtService = jwtService;
    }
    async generateToken(user) {
        const payload = { userId: user.id };
        return this.jwtService.sign(payload);
    }
    async validateUser(email, password) {
        const user = await this.clientService.findByEmail(email);
        console.log('User Found:', user);
        if (user &&
            (await this.clientService.comparePasswords(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async login(user) {
        try {
            console.log('User to log in:', user);
            if (!user.id) {
                throw new common_1.UnauthorizedException('User ID is missing');
            }
            const payload = { userId: user.id };
            const token = this.jwtService.sign(payload);
            return {
                success: true,
                access_token: token,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                return {
                    success: false,
                    error: error.message,
                };
            }
        }
    }
    async getProfile(userId) {
        try {
            const user = await this.clientService.getSafeUser(userId);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            return { success: true, data: user };
        }
        catch (error) {
            if (error instanceof Error) {
                return { success: true, error: error.message };
            }
        }
    }
    async logout(userId) {
        return { success: true, message: 'User logged out successfully' };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const newAccessToken = this.jwtService.sign({ userId: payload.userId });
            return {
                success: true,
                access_token: newAccessToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_service_1.ClientsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map