import { CreateAppDto } from 'src/apps/dto/create-app.dto';
export declare class CreateClientDto {
    id?: string;
    companyName: string;
    email: string;
    password: string;
    contacts: ContactsClientTypes[];
    logoCompany: string;
    apps?: CreateAppDto[];
}
export type ContactsClientTypes = {
    id?: string;
    name: string;
    phone: string;
    mail: string;
    clientId: string;
    client?: CreateAppDto;
};
