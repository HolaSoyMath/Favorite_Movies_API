export interface CreateUserDTO{
    name: string
    surname: string
    email: string
    login: string
    password: string
}

export interface ReturnCreateUserDTO{
    id: string
    name: string
    surname: string
    email: string
}