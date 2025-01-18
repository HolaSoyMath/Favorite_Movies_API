import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { checkEmailExists, checkLoginExists } from "../../../../utils/checkExists";
import { generateHashValue } from "../../../../utils/hashing";

export class CreateUserUseCase {
  async execute({name,surname,email,login,password}: CreateUserDTO): Promise<User> {
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

    return user;
  }
}
