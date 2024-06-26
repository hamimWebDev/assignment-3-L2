import { TFaculty } from "./FacilityInterface";
import { Faculty } from "./FacilityModel";

const postFacultyFromDb = async (facultyData: TFaculty) => {
  // Create the user in the database
  const result = await Faculty.create(facultyData);
  return result;
};

const updateAFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const result = await Faculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const facultyServices = {
  postFacultyFromDb,
  updateAFacultyIntoDB,
};
