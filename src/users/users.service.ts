import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-user-dto';
import { CreateUserDTO } from './dto/create-user-dto';

interface user {
    id: Number,
    name: string,
    email: string,
    role: string
}
@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John',
            email: 'john@gmail.com',
            role: 'INTERN'
        },
        {
            id: 2,
            name: 'Jane',
            email: 'jane@gmail.com',
            role: 'EMPLOYEE'
        },
        {
            id: 3,
            name: 'Mike',
            email: 'mike@gmail.com',
            role: 'PRODUCT'
        },
        {
            id: 4,
            name: 'Alice',
            email: 'alice@gmail.com',
            role: 'EMPLOYEE'
        },
        {
            id: 5,
            name: 'Bob',
            email: 'bob@gmail.com',
            role: 'INTERN'
        }
    ]
    async findAll(role?: 'INTERN' | 'EMPLOYEE' | 'PRODUCT') {
        console.log('===============', role);

        if (role) {
            const arr= this.users.filter((i) => i.role === role)
            if(arr.length==0) throw new NotFoundException('User not found')
            return arr
        }
        return this.users
    }
    async findOne(id: Number) {
        const user = this.users.filter((i) => i.id == id)
        console.log("===========",user);

        if (user.length==0) throw new NotFoundException('User not found')
        return user
    }
    async create(userData: CreateUserDTO) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id = a.id)
        const highestId = usersByHighestId[usersByHighestId.length - 1].id + 1
        console.log("==============", highestId)
        const newUser = {
            ...userData,
            id: highestId
        }
        this.users.push(newUser)
        return newUser

    }
    async update(id: Number, updatedUser: UpdateUserDTO) {
        this.users = this.users.map((usr) => {
            if (id == usr.id) {
                return { ...usr, ...updatedUser }
            }
            return usr
        })
        return this.findOne(id)

    }
    async delete(id: Number,) {
        this.users = this.users.filter((usr) => id !== usr.id)
        return this.users

    }
}