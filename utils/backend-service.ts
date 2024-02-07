import { MakeDonationParams } from "./declarations/backend/backend.did";
import { makeBackendActor } from "./actor-locator";
import { School } from "./declarations/backend/backend.did";

export const getSchools = async () => {
  const backendService = await makeBackendActor();
  const noOfSchools = await backendService.get_total_schools();
  let schools: School[] = [];
  for (let i = 1; i <= Number(noOfSchools.toString()); i++) {
    const school = await getSchoolById(i.toString());
    schools.push(school);
  }
  return schools;
};

export const getNoOfSchools = async () => {
  const backendService = await makeBackendActor();
  const noOfSchools = await backendService.get_total_schools();
  return noOfSchools;
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
  console.log(backendService);
  const res: any = await backendService.get_school_v2(BigInt(id));
  if (res.err) {
    throw new Error(res.err);
  }
  console.log("here");
  return res.ok;
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
