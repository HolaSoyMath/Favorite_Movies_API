import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO, ReturnCreateUserDTO } from "../../dtos/CreateUserDTO";
import { checkEmailExists, checkLoginExists } from "../../../../utils/checkExists";
import { generateHashValue } from "../../../../utils/hashing";

export class CreateUserUseCase {
  async execute({name,surname,email,login,password}: CreateUserDTO): Promise<ReturnCreateUserDTO> {
    await checkEmailExists(email);
    await checkLoginExists(login);

    // Hash da senha
    const hashedPassword = await generateHashValue(password);

    // Criação do usuário
    const user = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        login,
        password: hashedPassword,
      },
    });

    const result: ReturnCreateUserDTO = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      login: user.login
    }

    return result;
  }
}
