import { CreateClientDto } from "src/clients/dto/create-client.dto";

export type SafeScalarClient = Omit<CreateClientDto, "password" | "contacts">