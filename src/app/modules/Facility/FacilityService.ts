import { TFaculty } from "./FacilityInterface";
import { Faculty } from "./FacilityModel";

const postFacultyFromDb = async (facultyData: TFaculty) => {
  // Create the user in the database
  const result = await Faculty.create(facultyData);
  return result;
};

export const facultyServices = {
  postFacultyFromDb,
};
