import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service'
import { UpdateUserDTO } from './dto/update-user-dto';
import { CreateUserDTO } from './dto/create-user-dto';

@Controller('users')
export class UsersController {
    /*
            GET    /users
            GET    /users/:id
            POST   /users
            PATCH  /users/:id
            DELETE /users/:id
        */
    //follows waterfall model
    //order matters here

    constructor(private readonly usersService: UsersService) { }

    @Get() //GET /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'EMPLOYEE' | 'PRODUCT') {
        return this.usersService.findAll(role)
    }
    // @Get('interns')
    // findUserAllInterns() {
    //     return [];
    // }

    @Get(':id')
    findUserById(@Param('id', ParseIntPipe) id: Number) {
        return this.usersService.findOne(id)
    }

    @Post() //POST   /users
    create(@Body(ValidationPipe) user: CreateUserDTO) {
        return this.usersService.create(user)
    }
    @Patch(':id') //POST   /users
    update(@Param('id', ParseIntPipe) id: Number, @Body(ValidationPipe) user: UpdateUserDTO) {
        return this.usersService.update(id, user)
    }

    @Delete(':id') //POST   /users
    delete(@Param('id', ParseIntPipe) id: Number) {
        return this.usersService.delete(id)
    }
}
