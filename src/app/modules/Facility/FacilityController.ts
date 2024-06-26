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

const updateAFacultyIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await facultyServices.updateAFacultyIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is updated successfully",
    data: result,
  });
});

export const facultyControllers = {
  createFaculty,
  updateAFacultyIntoDB,
};
