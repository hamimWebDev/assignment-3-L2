import httpStatus from "http-status";
import { catchAsync } from "../Utils/CatchAsync";
import { sendResponse } from "../Utils/SendResponse";
import { facultyServices } from "./FacilityService";
import { FacultyValidation } from "./FacilityValidation";

const createFaculty = catchAsync(async (req, res) => {
  const facultyData = req.body;

  const zodData = FacultyValidation.facultyValidationSchema.parse(facultyData);

  const result = await facultyServices.postFacultyFromDb(zodData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility added successfully",
    data: result,
  });
});

export const facultyControllers = {
  createFaculty,
};
