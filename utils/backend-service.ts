import { MakeDonationParams } from "@/src/declarations/backend/backend.did";
import { makeBackendActor } from "./actor-locator";

export const getSchools = async () => {
  const backendService = await makeBackendActor();
  const noOfSchools = await backendService.get_total_schools();
  let schools = [];
  for (let i = 1; i <= Number(noOfSchools.toString()); i++) {
    const school = await backendService.get_school(BigInt(i));
    schools.push(school);
  }
  return schools;
};

export const getStudentBySchool = async (students: any[]) => {
  let studentsData = [];
  const backendService = await makeBackendActor();
  for (let i = 1; i <= students.length; i++) {
    const student = await backendService.get_student(BigInt(i));
    if (student.length > 0) {
      studentsData.push(student);
    }
  }
  return studentsData;
};

export const getDonationByDTI = async (dti: string) => {
  const backendService = await makeBackendActor();
  return backendService.get_donation(dti);
};

export const getSchoolById = async (id: string) => {
  const backendService = await makeBackendActor();
  return backendService.get_school(BigInt(id));
};

export const getBitcoinAddress = async () => {
  const backendService = await makeBackendActor();
  return backendService.get_p2pkh_address();
};

export const getWalletBitcoinBalance = async () => {
  const backendService = await makeBackendActor();
  const address = await getBitcoinAddress();
  return backendService.get_balance(address);
};

export const makeDonation = async (donation: MakeDonationParams) => {
  const backendService = await makeBackendActor();
  return backendService.make_donation(donation);
};
