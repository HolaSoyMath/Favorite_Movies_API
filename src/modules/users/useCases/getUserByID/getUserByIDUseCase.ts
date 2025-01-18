import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { checkIdUserExists } from "../../../../utils/checkExists";
import { GetUserDTO } from "../../dtos/GetUserDTO";

export class GetUserByIDUseCase {
    async execute(userId: string): Promise<GetUserDTO>{
        checkIdUserExists(userId);
        const search = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const result: GetUserDTO = {
            name: search?.name,
            surname: search?.surname,
            email: search?.email,
            created_at: search!.created_at
        }

        return result;
    }
}