import httpStatus from "http-status";
import { AppError } from "../errors/AppErrors";
import { TFaculty } from "./FacilityInterface";
import { Faculty } from "./FacilityModel";

const postFacultyFromDb = async (facultyData: TFaculty) => {
  // Create the user in the database
  const result = await Faculty.create(facultyData);
  return result;
};

const updateAFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const result = await Faculty.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const requestFaculty = await Faculty.findOne({ _id: id });
  if (requestFaculty?.isDeleted === true) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed this faculty is already deleted",
    );
  }
  const deletedFaculty = await Faculty.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  if (!deletedFaculty) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
  }

  return deletedFaculty;
};

const getAllFacultyFromDd = async () => {
  const result = await Faculty.find({ isDeleted: false });
  return result;
};
const getAFacultyFromDd = async (id: string) => {
  const result = await Faculty.findOne({ _id: id, isDeleted: false });
  return result;
};

export const facultyServices = {
  postFacultyFromDb,
  updateAFacultyIntoDB,
  deleteFacultyFromDB,
  getAllFacultyFromDd,
  getAFacultyFromDd,
};
