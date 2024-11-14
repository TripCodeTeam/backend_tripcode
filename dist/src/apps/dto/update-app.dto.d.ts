import { CreateAppDto } from './create-app.dto';
declare const UpdateAppDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateAppDto, "reports" | "apiKeys" | "clientId" | "client">>>;
export declare class UpdateAppDto extends UpdateAppDto_base {
}
export {};
