import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
  Request,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dto/update-user.dto";

import { CreateEducatorDto } from "./dto/create-educator.dto";
import { Public } from "src/common/decorators/jwt-auth-guard.decorator";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiTags("Register User")
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiBody({
    type: CreateUserDto,
    description: "Json structure for user object",
  })
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiTags("Register Educator")
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  @Public()
  @Post("educator")
  createEducator(@Body() createEducatorDto: CreateEducatorDto) {
    return this.userService.create(createEducatorDto);
  }

  @Patch(":id")
  @ApiTags("Update User")
  @ApiResponse({
    status: 200,
    description: "The record has been successfully updated.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiBody({
    type: UpdateUserDto,
    description: "Json structure for user object",
  })
  @Public()
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // get logged in user
  @Get("me")
  @ApiTags("Get Logged In User")
  @ApiResponse({
    status: 200,
    description: "The record has been successfully retrieved.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiBearerAuth()
  getLoggedInUser(@Request() req) {
    return req.user;
  }

  @Post("forgot-password")
  @ApiTags("Forgot Password")
  @ApiResponse({
    status: 200,
    description:
      "An email has been sent to your email address with instructions on how to reset your password",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @Public()
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.userService.forgotPassword(forgotPasswordDto);
  }

  @Patch("reset-password/:token")
  @ApiTags("Reset Password")
  @ApiResponse({
    status: 200,
    description: "Password reset successful",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @Public()
  async resetPassword(
    @Param("token") token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.userService.resetPassword(token, resetPasswordDto);
  }
}
