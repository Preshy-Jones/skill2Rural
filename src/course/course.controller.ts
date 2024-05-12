import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { AddCourseReviewDto } from "./dto/add-course-review.dto";
// import { AddQuestionDto } from "./dto/add-question.dto";
// import { CreateCertificateDto } from "./dto/create-certificate.dto";

@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiTags("Create Course")
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  @ApiBody({
    type: CreateCourseDto,
    description: "Json structure for course object",
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 403, description: "Forbidden" })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @ApiTags("Find All Courses")
  @ApiResponse({
    status: 200,
    description: "The records have been successfully retrieved.",
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.courseService.findAll();
  }
  // Get User's enrolled courses
  @Get("enrolled")
  @ApiTags("Get User Enrolled Courses")
  @ApiResponse({
    status: 200,
    description: "The records have been successfully retrieved.",
  })
  @ApiBearerAuth()
  getUserEnrolledCourses(@Request() req) {
    const userId = req.user.id;
    return this.courseService.getUserEnrolledCourses(userId);
  }

  // // Get User's Certificates
  // @Get("certificate")
  // @ApiTags("Get User Certificates")
  // @ApiResponse({
  //   status: 200,
  //   description: "The records have been successfully retrieved.",
  // })
  // @ApiBearerAuth()
  // getUserCertificates(@Request() req) {
  //   const userId = req.user.id;
  //   return this.courseService.getUserCertificates(userId);
  // }

  @Get(":id")
  @ApiTags("Find Course by ID")
  @ApiResponse({
    status: 200,
    description: "The record has been successfully retrieved.",
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiBearerAuth()
  findOneCourse(@Param("id") id: string, @Request() req) {
    const userId = req.user.id;
    return this.courseService.findOne(+id, userId);
  }

  @Patch(":id")
  updateCourse(
    @Param("id") id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(":id")
  removeCourse(@Param("id") id: string) {
    return this.courseService.remove(+id);
  }

  @Get("reviews/:courseId")
  @ApiTags("Get Course Reviews")
  @ApiResponse({
    status: 200,
    description: "The records have been successfully retrieved.",
  })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiBearerAuth()
  getCourseReviews(@Param("courseId") courseId: string) {
    return this.courseService.findReviewsByCourseId(+courseId);
  }

  @Post("reviews/:courseId")
  @ApiTags("Add Course Review")
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created.",
  })
  @ApiBody({
    type: AddCourseReviewDto,
    description: "Json structure for course review object",
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 403, description: "Forbidden" })
  addCourseReview(
    @Param("courseId") courseId: string,
    @Body() data: AddCourseReviewDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.courseService.addCourseReview(+courseId, userId, data);
  }

  // @Post(":courseId/questions")
  // @ApiTags("Add New Question")
  // @ApiResponse({
  //   status: 201,
  //   description: "The record has been successfully created.",
  // })
  // @ApiBody({
  //   type: AddQuestionDto,
  //   description: "Json structure for question object",
  // })
  // @ApiBearerAuth()
  // addNewQuestion(
  //   @Param("courseId") courseId: string,
  //   @Body() data: AddQuestionDto,
  // ) {
  //   return this.courseService.addNewQuestion(+courseId, data);
  // }

  // @Get(":courseId/questions")
  // @ApiTags("Get Questions")
  // @ApiResponse({
  //   status: 200,
  //   description: "The records have been successfully retrieved.",
  // })
  // @ApiResponse({ status: 403, description: "Forbidden" })
  // @ApiBearerAuth()
  // getQuestions(@Param("courseId") courseId: string, @Request() req) {
  //   return this.courseService.getQuestions(+courseId, req.user.id);
  // }

  // //submit quiz
  // @Post(":courseId/quiz")
  // @ApiTags("Submit Quiz")
  // @ApiResponse({
  //   status: 201,
  //   description: "The record has been successfully created.",
  // })
  // @ApiBody({
  //   description: "Json structure for quiz object",
  // })
  // @ApiBearerAuth()
  // submitQuiz(@Param("courseId") courseId: string, @Body() data: SubmitQuizDto) {
  //   return this.courseService.submitQuiz(+courseId, data);
  // }

  // // Get User's course certificate
  // @Get(":courseId/certificate")
  // @ApiTags("Get User Course Certificate")
  // @ApiResponse({
  //   status: 200,
  //   description: "The record has been successfully retrieved.",
  // })
  // @ApiBearerAuth()
  // getUserCourseCertificate(
  //   @Param("courseId") courseId: string,
  //   @Request() req,
  // ) {
  //   const userId = req.user.id;
  //   return this.courseService.getUserCertificate(+courseId, userId);
  // }

  // //create certificate
  // @Post(":courseId/certificate")
  // @ApiTags("Create Certificate")
  // @ApiResponse({
  //   status: 201,
  //   description: "The record has been successfully created.",
  // })
  // @ApiBearerAuth()
  // createCertificate(
  //   @Param("courseId") courseId: string,
  //   @Request() req,
  //   @Body() data: CreateCertificateDto,
  // ) {
  //   const userId = req.user.id;
  //   return this.courseService.createCertificate(+courseId, userId, data);
  // }
}
